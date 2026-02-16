import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, MessageCircle, ArrowLeft } from "lucide-react";
import { offers, formatFCFA } from "@/lib/offers";

const WHATSAPP_LINK = "https://chat.whatsapp.com/VOTRE_LIEN_ICI";

const Confirmation = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const offerId = params.get("offre");
  const ref = params.get("ref") || "N/A";
  const name = params.get("name") || "Client";
  const offer = offers.find((o) => o.id === offerId);
  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  if (!offer) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Transaction introuvable.</p>
          <Button variant="outline" onClick={() => navigate("/")}>Retour</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Paiement confirmé !</h1>
        <p className="text-muted-foreground mb-8">Merci pour votre achat, {decodeURIComponent(name)}.</p>

        {/* Invoice */}
        <Card className="text-left mb-6" id="invoice">
          <CardContent className="py-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Référence</span>
              <span className="font-mono font-medium text-foreground">{ref}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground">{date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Client</span>
              <span className="text-foreground">{decodeURIComponent(name)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Offre</span>
              <span className="text-foreground">{offer.name}</span>
            </div>
            <div className="border-t pt-4 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-primary text-lg">{formatFCFA(offer.price)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button asChild className="w-full gap-2 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white" size="lg">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Rejoindre le groupe WhatsApp
            </a>
          </Button>
          <Button variant="outline" className="w-full gap-2" onClick={() => window.print()}>
            <Download className="h-4 w-4" /> Télécharger la facture
          </Button>
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="inline h-3 w-3 mr-1" />Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
