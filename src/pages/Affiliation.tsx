import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Affiliation = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative py-24 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-15"
        style={{ background: "radial-gradient(ellipse at center, hsl(var(--purple)) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium mb-6"
          style={{ borderColor: "hsl(var(--purple) / 0.4)", color: "hsl(var(--purple))", background: "hsl(var(--purple) / 0.08)" }}>
          <Sparkles className="h-3 w-3" />
          Programme d'affiliation
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
          Devenez partenaire et{" "}
          <span className="gradient-text-gold">gagnez des commissions</span>
        </h1>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Rejoignez notre réseau d'affiliation et recommandez les produits que vous aimez. Gagnez jusqu'à 30% de commission sur chaque vente.
        </p>
        <Button
          asChild
          size="lg"
          className="px-8 py-6 text-base font-semibold rounded-xl text-background"
          style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
        >
          <Link to="/">
            Voir les produits
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>

    {/* Products for affiliation */}
    <section className="py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Produits disponibles pour l'affiliation</h2>
        <p className="text-muted-foreground text-sm mb-8">Découvrez tous les produits que vous pouvez promouvoir</p>

        <div className="rounded-2xl border p-8 text-center" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
          <p className="text-muted-foreground text-sm mb-4">
            Pour rejoindre le programme d'affiliation, contactez-nous par WhatsApp ou email.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline" className="rounded-xl">
              <a href="https://wa.me/2290141822325" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <a href="mailto:arkcomia@gmail.com">
                Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Affiliation;
