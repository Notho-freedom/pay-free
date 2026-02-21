import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open WhatsApp with the message
    const text = encodeURIComponent(
      `Bonjour, je suis ${form.firstName} ${form.lastName}.\n\n${form.message}\n\nEmail: ${form.email}\nTél: ${form.phone}`
    );
    window.open(`https://wa.me/2290141822325?text=${text}`, "_blank");
    toast.success("Redirection vers WhatsApp...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
          {/* Left */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
              Contactez notre équipe
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Nous sommes là pour vous aider. Vous pouvez nous contacter par WhatsApp ou email.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Appelez-nous</p>
                <a href="tel:2290141822325" className="flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors">
                  <Phone className="h-4 w-4" style={{ color: "hsl(var(--gold))" }} />
                  +229 01 41 82 23 25
                </a>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Chattez sur WhatsApp</p>
                <a
                  href="https://wa.me/2290141822325"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors"
                >
                  <MessageCircle className="h-4 w-4" style={{ color: "hsl(var(--gold))" }} />
                  wa.me/2290141822325
                </a>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Envoyez un email</p>
                <a href="mailto:arkcomia@gmail.com" className="flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors">
                  <Mail className="h-4 w-4" style={{ color: "hsl(var(--gold))" }} />
                  arkcomia@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border p-6" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Prénom *</Label>
                  <Input
                    required
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs">Nom *</Label>
                  <Input
                    required
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground text-xs">Téléphone *</Label>
                <Input
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground text-xs">Email *</Label>
                <Input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground text-xs">Message *</Label>
                <Textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              <Button
                type="submit"
                className="font-semibold rounded-xl text-background"
                style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))", border: "none" }}
              >
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
