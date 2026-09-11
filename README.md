# PayFree

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/) [![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

**Boutique web de formations et ressources pratiques autour de l'intelligence artificielle.**

PayFree est une application React qui présente des offres numériques, leurs détails et leur contenu, puis guide l'utilisateur vers un parcours d'achat et de confirmation. Le catalogue actuel comprend notamment une formation sur la création de contenu vidéo avec un avatar IA et un cours rapide consacré à la création de vidéos IA.

## Parcours utilisateur

- **Catalogue** — découverte des offres et recherche de produits.
- **Fiche produit** — présentation détaillée d'une offre, de ses caractéristiques et de son contenu.
- **Paiement** — parcours d'achat dédié à l'offre sélectionnée.
- **Confirmation** — écran de confirmation après le parcours de paiement.
- **Formation** — espace lié aux contenus de formation.
- **Affiliation** — page dédiée au programme d'affiliation.
- **À propos & contact** — pages d'information et de contact.

Les routes actuellement déclarées sont `/`, `/produit/:slug`, `/paiement`, `/confirmation`, `/formation`, `/a-propos`, `/contact` et `/affiliation`.

## Catalogue actuel

Les offres sont définies dans `src/lib/offers.ts`. Le modèle de données couvre notamment les prix en FCFA, réductions, évaluations, contenus de cours, bonus, FAQ et témoignages.

## Stack technique

- **Frontend:** React 18 + TypeScript
- **Build:** Vite 5
- **Routing:** React Router
- **Backend/data:** Supabase JavaScript client + TanStack Query
- **UI:** Tailwind CSS + Radix UI / shadcn-style components
- **Forms & validation:** React Hook Form + Zod
- **Motion & UI:** Framer Motion, Lucide React, Sonner
- **Testing:** Vitest + Testing Library

## Développement

Prérequis : Node.js et npm.

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
```

Lint et tests :

```bash
npm run lint
npm test
```

## Structure

```text
src/
├── components/       # Navigation, catalogue, paiement et UI
├── pages/            # Parcours et pages principales
├── lib/              # Données des offres et utilitaires
├── integrations/     # Intégrations backend
└── App.tsx           # Providers et routing
```

## État du projet

PayFree est actuellement une application web orientée catalogue et parcours d'achat pour des produits numériques de formation. Ce README décrit volontairement le périmètre observable dans le code actuel plutôt que de présenter le projet comme une plateforme e-commerce plus large qu'elle ne l'est réellement.

## Auteur

**Ravel Momo** — [@Notho-freedom](https://github.com/Notho-freedom)
