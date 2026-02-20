import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Check,
  ArrowRight,
  Camera,
  Laptop,
  Clock,
  Video,
  Sparkles,
  Star,
  ChevronDown,
} from "lucide-react";
import { offers, formatFCFA } from "@/lib/offers";

const painPoints = [
  {
    icon: Camera,
    title: "Vous n'aimez pas vous montrer en vidéo",
    desc: "La timidité, l'apparence, la peur d'être jugé… tout ça vous bloque. Et pourtant, vous avez des choses importantes à partager.",
  },
  {
    icon: Laptop,
    title: "Vous n'avez pas de matériel professionnel",
    desc: "Pas de caméra, pas de micro, pas de studio. Vous pensez que créer du contenu de qualité est réservé à ceux qui ont du budget.",
  },
  {
    icon: Video,
    title: "Le montage vidéo vous fait peur",
    desc: "Vous ouvrez un logiciel de montage et vous fermez aussitôt. Trop complexe, trop long, trop technique.",
  },
  {
    icon: Clock,
    title: "Vous manquez de temps",
    desc: "Entre le travail, la famille et les obligations, trouver du temps pour créer du contenu semble impossible.",
  },
];

const steps = [
  {
    num: "01",
    title: "Créez votre avatar IA",
    desc: "En quelques minutes, générez un avatar à votre image avec l'IA. Votre double numérique, prêt à parler à votre place.",
  },
  {
    num: "02",
    title: "Produisez sur Google Flow",
    desc: "Entrez votre script, choisissez votre avatar, et Google Flow génère une vidéo professionnelle. Aucune technique requise.",
  },
  {
    num: "03",
    title: "Publiez et répétez",
    desc: "Exportez votre vidéo en quelques secondes et publiez sur vos réseaux. Répétez avec notre workflow clé en main.",
  },
];

const testimonials = [
  {
    name: "Aminata K.",
    role: "Coach en développement personnel",
    text: "J'avais peur de me montrer en vidéo depuis des années. Maintenant je publie 3 vidéos par semaine avec mon avatar. Incroyable !",
    stars: 5,
  },
  {
    name: "Rodrigue M.",
    role: "Entrepreneur digital",
    text: "En 2 heures de formation, j'avais déjà ma première vidéo IA prête. Le workflow est simple, efficace et je gagne un temps fou.",
    stars: 5,
  },
  {
    name: "Fatoumata D.",
    role: "Créatrice de contenu",
    text: "Je pensais que créer des vidéos pro coûtait cher. Maintenant je produis du contenu de qualité depuis mon téléphone. Merci Manuella !",
    stars: 5,
  },
];

const faqs = [
  {
    q: "Ai-je besoin d'une caméra ou d'un micro ?",
    a: "Non, absolument pas. Cette formation est conçue pour être accessible sans aucun équipement. Votre téléphone ou votre ordinateur suffit.",
  },
  {
    q: "Faut-il avoir des compétences en montage vidéo ?",
    a: "Aucune compétence technique n'est requise. La formation vous guide étape par étape, des notions de base jusqu'à la production complète.",
  },
  {
    q: "Combien de temps dure la formation ?",
    a: "La formation comprend 6 modules de 10 à 15 minutes chacun. Vous pouvez la compléter en une journée ou avancer à votre rythme.",
  },
  {
    q: "Comment accéder à la formation après le paiement ?",
    a: "Après votre paiement, vous recevez un email de confirmation. Rendez-vous ensuite sur la page /formation et entrez l'email utilisé lors du paiement pour accéder à vos vidéos.",
  },
  {
    q: "Google Flow est-il gratuit ?",
    a: "Google Flow propose un accès gratuit avec des fonctionnalités suffisantes pour créer du contenu de qualité. La formation vous explique exactement comment l'utiliser sans frais supplémentaires.",
  },
];

const offer = offers[0];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── HERO ── */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
            style={{ background: "hsl(270 60% 55%)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15"
            style={{ background: "hsl(43 72% 48%)" }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(hsl(43 72% 48%) 1px, transparent 1px), linear-gradient(90deg, hsl(43 72% 48%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium mb-8"
              style={{ borderColor: "hsl(43 72% 48% / 0.4)", color: "hsl(43 72% 48%)", background: "hsl(43 72% 48% / 0.08)" }}>
              <Sparkles className="h-3 w-3" />
              Manuella DJIENANG — Créatrice de contenus scientifiques
            </span>
          </div>

          <h1 className="animate-fade-in-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            Cette vidéo a été faite
            <br />
            <span className="gradient-text-gold">par une IA.</span>
            <br />
            <span className="text-foreground/70">Pas de caméra.</span>{" "}
            <span className="text-foreground/70">Pas de studio.</span>
          </h1>

          <p className="animate-fade-in-delay-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Apprenez à créer un avatar IA à votre image et à monter des vidéos professionnelles
            sur Google Flow — <strong className="text-foreground">sans vous montrer, sans matériel, sans compétences techniques.</strong>
          </p>

          <div className="animate-fade-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="group px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 animate-shimmer text-background"
              style={{ background: "linear-gradient(135deg, hsl(43 72% 48%), hsl(43 85% 62%))", border: "none" }}
              onClick={() => document.getElementById("offre")?.scrollIntoView({ behavior: "smooth" })}
            >
              Je veux créer mes vidéos IA
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <button
              onClick={() => document.getElementById("formation")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Voir ce que j'apprendrai →
            </button>
          </div>

          <div className="animate-fade-in-delay-3 mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {["Aucune caméra requise", "Aucun studio", "Résultats immédiats"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold" style={{ color: "hsl(var(--gold))" }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => document.getElementById("problemes")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </header>

      {/* ── PAIN POINTS ── */}
      <section id="problemes" className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium mb-3" style={{ color: "hsl(var(--purple))" }}>VOUS VOUS RECONNAISSEZ ?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ces blocages vous empêchent de publier.
              <br />
              <span className="gradient-text-gold">On va les éliminer ensemble.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {painPoints.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="group rounded-2xl border p-6 transition-all duration-300 hover:border-gold/40"
                style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "hsl(var(--purple) / 0.15)" }}>
                  <Icon className="h-6 w-6" style={{ color: "hsl(var(--purple))" }} />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU LEARN ── */}
      <section id="formation" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse at center, hsl(43 72% 48%) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium mb-3" style={{ color: "hsl(var(--gold))" }}>CE QUE VOUS ALLEZ APPRENDRE</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              3 étapes pour créer votre
              <br />
              <span className="gradient-text-purple-gold">présence vidéo IA</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-2xl mb-6 gradient-gold"
                  style={{ color: "hsl(var(--background))" }}>
                  {num}
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="offre" className="py-24 px-4">
        <div className="mx-auto max-w-lg">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-3" style={{ color: "hsl(var(--gold))" }}>VOTRE INVESTISSEMENT</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Une offre. Un accès complet.</h2>
          </div>

          <div className="rounded-3xl border p-8 relative overflow-hidden glow-gold"
            style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--gold) / 0.4)" }}>
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
              style={{ background: "hsl(var(--gold))" }} />

            <div className="relative z-10">
              {offer.badge && (
                <Badge className="mb-4 font-semibold px-3 py-1"
                  style={{ background: "hsl(var(--gold) / 0.15)", color: "hsl(var(--gold))", border: "1px solid hsl(var(--gold) / 0.3)" }}>
                  {offer.badge}
                </Badge>
              )}

              <h3 className="text-2xl font-bold text-foreground mb-2">{offer.name}</h3>
              <p className="text-5xl font-bold mb-1 gradient-text-gold">{formatFCFA(offer.price)}</p>
              <p className="text-muted-foreground text-sm mb-8">Paiement unique · Accès immédiat</p>

              <ul className="space-y-3 mb-8">
                {offer.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "hsl(var(--gold) / 0.2)" }}>
                      <Check className="h-3 w-3" style={{ color: "hsl(var(--gold))" }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full py-6 text-base font-semibold rounded-xl text-background"
                style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
                onClick={() => navigate(`/paiement?offre=${offer.id}`)}
              >
                Je démarre ma formation maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Paiement sécurisé · MTN MoMo & Orange Money acceptés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium mb-3" style={{ color: "hsl(var(--purple))" }}>ILS ONT DÉJÀ TRANSFORMÉ LEUR CONTENU</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ce que disent nos étudiants
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, stars }) => (
              <div key={name} className="rounded-2xl border p-6"
                style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: "hsl(var(--gold))" }} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{text}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-3" style={{ color: "hsl(var(--gold))" }}>FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Vos questions, nos réponses</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`faq-${i}`}
                className="rounded-xl border px-6"
                style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-3xl border p-12 relative overflow-hidden"
            style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--gold) / 0.3)" }}>
            <div className="absolute inset-0 pointer-events-none opacity-10"
              style={{ background: "radial-gradient(ellipse at center, hsl(var(--gold)) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Votre avatar IA vous attend.
                <br />
                <span className="gradient-text-gold">Commencez aujourd'hui.</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Rejoignez les créateurs qui publient du contenu professionnel chaque semaine,
                sans caméra, sans studio, sans stress.
              </p>
              <Button
                size="lg"
                className="px-10 py-6 text-base font-semibold rounded-xl text-background"
                style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
                onClick={() => navigate(`/paiement?offre=${offer.id}`)}
              >
                Accéder à la formation — {formatFCFA(offer.price)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground"
        style={{ borderColor: "hsl(var(--border))" }}>
        <p>© {new Date().getFullYear()} Manuella DJIENANG — Formation IA</p>
        <button onClick={() => navigate("/formation")}
          className="mt-2 text-xs hover:text-foreground transition-colors underline underline-offset-2">
          Accès espace formation
        </button>
      </footer>
    </div>
  );
};

export default Index;
