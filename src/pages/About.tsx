import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">À propos d'ARKCOM IA</h1>

      <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
        <p>
          Bienvenue chez ARKCOM IA ! Nous sommes passionnés par la fourniture de produits numériques de haute qualité qui vous aident à atteindre vos objectifs et à élargir vos connaissances.
        </p>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">Notre Mission</h2>
          <p>
            Notre mission est de rendre le contenu numérique premium accessible à tous. Nous sélectionnons soigneusement notre collection pour garantir que chaque produit répond à nos standards élevés de qualité et de valeur.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">Ce que nous offrons</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Cours numériques et contenu éducatif</li>
            <li>Outils logiciels et applications</li>
            <li>Templates et ressources de design</li>
            <li>eBooks et guides</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">Notre Engagement</h2>
          <p>
            Nous nous engageons à fournir un excellent service client et à garantir votre satisfaction à chaque achat. Notre équipe est toujours là pour vous aider à tirer le meilleur parti de nos produits.
          </p>
        </div>

        <p>
          Merci d'avoir choisi ARKCOM IA. Nous avons hâte de vous servir !
        </p>

        <p>
          Si vous avez des questions, n'hésitez pas à nous contacter à{" "}
          <a href="mailto:arkcomia@gmail.com" className="text-foreground underline underline-offset-2 hover:text-gold transition-colors">
            arkcomia@gmail.com
          </a>
          .
        </p>
      </div>

      <div className="flex gap-3 mt-8">
        <Button
          asChild
          className="font-semibold rounded-xl text-background"
          style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
        >
          <Link to="/">Acheter un produit</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/contact">Nous contacter</Link>
        </Button>
      </div>
    </main>

    <Footer />
  </div>
);

export default About;
