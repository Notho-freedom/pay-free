

# Plan d'implémentation - Site de Paiement Formation en Ligne 🎓

## Phase 1 : Fondations & Design System
- Mise en place du thème de couleurs (accents verts mobile money, design sobre et moderne)
- Layout mobile-first responsive
- Composants de base réutilisables (boutons, cartes, formulaires)

## Phase 2 : Page d'accueil / Landing
- Hero section avec titre accrocheur et description de la formation
- Bouton d'appel à l'action vers les offres
- Design épuré et engageant

## Phase 3 : Section Offres
- 3 cartes comparatives (Basique, Premium, VIP)
- Chaque carte affiche : nom, prix en FCFA, liste des avantages
- Bouton "Payer maintenant" sur chaque carte qui redirige vers le formulaire de paiement

## Phase 4 : Backend Supabase Cloud
- Activation de Lovable Cloud (Supabase)
- Table `transactions` pour stocker : référence, statut, nom, email, téléphone, offre choisie, montant, date
- **Edge Function `initialize-payment`** : reçoit les infos client + offre, appelle l'API NotchPay pour initier un paiement mobile money (MTN MoMo ou Orange Money), retourne l'URL/instructions de paiement
- **Edge Function `notchpay-webhook`** : reçoit la confirmation de paiement depuis NotchPay, met à jour le statut de la transaction dans la base de données
- Stockage sécurisé de la clé API NotchPay dans les secrets Supabase

## Phase 5 : Page de Paiement
- Formulaire avec validation : Nom, Numéro de téléphone, Email
- Sélection du mode de paiement (MTN Mobile Money / Orange Money) avec icônes
- Récapitulatif de la commande (offre + montant en FCFA)
- Appel à l'edge function pour initialiser le paiement NotchPay
- Gestion des états : chargement, erreur, en attente de confirmation

## Phase 6 : Page de Confirmation
- Message de succès après paiement confirmé
- Facture affichée à l'écran avec : nom du client, date, montant, référence de transaction, offre choisie
- Bouton pour télécharger la facture en PDF
- Lien WhatsApp bien visible avec bouton "Rejoindre le groupe"

## Prérequis utilisateur
- Créer un compte sur [notchpay.co](https://notchpay.co) et obtenir la clé API
- Fournir le lien du groupe WhatsApp
- Définir les prix et avantages exacts des 3 formules

