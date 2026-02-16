import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, GraduationCap, Shield, Users } from "lucide-react";
import { offers, formatFCFA } from "@/lib/offers";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
            <GraduationCap className="h-4 w-4" />
            Formation en ligne
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Maîtrisez les compétences
            <br />
            <span className="text-primary">de demain</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Rejoignez notre formation complète et transformez votre carrière.
            Paiement simple et sécurisé via Mobile Money.
          </p>
          <Button
            size="lg"
            className="mt-8 text-base px-8 gap-2"
            onClick={() => document.getElementById("offres")?.scrollIntoView({ behavior: "smooth" })}
          >
            Voir les offres <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Paiement sécurisé</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> +500 étudiants</span>
          </div>
        </div>
      </header>

      {/* Offers */}
      <section id="offres" className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Choisissez votre formule
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Des offres adaptées à tous les budgets. Payez facilement avec MTN Mobile Money ou Orange Money.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className={`relative flex flex-col transition-shadow hover:shadow-lg ${
                offer.badge ? "border-primary shadow-md ring-2 ring-primary/20" : ""
              }`}
            >
              {offer.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                  {offer.badge}
                </Badge>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl">{offer.name}</CardTitle>
                <p className="mt-3 text-3xl font-bold text-foreground">
                  {formatFCFA(offer.price)}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {offer.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={offer.badge ? "default" : "outline"}
                  onClick={() => navigate(`/paiement?offre=${offer.id}`)}
                >
                  Payer maintenant
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Formation en Ligne. Tous droits réservés.
      </footer>
    </div>
  );
};

export default Index;
