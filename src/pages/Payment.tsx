import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, Loader2 } from "lucide-react";
import { offers, formatFCFA } from "@/lib/offers";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { toast } from "sonner";

const paymentSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  phone: z.string().trim().regex(/^(6[5-9]\d{7})$/, "Numéro camerounais invalide (ex: 6XXXXXXXX)"),
  email: z.string().trim().email("Email invalide").max(255),
  provider: z.enum(["mtn", "orange"]),
});

const Payment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const offerId = params.get("offre");
  const offer = offers.find((o) => o.id === offerId);

  const [form, setForm] = useState({ name: "", phone: "", email: "", provider: "mtn" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!offer) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Offre introuvable.</p>
          <Button variant="outline" onClick={() => navigate("/")}>Retour</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = paymentSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => (fieldErrors[i.path[0] as string] = i.message));
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("initialize-payment", {
        body: {
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: `237${form.phone}`,
          offer_id: offer.id,
          offer_name: offer.name,
          amount: offer.price,
          payment_provider: form.provider,
        },
      });

      if (error) throw error;

      // If NotchPay returns an authorization URL, redirect to it
      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        // Fallback: go to confirmation page
        navigate(`/confirmation?offre=${offer.id}&ref=${encodeURIComponent(data?.reference || "")}&name=${encodeURIComponent(form.name)}`);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast.error("Erreur lors de l'initialisation du paiement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour aux offres
        </button>

        {/* Order summary */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm text-muted-foreground">Offre sélectionnée</p>
              <p className="font-semibold text-foreground">{offer.name}</p>
            </div>
            <p className="text-xl font-bold text-primary">{formatFCFA(offer.price)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Informations de paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Jean Dupont" value={form.name} onChange={(e) => update("name", e.target.value)} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="flex gap-2">
                  <span className="flex items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">+237</span>
                  <Input id="phone" placeholder="6XXXXXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="flex-1" />
                </div>
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jean@exemple.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-3">
                <Label>Mode de paiement</Label>
                <RadioGroup value={form.provider} onValueChange={(v) => update("provider", v)} className="grid grid-cols-2 gap-3">
                  <label htmlFor="mtn" className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.provider === "mtn" ? "border-primary bg-primary/5" : "hover:border-muted-foreground/30"}`}>
                    <RadioGroupItem value="mtn" id="mtn" />
                    <div>
                      <p className="font-medium text-foreground text-sm">MTN MoMo</p>
                      <p className="text-xs text-muted-foreground">Mobile Money</p>
                    </div>
                  </label>
                  <label htmlFor="orange" className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.provider === "orange" ? "border-primary bg-primary/5" : "hover:border-muted-foreground/30"}`}>
                    <RadioGroupItem value="orange" id="orange" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Orange Money</p>
                      <p className="text-xs text-muted-foreground">Mobile Money</p>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Traitement en cours…</> : <><Phone className="h-4 w-4" /> Payer {formatFCFA(offer.price)}</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
