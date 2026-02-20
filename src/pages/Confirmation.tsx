import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Download, ArrowLeft, Loader2, GraduationCap } from "lucide-react";
import { offers, formatFCFA } from "@/lib/offers";
import { supabase } from "@/integrations/supabase/client";

const Confirmation = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const ref = params.get("ref") || "";
  const status = params.get("status");
  const offerId = params.get("offre");
  const nameParam = params.get("name");

  const [loading, setLoading] = useState(!offerId);
  const [transaction, setTransaction] = useState<{
    reference: string;
    customer_name: string;
    offer_id: string;
    offer_name: string;
    amount: number;
    status: string;
    created_at: string;
  } | null>(null);

  useEffect(() => {
    if (offerId) return;
    if (!ref) { setLoading(false); return; }

    const fetchTransaction = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("reference, customer_name, offer_id, offer_name, amount, status, created_at")
        .eq("reference", ref)
        .maybeSingle();
      if (data) setTransaction(data);
      setLoading(false);
    };
    fetchTransaction();
  }, [ref, offerId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "hsl(var(--gold))" }} />
      </div>
    );
  }

  const resolvedOfferId = offerId || transaction?.offer_id;
  const offer = offers.find((o) => o.id === resolvedOfferId);
  const customerName = nameParam ? decodeURIComponent(nameParam) : transaction?.customer_name || "Client";
  const reference = ref || transaction?.reference || "N/A";
  const paymentStatus = status || transaction?.status || "pending";
  const amount = offer?.price || transaction?.amount;
  const offerName = offer?.name || transaction?.offer_name || "—";
  const date = transaction?.created_at
    ? new Date(transaction.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  if (!resolvedOfferId && !transaction) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Transaction introuvable.</p>
          <Button variant="outline" onClick={() => navigate("/")}>Retour</Button>
        </div>
      </div>
    );
  }

  const isCompleted = paymentStatus === "completed" || paymentStatus === "complete";
  const isFailed = paymentStatus === "failed";

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      {/* Background orb */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 blur-[120px] opacity-10 pointer-events-none rounded-full"
        style={{ background: isCompleted ? "hsl(var(--gold))" : "hsl(var(--destructive))" }} />

      <div className="mx-auto max-w-md relative z-10 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: isFailed ? "hsl(var(--destructive) / 0.15)" : "hsl(var(--gold) / 0.15)" }}>
          {isFailed
            ? <XCircle className="h-10 w-10 text-destructive" />
            : <CheckCircle className="h-10 w-10" style={{ color: "hsl(var(--gold))" }} />}
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          {isFailed ? "Paiement échoué" : "Paiement confirmé !"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isFailed
            ? "Le paiement n'a pas abouti. Veuillez réessayer."
            : `Félicitations ${customerName}, votre accès est activé.`}
        </p>

        {/* Invoice */}
        <div className="rounded-2xl border p-6 text-left mb-6" id="invoice"
          style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Reçu de paiement</p>
          {[
            { label: "Référence", value: reference, mono: true },
            { label: "Date", value: date },
            { label: "Client", value: customerName },
            { label: "Formation", value: offerName },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex justify-between text-sm py-2 border-b"
              style={{ borderColor: "hsl(var(--border))" }}>
              <span className="text-muted-foreground">{label}</span>
              <span className={`text-foreground ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
            </div>
          ))}
          {amount && (
            <div className="flex justify-between pt-4 mt-2">
              <span className="font-semibold text-foreground">Total payé</span>
              <span className="font-bold text-lg gradient-text-gold">{formatFCFA(amount)}</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {isCompleted && (
            <Button
              size="lg"
              className="w-full gap-2 py-6 text-base font-semibold rounded-xl text-background"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
              onClick={() => navigate("/formation")}
            >
              <GraduationCap className="h-5 w-5" />
              Accéder à ma formation
            </Button>
          )}
          {!isFailed && (
            <Button variant="outline" className="w-full gap-2" onClick={() => window.print()}>
              <Download className="h-4 w-4" /> Télécharger le reçu
            </Button>
          )}
          {isFailed && (
            <Button
              className="w-full py-6 text-base font-semibold rounded-xl text-background"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
              onClick={() => navigate("/")}
            >
              Réessayer
            </Button>
          )}
          <button onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mx-auto">
            <ArrowLeft className="h-3 w-3" /> Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
