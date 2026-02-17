import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Download, MessageCircle, ArrowLeft, Loader2 } from "lucide-react";
import { offers, formatFCFA } from "@/lib/offers";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_LINK = "https://chat.whatsapp.com/VOTRE_LIEN_ICI";

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

  // If we have offre param (direct redirect from payment page), use it directly
  // Otherwise fetch from DB (webhook redirect)
  useEffect(() => {
    if (offerId) return; // already have data from URL params
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
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Resolve offer and customer info from either URL params or DB
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
      <div className="flex min-h-screen items-center justify-center px-4">
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
      <div className="mx-auto max-w-md text-center">
        <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${isFailed ? "bg-destructive/10" : "bg-primary/10"}`}>
          {isFailed
            ? <XCircle className="h-8 w-8 text-destructive" />
            : <CheckCircle className="h-8 w-8 text-primary" />}
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {isFailed ? "Paiement échoué" : "Paiement confirmé !"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isFailed
            ? "Le paiement n'a pas abouti. Veuillez réessayer."
            : `Merci pour votre achat, ${customerName}.`}
        </p>

        {/* Invoice */}
        <Card className="text-left mb-6" id="invoice">
          <CardContent className="py-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Référence</span>
              <span className="font-mono font-medium text-foreground">{reference}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground">{date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Client</span>
              <span className="text-foreground">{customerName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Offre</span>
              <span className="text-foreground">{offerName}</span>
            </div>
            {amount && (
              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary text-lg">{formatFCFA(amount)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-3">
          {isCompleted && (
            <Button asChild className="w-full gap-2 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white" size="lg">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Rejoindre le groupe WhatsApp
              </a>
            </Button>
          )}
          {!isFailed && (
            <Button variant="outline" className="w-full gap-2" onClick={() => window.print()}>
              <Download className="h-4 w-4" /> Télécharger la facture
            </Button>
          )}
          {isFailed && (
            <Button className="w-full" onClick={() => navigate("/")}>
              Réessayer
            </Button>
          )}
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="inline h-3 w-3 mr-1" />Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
