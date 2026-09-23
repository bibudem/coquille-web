# AGENTS.md

Consignes pour les agents de code (Claude Code, Codex, Copilot, etc.) qui travaillent dans ce dépôt. Pour l'installation et le déploiement, voir [README.md](README.md).

## Le projet

Site Web des Bibliothèques de l'Université de Montréal, construit avec **Gatsby 5**, **React 18**, **MDX** et **MUI 6**. Il est déployé sur un serveur des Bibliothèques (pas sur Netlify).

- La langue du projet est le **français** : contenu, commentaires de code, messages de commit, descriptions de PR.
- Node **20.11.x** (voir `engines` dans `package.json`).

## Commandes

| Commande          | Effet                                                         |
| :---------------- | :------------------------------------------------------------ |
| `npm run dev`     | Serveur de développement sur `http://localhost:8000`          |
| `npm run build`   | Build de production dans `public/` (et non `dist/`)           |
| `npm run preview` | Sert le build local sur `http://localhost:9000`               |
| `npm run clean`   | Vide `.cache/` et `public/` (utile après un changement de config ou de `gatsby-node`) |

- Il n'y a **ni tests automatisés ni script de lint**. Pour valider un changement, lancez `npm run build`. Il échoue sur les erreurs GraphQL, les erreurs MDX et les erreurs de SSR que `develop` peut laisser passer.
- Un démarrage de `dev` prend environ 1 min à froid (après `npm run clean`) et de 25 s à 1 min 20 à chaud. Le build est gourmand en mémoire (`--max-old-space-size=8192`). Ne relancez pas ces commandes sans raison.

## Organisation

```
content/            Contenu éditorial (sources gatsby-source-filesystem)
  pages/            Pages du site en .mdx ; l'arborescence donne l'URL
  nouvelles/AAAA/   Nouvelles, par année (NouvelleTemplate)
  bibliotheques/    Fiches et images des bibliothèques
  personnel/        Répertoire du personnel (liste-personnel.xlsx + photos)
src/
  components/       Composants React utilisables dans le MDX
  components/_layout/  Coquille : AppBar, recherche, fil d'Ariane, pied de page…
  templates/        PageTemplate (défaut), DocTemplate, BlankTemplate, NouvelleTemplate…
  templates/commonComponents.js  Composants injectés dans tout le MDX sans import
  hooks/  utils/  icons/  images/
plugins/            Plugins Gatsby locaux
  gatsby-plugin-bib-theme/          Thème MUI, jetons de design, styles globaux
  gatsby-plugin-bib-secondary-nav/  Navigation secondaire (écrit site-navigation.json)
  gatsby-plugin-mdx/                Copie locale (fork) du plugin officiel ; à ne pas remplacer par la version npm
static/             Copié tel quel dans public/ (PDF, _redirects, vérifications Google)
gatsby-config.mjs   Plugins, sources, robots.txt selon la branche git
gatsby-node.mjs     Création des pages, index de recherche, libellés du fil d'Ariane,
                    chunk partagé en développement (onCreateWebpackConfig)
```

Le groupe webpack `devShared` de `onCreateWebpackConfig` (étapes `develop` et `develop-html` seulement) regroupe les modules partagés entre pages. Sans lui, chaque page MDX embarque sa propre copie de la mise en page et des bibliothèques : le cache `.cache/webpack` dépasse alors 12 Go et le démarrage à froid prend plus de deux fois plus de temps. Ne le retirez pas.

`public/` et `.cache/` sont **générés** et ignorés par git. Ne mettez jamais un fichier à suivre dans `public/`. Un fichier statique va dans `static/` (même URL publique).

## Pages MDX

Le frontmatter courant :

```yaml
---
title: Titre de la page
crumbLabel: Libellé court      # remplace le segment d'URL dans le fil d'Ariane
template: doc                  # doc | blank ; absent = PageTemplate
secondaryNav: ...              # entrées de la navigation secondaire
superHero: ...
noindex: true                  # exclut la page des moteurs ET de la recherche interne
---
```

- `template: xyz` est résolu en `src/templates/XyzTemplate.jsx` (voir `gatsby-node.mjs`). Les fichiers sous `content/nouvelles/` utilisent toujours `NouvelleTemplate`.
- Les composants de `commonComponents.js` sont disponibles sans import. Les autres s'importent en tête du fichier MDX.
- Le dossier `content/pages/dev/` et `tests.mdx` sont des pages de démonstration ou utilitaires. Elles sont exclues de la recherche interne (`gatsby-node.mjs`) et, en partie, du sitemap (`gatsby-config.mjs`).
- Le serveur de consentements (`/consent/server/`, chargé en iframe sur chaque page par `bib-consent`) est une page HTML statique : `static/consent/server/index.html`. Ne la recréez pas en MDX : une page Gatsby y ajouterait toute l'application (~1 Mo) pour chaque visiteur.
- Le niveau de page (`context.lvl`) est calculé au build dans `gatsby-node.mjs`. Ne le recalculez pas côté client à partir de `location.pathname`, sinon le HTML du SSR ne correspond plus au rendu hydraté.

## Conventions de code

- **Alias d'import** : `@/components`, `@/hooks`, `@/icons`, `@/images`, `@/utils` (voir `gatsby-plugin-alias-imports`).
- **Imports par fichier, jamais par baril.** Ce point compte beaucoup pour le temps de démarrage de `dev` (−58 % mesuré) :
  ```js
  // Oui
  import Box from '@mui/material/Box'
  import { ChatsIcon } from '@phosphor-icons/react/dist/csr/Chats'
  import { format } from 'date-fns/format'
  import { frCA } from 'date-fns/locale/fr-CA'

  // Non
  import { Box } from '@mui/material'
  import { ChatsIcon } from '@phosphor-icons/react'
  import { format } from 'date-fns'
  import { frCA } from 'date-fns/locale'
  ```
- Composants en `.jsx` (JavaScript, pas de TypeScript), en PascalCase, avec une exportation par défaut. Pas besoin d'`import React` : `gatsby-plugin-provide-react` le fournit.
- Style : MUI (`sx`, `styled`) et les jetons du thème dans `plugins/gatsby-plugin-bib-theme/tokens`. N'écrivez pas de couleurs ou de polices en dur.
- Accessibilité : le site vise la conformité WCAG. Donnez aux icônes décoratives `aria-hidden` et à celles qui portent un sens un libellé, et gardez des titres hiérarchisés.
- Tout code rendu doit fonctionner au SSR : pas d'accès à `window` ou `document` en dehors de `useEffect`.
- Les commentaires expliquent le **pourquoi** en français, comme dans `gatsby-node.mjs`.

## Images

Les images sources vont dans `content/**/images/` ou `src/images/`, avec **2400 px maximum** sur le plus grand côté et une compression adaptée. `gatsby-plugin-sharp` génère les variantes (webp/jpg, 600 à 1536 px). Des originaux de plusieurs Mo alourdissent le dépôt et le build.

## Git et PR

- Branches : `feature/<sujet>` ou `fix/<sujet>`, fusionnées dans `main` par PR.
- `main` et `production` sont déployées sur un serveur des Bibliothèques, qui garde un clone git par environnement : `main` pour la pré-production (**bib-pp.umontreal.ca**), `production` pour le site public. `gatsby-config.mjs` déduit l'environnement de la branche git courante (robots.txt) ; `SITE_ENV` peut le forcer. Ne poussez jamais directement sur ces branches.
- Commits au format **Conventional Commits** en français : `type(portée): description` (ex. `feat(breadcrumbs): …`, `perf(dev): …`, `content(…): …`). Les portées usuelles sont `coquille`, `theme`, `component`, `icons`, `accessibilite`, `nouvelles`, `repertoire-personnel` et `dependencies`. Le corps explique le pourquoi et donne les mesures s'il y a lieu.
- **Ne committez rien sans l'accord explicite de l'utilisateur.** Rédiger un message de commit ne veut pas dire committer.
- **Poussez immédiatement chaque commit accepté** (`git push`, ou `git push -u origin <branche>` si la branche n'a pas encore d'amont). L'accord donné pour un commit vaut pour sa poussée. Vérifiez d'abord qu'aucun commit poussé ne contient de ligne d'attribution (voir ci-dessous) : une fois poussé, l'historique est difficile à réécrire.
- Pas de ligne `Co-Authored-By` ni de mention « Generated with … » dans les commits et les PR.
