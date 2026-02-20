import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Lock, Play, GraduationCap, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// ─── UPDATE THESE WITH YOUR REAL VIDEO LINKS ───────────────────────────────
const videos = [
  {
    id: 1,
    title: "Module 1 — Introduction & Vue d'ensemble",
    desc: "Comprendre ce que vous allez créer et comment l'IA va transformer votre contenu.",
    url: "https://www.youtube.com/embed/VOTRE_LIEN_1",
  },
  {
    id: 2,
    title: "Module 2 — Créer votre avatar IA",
    desc: "Générer un avatar à votre image, personnaliser votre apparence et votre voix.",
    url: "https://www.youtube.com/embed/VOTRE_LIEN_2",
  },
  {
    id: 3,
    title: "Module 3 — Prendre en main Google Flow",
    desc: "Explorer l'interface, comprendre les fonctionnalités clés et créer votre premier projet.",
    url: "https://www.youtube.com/embed/VOTRE_LIEN_3",
  },
  {
    id: 4,
    title: "Module 4 — Produire votre première vidéo",
    desc: "Rédiger un script efficace et générer votre première vidéo avec votre avatar.",
    url: "https://www.youtube.com/embed/VOTRE_LIEN_4",
  },
  {
    id: 5,
    title: "Module 5 — Optimiser et exporter",
    desc: "Peaufiner le rendu, ajouter des éléments visuels et exporter en qualité professionnelle.",
    url: "https://www.youtube.com/embed/VOTRE_LIEN_5",
  },
  {
    id: 6,
    title: "Module 6 — Workflow & Stratégie de publication",
    desc: "Mettre en place un système de création régulière et publier efficacement sur vos réseaux.",
    url: "https://www.youtube.com/embed/VOTRE_LIEN_6",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const Formation = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const checkAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: dbError } = await supabase
        .from("transactions")
        .select("id, status")
        .eq("customer_email", email.trim().toLowerCase())
        .in("status", ["completed", "complete"])
        .limit(1)
        .maybeSingle();

      if (dbError) throw dbError;

      if (data) {
        setHasAccess(true);
      } else {
        setError(
          "Aucun accès trouvé pour cet email. Vérifiez l'adresse utilisée lors du paiement ou contactez le support."
        );
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (hasAccess) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        {/* Ambient */}
        <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: "hsl(var(--gold))" }} />

        <div className="mx-auto max-w-5xl relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "hsl(var(--gold) / 0.15)" }}>
                <GraduationCap className="h-5 w-5" style={{ color: "hsl(var(--gold))" }} />
              </div>
              <div>
                <h1 className="font-bold text-foreground text-lg leading-tight">Espace Formation</h1>
                <p className="text-xs text-muted-foreground">Avatar IA & Google Flow</p>
              </div>
            </div>
            <button onClick={() => navigate("/")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Accueil
            </button>
          </div>

          <p className="text-muted-foreground text-sm mb-8">
            Bienvenue ! Voici vos <strong className="text-foreground">{videos.length} modules</strong> de formation. Cliquez sur un module pour le regarder.
          </p>

          {/* Video grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id}>
                {activeVideo === video.id ? (
                  <div className="rounded-2xl border overflow-hidden"
                    style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--gold) / 0.4)" }}>
                    <div className="aspect-video bg-black">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-foreground text-sm">{video.title}</p>
                      <button onClick={() => setActiveVideo(null)}
                        className="text-xs text-muted-foreground hover:text-foreground mt-2 transition-colors">
                        ↑ Fermer
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveVideo(video.id)}
                    className="w-full text-left rounded-2xl border p-5 transition-all hover:border-gold/40 group"
                    style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                        style={{ background: "hsl(var(--gold) / 0.1)" }}>
                        <Play className="h-5 w-5 group-hover:scale-110 transition-transform"
                          style={{ color: "hsl(var(--gold))" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm mb-1 leading-snug">{video.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{video.desc}</p>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-12">
            Des questions ? Contactez le support par email.
          </p>
        </div>
      </div>
    );
  }

  // ── Gate page ──
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[120px] opacity-10"
          style={{ background: "hsl(var(--purple))" }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-10"
          style={{ background: "hsl(var(--gold))" }} />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>

        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "hsl(var(--gold) / 0.15)" }}>
            <Lock className="h-8 w-8" style={{ color: "hsl(var(--gold))" }} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Espace Formation</h1>
          <p className="text-sm text-muted-foreground">
            Entrez l'email utilisé lors de votre achat pour accéder à vos vidéos.
          </p>
        </div>

        <div className="rounded-2xl border p-6"
          style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
          <form onSubmit={checkAccess} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg p-3"
                style={{ background: "hsl(var(--destructive) / 0.1)", border: "1px solid hsl(var(--destructive) / 0.3)" }}>
                <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-xs text-destructive leading-relaxed">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-5 font-semibold rounded-xl text-background"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
              disabled={loading}
            >
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Vérification…</>
                : "Accéder à ma formation"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Pas encore inscrit ?{" "}
          <button onClick={() => navigate("/")}
            className="underline hover:text-foreground transition-colors">
            Voir la formation
          </button>
        </p>
      </div>
    </div>
  );
};

export default Formation;
