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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let reference: string | null = null;
    let notchpayRef: string | null = null;
    let newStatus: string | null = null;

    // Handle GET callback (redirect from NotchPay after payment)
    if (req.method === "GET") {
      const url = new URL(req.url);
      reference = url.searchParams.get("trxref") || url.searchParams.get("reference");
      notchpayRef = url.searchParams.get("reference");
      const statusParam = url.searchParams.get("status");
      console.log("GET callback received:", { reference, notchpayRef, status: statusParam });

      if (statusParam === "complete" || statusParam === "completed") {
        newStatus = "completed";
      } else if (statusParam === "failed") {
        newStatus = "failed";
      } else {
        newStatus = "pending";
      }
    }
    // Handle POST webhook (server-to-server notification)
    else {
      const body = await req.json();
      console.log("POST webhook received:", JSON.stringify(body));

      const { event, data } = body;

      if (!event || !data) {
        return new Response(JSON.stringify({ error: "Invalid webhook payload" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      reference = data.merchant_reference || data.reference;
      notchpayRef = data.reference || null;

      if (event === "payment.complete") {
        newStatus = "completed";
      } else if (event === "payment.failed") {
        newStatus = "failed";
      } else {
        console.log("Unhandled event:", event);
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    if (!reference) {
      console.error("No reference found");
      return new Response(JSON.stringify({ error: "No reference" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (newStatus && newStatus !== "pending") {
      const { error: updateError } = await supabase
        .from("transactions")
        .update({
          status: newStatus,
          notchpay_reference: notchpayRef,
        })
        .eq("reference", reference);

      if (updateError) {
        console.error("Update error:", updateError);
      } else {
        console.log(`Transaction ${reference} updated to ${newStatus}`);
      }
    }

    // For GET requests, redirect to confirmation page
    if (req.method === "GET") {
      const redirectUrl = `https://pay-free.lovable.app/confirmation?ref=${encodeURIComponent(reference)}&status=${newStatus}`;
      return new Response(null, {
        status: 302,
        headers: { ...corsHeaders, "Location": redirectUrl },
      });
    }

    return new Response(JSON.stringify({ received: true, status: newStatus }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
