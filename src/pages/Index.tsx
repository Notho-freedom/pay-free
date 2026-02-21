import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Search } from "lucide-react";
import { offers, formatFCFA } from "@/lib/offers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-10 max-w-3xl">
          Trouvez ici toutes les ressources dont vous avez besoin pour vous former en{" "}
          <span className="gradient-text-gold">intelligence artificielle.</span>
        </h1>

        {/* Search & filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full rounded-xl border bg-input pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:border-gold/40"
              style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
            >
              {/* Image */}
              <Link to={`/produit/${offer.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                <img
                  src={offer.coverImage}
                  alt={offer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {offer.badge && (
                  <Badge
                    className="absolute top-3 right-3 font-bold text-xs px-2.5 py-1"
                    style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
                  >
                    {offer.badge}
                  </Badge>
                )}
              </Link>

              {/* Content */}
              <div className="p-5">
                <Link to={`/produit/${offer.slug}`}>
                  <h3 className="font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-gold-light transition-colors line-clamp-2">
                    {offer.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <ThumbsUp className="h-3.5 w-3.5" style={{ color: "hsl(var(--gold))" }} />
                  <span>{offer.rating}% ({offer.ratingCount} Avis)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-sm text-muted-foreground line-through">{formatFCFA(offer.originalPrice)}</span>
                  <span className="text-xl font-bold gradient-text-gold">{formatFCFA(offer.price)}</span>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className="w-full py-5 font-semibold rounded-xl text-background"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
                >
                  <Link to={`/paiement?offre=${offer.id}`}>Acheter maintenant</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
