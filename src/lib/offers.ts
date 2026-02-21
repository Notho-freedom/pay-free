export interface Offer {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  badge?: string;
  discount: string;
  type: "course" | "downloadable";
  rating: number;
  ratingCount: number;
  students?: number;
  sold?: number;
  remaining?: number;
  coverImage: string;
  features: string[];
  courseContent: {
    title: string;
    description: string;
    lessons: number;
    items: string[];
  }[];
  salesCopy: {
    hook: string;
    painPoints: string[];
    outcomes: string[];
    bonuses: string[];
  };
  faq: { q: string; a: string }[];
  testimonials: {
    name: string;
    text: string;
  }[];
}

export const offers: Offer[] = [
  {
    id: "formation-ia",
    slug: "avatar-content",
    name: "Apprends à créer du contenu vidéo avec ton AVATAR IA",
    price: 3500,
    originalPrice: 10900,
    badge: "68% OFF",
    discount: "68%",
    type: "course",
    rating: 100,
    ratingCount: 3,
    students: 94,
    coverImage: "https://images.chariow.com/cdn-cgi/image/format=auto,onerror=redirect,quality=medium-high,slow-connection-quality=50/https://assets.cdn.chariow.com/thumbnail_pictures/Jma2SQD5mtf7dTmpZ7nNU7XeH91dQTXm8TdDoylu.png",
    features: [
      "Création de votre avatar IA",
      "Rédaction de script",
      "Génération de vidéos avec votre avatar",
      "Montage de la vidéo générée",
      "Stratégie de contenus",
      "Accès instantané",
      "Bonus exclusifs",
    ],
    courseContent: [
      {
        title: "PRESENTATION DE LA FORMATION",
        description: "Dans cette vidéo, je te présente la formation, son fonctionnement et ce que tu vas apprendre étape par étape. Je t'explique les objectifs de la formation et les résultats concrets que tu pourras obtenir à la fin.",
        lessons: 1,
        items: ["INTRODUCTION"],
      },
      {
        title: "CHAPITRE 1 : Création de ton avatar avec Nano Banana de Gemini",
        description: "Dans ce chapitre, tu apprendras à créer ton propre avatar réaliste qui te ressemble avec Nano Banana de Gemini et les bonnes techniques de prompting pour créer une bonne image de ton avatar.",
        lessons: 1,
        items: ["Création de ton avatar avec Nano Banana de Gemini"],
      },
      {
        title: "CHAPITRE 2 : Rédaction de scripts captivants avec ChatGPT & Claude AI",
        description: "Dans ce chapitre, je te montre comment rédiger des scripts simples, clairs et efficaces avec ChatGPT ou Claude AI, afin de capter l'attention, transmettre un message précis et donner envie de regarder la vidéo jusqu'à la fin.",
        lessons: 1,
        items: ["Rédaction de scripts captivants avec ChatGPT & Claude AI"],
      },
      {
        title: "CHAPITRE 3 : Génération de vidéos avatar avec Google AI Flow",
        description: "Dans ce chapitre, tu apprendras à générer des vidéos de qualité avec Google AI Flow, à rédiger de bons prompts et à appliquer les règles essentielles pour obtenir des vidéos bien structurées, fluides et cohérentes.",
        lessons: 1,
        items: ["Génération de vidéos avec Google AI Flow"],
      },
      {
        title: "CHAPITRE 4 : Montage vidéo captivant avec CapCut",
        description: "Dans ce chapitre, je t'explique comment monter correctement tes vidéos avec CapCut, ajouter des sous-titres, du texte et des effets, et rendre tes vidéos dynamiques et agréables à regarder sur les réseaux sociaux.",
        lessons: 1,
        items: ["Montage vidéo captivant avec CapCut"],
      },
      {
        title: "CHAPITRE 5 : Stratégies de contenu",
        description: "Dans ce chapitre, tu découvriras comment publier efficacement sur Facebook et TikTok, quoi poster, quand poster et comment structurer tes vidéos pour attirer l'attention, garder les viewers et obtenir plus d'engagement.",
        lessons: 1,
        items: ["Stratégies de contenu"],
      },
      {
        title: "🎁 BONUS EXCLUSIFS",
        description: "Dans ce bonus, tu bénéficieras d'un accès gratuit à la version Pro de Gemini, à Google Veo 3, ainsi qu'à une formation complète en montage vidéo sur CapCut pour aller encore plus loin.",
        lessons: 2,
        items: ["ACCES GRATUIT A VEO 3 ET GEMINI PRO", "FORMATION COMPLETE MONTAGE VIDEO AVEC CAPCUT"],
      },
    ],
    salesCopy: {
      hook: "Crée facilement des vidéos avec ton avatar IA et transforme-les en vrai contenu, même si tu pars de zéro !",
      painPoints: [
        "Tu veux créer du contenu vidéo sur les réseaux mais tu n'aimes pas te montrer devant la caméra ou tu n'as pas le temps ni les moyens pour aller tourner dans un studio.",
        "Tu vois plein de vidéos avec avatars IA partout. Tu sais que c'est puissant.",
        "Tu ne sais pas par où commencer",
        "Tu génères des vidéos… mais tu ne sais pas quoi en faire",
        "Tu manques de méthode claire",
        "Tu n'es pas régulier",
        "Tu doutes : « Est-ce que ça peut vraiment marcher pour moi ? »",
      ],
      outcomes: [
        "Créer facilement des vidéos avec ton avatar IA",
        "Comprendre quoi publier, comment et dans quel ordre",
        "Transformer l'IA en outil de création, pas en gadget",
        "Publier sans te montrer, sans stress, sans te perdre",
      ],
      bonuses: [
        "Accès gratuit à la version Pro de Gemini",
        "Accès à Google Veo 3 pour la génération de vidéos IA avancées",
        "Formation complète en montage vidéo sur CapCut (de débutant à avancé)",
      ],
    },
    faq: [
      { q: "Je suis débutant, est-ce que je vais comprendre ?", a: "Oui. La formation est pensée pour quelqu'un qui part de zéro." },
      { q: "Je ne veux pas me montrer à la caméra.", a: "Justement. Tout repose sur l'avatar IA." },
      { q: "Est-ce que c'est compliqué techniquement ?", a: "Non. Je simplifie tout." },
      { q: "Quand est-ce que j'ai accès ?", a: "Immédiatement après l'achat." },
    ],
    testimonials: [
      { name: "Ousmane M.", text: "Formation très très riche du fond à la forme. Il y'a rien a dire. Sans faute la meilleure des Formations." },
      { name: "Frank lirice K.", text: "Bonne formation." },
      { name: "Arthur B.", text: "Très bonne formation. Je suis très content car grâce à cette formation, j'ai pu acquérir une nouvelle expérience très importante dans le cadre du business d'affaires. Vraiment « MERCI »." },
    ],
  },
  {
    id: "cours-rapide",
    slug: "cours-rapide",
    name: "Cours rapide : créez des vidéos IA facilement et efficacement",
    price: 2500,
    originalPrice: 15000,
    badge: "83% OFF",
    discount: "83%",
    type: "downloadable",
    rating: 0,
    ratingCount: 0,
    sold: 21,
    remaining: 4,
    coverImage: "https://images.chariow.com/cdn-cgi/image/format=auto,onerror=redirect,quality=medium-high,slow-connection-quality=50/https://assets.cdn.chariow.com/assets/store_aqchl3thfksd/6vBIx7fCLe0oESHcrZjEUWWd26jujXc1CIwAclC7.png",
    features: [
      "Cours rapides",
      "Format vidéo",
      "Formation CapCut incluse",
      "Accès instantané",
    ],
    courseContent: [],
    salesCopy: {
      hook: "Tu souhaites créer tes premières vidéos avec l'intelligence artificielle rapidement et sans te perdre dans des tutoriels complexes ? Tu es au bon endroit !",
      painPoints: [],
      outcomes: [
        "Une formation vidéo simple et facile à comprendre",
        "Une méthode rapide et accessible pour créer ta première vidéo même si tu n'as aucune expérience, simplement avec ton smartphone",
      ],
      bonuses: [],
    },
    faq: [],
    testimonials: [],
  },
];

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}
