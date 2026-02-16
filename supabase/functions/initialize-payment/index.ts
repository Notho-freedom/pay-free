import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customer_name, customer_email, customer_phone, offer_id, offer_name, amount, payment_provider } =
      await req.json();

    // Validate required fields
    if (!customer_name || !customer_email || !customer_phone || !offer_id || !offer_name || !amount || !payment_provider) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const reference = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create Supabase client with service role
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Insert transaction
    const { error: dbError } = await supabase.from("transactions").insert({
      reference,
      customer_name,
      customer_email,
      customer_phone,
      offer_id,
      offer_name,
      amount,
      payment_provider,
      status: "pending",
    });

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to create transaction" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize NotchPay payment
    const NOTCHPAY_PUBLIC_KEY = Deno.env.get("NOTCHPAY_PUBLIC_KEY");
    if (!NOTCHPAY_PUBLIC_KEY) {
      return new Response(JSON.stringify({ error: "Payment service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const notchpayResponse = await fetch("https://api.notchpay.co/payments/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: NOTCHPAY_PUBLIC_KEY,
      },
      body: JSON.stringify({
        amount,
        currency: "XAF",
        email: customer_email,
        phone: customer_phone,
        reference,
        description: `Paiement formation - ${offer_name}`,
        callback: `${Deno.env.get("SUPABASE_URL")}/functions/v1/notchpay-webhook`,
      }),
    });

    const notchpayData = await notchpayResponse.json();

    if (!notchpayResponse.ok) {
      console.error("NotchPay error:", notchpayData);
      // Update transaction status to failed
      await supabase.from("transactions").update({ status: "failed" }).eq("reference", reference);
      return new Response(JSON.stringify({ error: "Payment initialization failed", details: notchpayData }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Store notchpay reference
    if (notchpayData.transaction?.reference) {
      await supabase
        .from("transactions")
        .update({ notchpay_reference: notchpayData.transaction.reference })
        .eq("reference", reference);
    }

    return new Response(
      JSON.stringify({
        reference,
        authorization_url: notchpayData.authorization_url,
        transaction: notchpayData.transaction,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
