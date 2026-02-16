export interface Offer {
  id: string;
  name: string;
  price: number;
  badge?: string;
  features: string[];
}

export const offers: Offer[] = [
  {
    id: "basique",
    name: "Basique",
    price: 5000,
    features: [
      "Accès au cours en ligne",
      "Support par email",
      "Certificat de formation",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 15000,
    badge: "Populaire",
    features: [
      "Tout le pack Basique",
      "Accès au groupe WhatsApp privé",
      "Sessions de questions/réponses",
      "Ressources téléchargeables",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: 30000,
    features: [
      "Tout le pack Premium",
      "Mentorat individuel 1-on-1",
      "Accès à vie aux mises à jour",
      "Coaching personnalisé",
      "Priorité de support",
    ],
  },
];

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}
