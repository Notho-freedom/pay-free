import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Phone, Loader2, ShieldCheck } from "lucide-react";
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
      <div className="flex min-h-screen items-center justify-center px-4 bg-background">
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

      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
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
      {/* Background orb */}
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: "hsl(var(--gold))" }} />

      <div className="mx-auto max-w-lg relative z-10">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>

        {/* Order summary */}
        <div className="rounded-2xl border mb-6 p-5"
          style={{ background: "hsl(var(--gold) / 0.05)", borderColor: "hsl(var(--gold) / 0.3)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Offre sélectionnée</p>
              <p className="font-semibold text-foreground">{offer.name}</p>
            </div>
            <p className="text-2xl font-bold gradient-text-gold">{formatFCFA(offer.price)}</p>
          </div>
        </div>

        <div className="rounded-2xl border p-6"
          style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
          <h1 className="text-xl font-bold text-foreground mb-6">Informations de paiement</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Nom complet</Label>
              <Input id="name" placeholder="Votre nom complet" value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Numéro de téléphone</Label>
              <div className="flex gap-2">
                <span className="flex items-center rounded-md border px-3 text-sm text-muted-foreground"
                  style={{ background: "hsl(var(--muted))", borderColor: "hsl(var(--border))" }}>
                  +237
                </span>
                <Input id="phone" placeholder="6XXXXXXXX" value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Adresse email</Label>
              <Input id="email" type="email" placeholder="votre@email.com" value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                ⚠️ Utilisez cette même adresse pour accéder à votre formation
              </p>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-foreground">Mode de paiement Mobile Money</Label>
              <RadioGroup value={form.provider} onValueChange={(v) => update("provider", v)} className="grid grid-cols-2 gap-3">
                {[
                  { value: "mtn", label: "MTN MoMo", sub: "Mobile Money" },
                  { value: "orange", label: "Orange Money", sub: "Mobile Money" },
                ].map(({ value, label, sub }) => (
                  <label key={value} htmlFor={value}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all"
                    style={{
                      borderColor: form.provider === value ? "hsl(var(--gold) / 0.6)" : "hsl(var(--border))",
                      background: form.provider === value ? "hsl(var(--gold) / 0.08)" : "transparent",
                    }}>
                    <RadioGroupItem value={value} id={value} />
                    <div>
                      <p className="font-medium text-foreground text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <Button type="submit" size="lg"
              className="w-full py-6 text-base font-semibold rounded-xl text-background"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
              disabled={loading}>
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Traitement en cours…</>
                : <><Phone className="h-4 w-4" /> Payer {formatFCFA(offer.price)}</>}
            </Button>
          </form>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" style={{ color: "hsl(var(--gold))" }} />
          Paiement sécurisé via NotchPay
        </div>
      </div>
    </div>
  );
};

export default Payment;
