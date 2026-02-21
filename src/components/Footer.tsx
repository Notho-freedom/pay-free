import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 font-bold text-foreground mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-gold text-background text-xs font-bold">
              IA
            </div>
            ARKCOM IA
          </div>
        </div>

        {/* Links */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Liens</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/formation" className="block hover:text-foreground transition-colors">Mes formations</Link>
            <Link to="/a-propos" className="block hover:text-foreground transition-colors">À propos</Link>
            <Link to="/contact" className="block hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>

        {/* Legal */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Légal</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Mentions légales</p>
            <p>Conditions d'utilisation</p>
            <p>Politique de confidentialité</p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t text-xs text-muted-foreground" style={{ borderColor: "hsl(var(--border))" }}>
        <p className="mb-2">
          Ce site n'est en aucun cas affilié à Facebook ou Meta. Nous utilisons la publicité pour promouvoir notre contenu et nos produits/services auprès d'un public plus large. Les informations fournies sur ce site sont à titre informatif uniquement.
        </p>
        <p>ARKCOM IA © {new Date().getFullYear()} Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
