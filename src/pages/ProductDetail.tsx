import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ThumbsUp,
  Users,
  BookOpen,
  Check,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  ChevronDown,
} from "lucide-react";
import { offers, formatFCFA } from "@/lib/offers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const offer = offers.find((o) => o.slug === slug);

  if (!offer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Produit introuvable.</p>
            <Button variant="outline" onClick={() => navigate("/")}>Retour</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* ── Header section ── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{offer.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {offer.ratingCount > 0 && (
              <span className="flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4" style={{ color: "hsl(var(--gold))" }} />
                {offer.rating}% ({offer.ratingCount} Avis)
              </span>
            )}
            {offer.students && (
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {offer.students}+ Étudiants
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {offer.type === "course" ? "Cours" : "Téléchargeable"}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* ── Left column ── */}
          <div>
            {/* Cover image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img src={offer.coverImage} alt={offer.name} className="w-full" />
            </div>

            {/* Real testimonials */}
            {offer.testimonials.length > 0 && (
              <div className="mb-10">
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
                  {offer.testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-[300px] snap-start rounded-2xl border p-5"
                      style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{ background: "hsl(var(--gold) / 0.2)", color: "hsl(var(--gold))" }}
                        >
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{t.name}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className="h-3 w-3 fill-current" style={{ color: "hsl(var(--gold))" }} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course content */}
            {offer.courseContent.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-foreground mb-4">Contenu du cours</h2>
                <Accordion type="multiple" className="space-y-2">
                  {offer.courseContent.map((section, i) => (
                    <AccordionItem
                      key={i}
                      value={`section-${i}`}
                      className="rounded-xl border px-5"
                      style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">{section.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{section.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{section.lessons} Leçon{section.lessons > 1 ? "s" : ""}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <ul className="space-y-2">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <BookOpen className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "hsl(var(--gold))" }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* ── Sales copy ── */}
            <div className="prose-dark space-y-8">
              {/* Hook */}
              <div className="rounded-2xl border p-6" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
                <h2 className="text-xl font-bold text-foreground mb-3">{offer.salesCopy.hook}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Dans cette formation, je te montre <strong className="text-foreground">pas à pas</strong> comment créer des vidéos avec un{" "}
                  <strong className="text-foreground">avatar IA</strong> et surtout{" "}
                  <strong className="text-foreground">comment les utiliser pour créer du contenu régulier et cohérent</strong>.
                </p>
              </div>

              {/* Pain points */}
              {offer.salesCopy.painPoints.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Tu te reconnais peut-être ici 👇</h3>
                  <ul className="space-y-2">
                    {offer.salesCopy.painPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-foreground">→</span> {p}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Le problème <strong className="text-foreground">n'est pas l'IA</strong>.
                    <br />
                    👉 Le problème, c'est <strong className="text-foreground">l'absence de méthode claire pour créer du contenu avec</strong>.
                  </p>
                </div>
              )}

              {/* Outcomes */}
              {offer.salesCopy.outcomes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">À la fin de cette formation, tu seras capable de :</h3>
                  <ul className="space-y-2">
                    {offer.salesCopy.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="h-4 w-4" style={{ color: "hsl(var(--gold))" }} />
                        </div>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bonuses */}
              {offer.salesCopy.bonuses.length > 0 && (
                <div className="rounded-2xl border p-6" style={{ background: "hsl(var(--gold) / 0.05)", borderColor: "hsl(var(--gold) / 0.3)" }}>
                  <h3 className="text-lg font-bold text-foreground mb-3">🎁 BONUS EXCLUSIFS</h3>
                  <ul className="space-y-2">
                    {offer.salesCopy.bonuses.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--gold))" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing section in sales copy */}
              <div className="rounded-2xl border p-6 text-center" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--gold) / 0.4)" }}>
                <h3 className="text-lg font-bold text-foreground mb-2">💥 Offre de lancement (temps limité)</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  <span className="line-through">{formatFCFA(offer.originalPrice)}</span> →{" "}
                  <strong className="text-foreground">{formatFCFA(offer.price)} cette semaine uniquement.</strong>
                </p>
                <p className="text-xs text-muted-foreground mb-4">⚠️ Cette réduction est temporaire. Après, le prix augmente définitivement.</p>
                <Button
                  size="lg"
                  className="px-10 py-6 text-base font-semibold rounded-xl text-background"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
                  onClick={() => navigate(`/paiement?offre=${offer.id}`)}
                >
                  Rejoindre la formation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* FAQ */}
              {offer.faq.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Questions fréquentes</h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {offer.faq.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="rounded-xl border px-5"
                        style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4 text-sm">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm pb-4">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>

          {/* ── Right column — Sticky purchase card ── */}
          <div className="lg:self-start lg:sticky lg:top-24">
            <div
              className="rounded-2xl border p-6 glow-gold"
              style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--gold) / 0.4)" }}
            >
              {/* Scarcity */}
              {offer.sold !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Vendus : {offer.sold}</span>
                    <span>Restants : {offer.remaining}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: "hsl(var(--destructive))",
                        width: `${((offer.sold || 0) / ((offer.sold || 0) + (offer.remaining || 1))) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs font-medium mt-1.5" style={{ color: "hsl(var(--destructive))" }}>
                    Offre limitée
                  </p>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm text-muted-foreground line-through">{formatFCFA(offer.originalPrice)}</span>
              </div>
              <p className="text-4xl font-bold gradient-text-gold mb-5">{formatFCFA(offer.price)}</p>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full py-6 text-base font-semibold rounded-xl text-background mb-4"
                style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
                onClick={() => navigate(`/paiement?offre=${offer.id}`)}
              >
                {offer.type === "course" ? "Rejoindre la formation" : "Profiter de l'offre"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Payment methods */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Moyens de paiement acceptés</p>
                <div className="flex items-center justify-center gap-3">
                  <ShieldCheck className="h-5 w-5" style={{ color: "hsl(var(--gold))" }} />
                  <span className="text-xs text-muted-foreground">MTN MoMo · Orange Money · Visa · Mastercard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
