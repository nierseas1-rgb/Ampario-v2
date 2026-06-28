# Ampario — Immobilier de prestige

Site immobilier moderne pour la présentation de biens **à la vente** et **à la
location** : maisons, appartements, villas, terrains, immeubles et locaux
commerciaux.

Construit avec **Next.js 16 (App Router)**, **TypeScript** et **Tailwind CSS**.

## ✨ Fonctionnalités

### Navigation & pages
- **Accueil** : hero immersif, recherche multicritère, catégories, coups de
  cœur, exclusivités, ventes récentes, statistiques et bandeaux d'appel.
- **Annonces** (`/proprietes`) : filtres avancés (transaction, type, budget,
  surface, chambres, exclusivités), tri, vue grille responsive, version mobile
  avec tiroir de filtres.
- **Fiche bien** (`/proprietes/[id]`) : galerie avec lightbox, chiffres clés,
  description, prestations, diagnostics DPE/GES, carte de localisation,
  simulateur de financement, contact du conseiller, biens similaires.
- **Vendre** (`/vendre`) & **Estimation** (`/estimation`) : assistant
  d'estimation interactif en plusieurs étapes.
- **Simulateur de prêt** (`/simulateur`) : calcul de mensualité en temps réel.
- **Vue carte interactive** : bascule grille/carte sur les annonces, épingles
  de prix géolocalisées et fiche au survol.
- **Comparateur de biens** (`/comparateur`) : jusqu'à 3 biens confrontés
  caractéristique par caractéristique, avec barre flottante.
- **Gestion locative** (`/gestion-locative`), **Actualités / blog**
  (`/actualites`), **Avis clients** (`/avis`), **FAQ** (`/faq`).
- **Agences** (`/agences`), **Contact** (`/contact`), **Infoline**
  (`/infoline`), **Mentions légales** (`/mentions-legales`).

### Compte & personnalisation
- **Création de compte / Connexion** (`/inscription`, `/connexion`) — auth
  simulée côté client (localStorage).
- **Espace personnel** (`/compte`) : favoris, alertes email personnalisées,
  profil.
- **Favoris** (`/favoris`) : ajout/retrait depuis n'importe quelle carte,
  persistance locale, compteur dans l'en-tête.

### Détails d'expérience
- Barre **Infoline** (téléphone, email, horaires, sélecteur de langue).
- En-tête collant avec navigation, menu mobile et menu compte.
- **Notifications toast**, **bandeau cookies** (RGPD), **bouton retour en haut**.
- **Biens consultés récemment**, **partage social** (Facebook, X, LinkedIn,
  copie de lien).
- **SEO** : sitemap, robots, manifest PWA, favicon, Open Graph.
- Newsletter, design responsive, animations douces, identité de marque
  (bleu marine / or / crème) reprise du logo « AP ».

## 🎨 Identité

| Élément   | Couleur    |
| --------- | ---------- |
| Navy      | `#16243f`  |
| Or        | `#b8975a`  |
| Crème     | `#f5f2ea`  |

Polices : Cormorant Garamond (titres) · Plus Jakarta Sans (texte).

## 🚀 Démarrage

```bash
npm install
npm run dev     # http://localhost:3000
```

### Build de production

```bash
npm run build
npm start
```

## 🗂️ Structure

```
src/
├── app/            # Pages (App Router)
├── components/     # Composants UI réutilisables
├── context/        # Auth & Favoris (React Context + localStorage)
├── data/           # Modèle de données & jeu de biens
└── lib/            # Utilitaires de formatage
```

## 📌 Notes

- Les données des biens sont des **données de démonstration**
  (`src/data/properties.ts`). Le branchement à un CMS ou une API peut remplacer
  ce module sans toucher à l'UI.
- L'authentification et les favoris sont stockés dans le **navigateur**
  (localStorage) — aucun backend requis pour la démo.
- Les images proviennent d'Unsplash (configuré dans `next.config.mjs`).
