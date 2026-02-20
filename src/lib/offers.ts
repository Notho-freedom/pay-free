export interface Offer {
  id: string;
  name: string;
  price: number;
  badge?: string;
  features: string[];
}

export const offers: Offer[] = [
  {
    id: "formation-ia",
    name: "Formation Complète",
    price: 25000,
    badge: "Accès à vie",
    features: [
      "6 modules vidéo (10–15 min chacun)",
      "Créer votre avatar IA personnalisé",
      "Maîtriser Google Flow de A à Z",
      "Monter des vidéos pro sans caméra",
      "Workflow clé en main réutilisable",
      "Support par email inclus",
    ],
  },
];

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}
