import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "Produits", href: "/" },
  { label: "Affiliation", href: "/affiliation" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ background: "hsl(var(--background) / 0.85)", borderColor: "hsl(var(--border))" }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-gold text-background text-xs font-bold">
            IA
          </div>
          <span className="hidden sm:inline">ARKCOM IA</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            to="/formation"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Mes formations
          </Link>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-1">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 pb-4 pt-2" style={{ borderColor: "hsl(var(--border))" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-medium transition-colors ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/formation"
            onClick={() => setOpen(false)}
            className="block py-2.5 text-sm font-medium text-muted-foreground"
          >
            Mes formations
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
