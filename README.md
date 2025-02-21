# Prototype d'environnement de publication Web v2

Ce prototype utilise le framework Gatsby, contrairement à la version 1 qui était basée sur Astro. Il va donc vous falloir réexécuter la commande d'installation.

## Prérequis

### Node.js LTS

Par souci d'uniformité, nous allons tous utiliser la [version LTS courante de Node.js, soit 20.11.1](https://nodejs.org/).

Vous pouvez utiliser le gestionnaire [NVM Windows](https://github.com/coreybutler/nvm-windows) sur Windows, ou [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) pour macOS.

### Visual Code

Nous recommandons d'utiliser l'éditeur de code [Visual Sudio Code (VS Code)](https://code.visualstudio.com/) de Microsoft, avec les extensions suivantes:

- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx), pour une prise en charge de MDX, une extension du langage Markdown

## Installation

```
git clone https://github.com/bibudem/coquille-web.git
cd coquille-web
npm install
```

## Pour commencer

Exécutez la commande suivante dans le dossier du projet:

```
npm run dev
```

Puis ouvrez un navigateur à l'URL suivante:

[http://localhost:8000](http://localhost:8000)

Dans VS Code, allez dans `File > Open Folder...`, puis dirigez vous vers votre dossier `prototype-web` local du projet.

Les pages à éditer sont dans le dossier `content/`. Vous pouvez modifier le contenu des fichier ou ajouter des pages (`.mdx`), les changements seront reflétés instantanément dans votre navigateur.

### Autres commandes

| Commande          | Action                                                            |
| :---------------- | :---------------------------------------------------------------- |
| `npm install`     | Installs dependencies                                             |
| `npm run dev`     | Starts local dev server at `localhost:8000`                       |
| `npm run build`   | Build your production site to `./dist/`                           |
| `npm run preview` | Preview your build locally, before deploying, at `localhost:9000` |

### Déploiement automatique

Rafraîchissez cette page pour une mise à jour du statut de déploiement.

| Environnement  |                                                                             Statut de déploiement                                                                             |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| pre-production |    [![Netlify Status](https://api.netlify.com/api/v1/badges/fdb2105f-7cc4-4336-88c6-e5c09c794d74/deploy-status)](https://app.netlify.com/sites/bib-pp/deploys?branch=main)    |
|   production   | [![Netlify Status](https://api.netlify.com/api/v1/badges/fdb2105f-7cc4-4336-88c6-e5c09c794d74/deploy-status)](https://app.netlify.com/sites/bib-pp/deploys?branch=production) |

Chaque commit sur le dépôt GitHub déclanchera une nouvelle compilation des sources de la branche `main` et un déploiement sur Netlify à l'adresse:

[https://bib-pp.umontreal.ca](https://bib-pp.umontreal.ca/)

Les commits dans la branche production déclanchent un déploiement sur Netlify à l'adresse:

[https://bib-prod.umontreal.ca](https://bib-prod.umontreal.ca)\*

\* Adresse temporaire. Elle sera remplacée le jour du lancement du site par [https://bib.umontreal.ca](https://bib.umontreal.ca).

## Composants disponibles

Le prototype utilise la librairie [Material UI](https://mui.com/material-ui/). Tous les composants de cette librairie peuvent être utilisées dans les fichiers markdown (`.mdx`). Les composants suivants sont pré-chargés dans le prototype et peuvent donc être utilisés directement:

| Composant                                                                                                                                                                                                                                                                                             | Source (package node)      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| [Accordion](https://mui.com/material-ui/react-accordion/),<br />[AccordionDetails](https://mui.com/material-ui/react-accordion/),<br />[AccordionSummary](https://mui.com/material-ui/react-accordion/)                                                                                               | @mui/material              |
| [Button](https://mui.com/material-ui/react-button/)                                                                                                                                                                                                                                                   | @mui/material              |
| [Box](https://mui.com/material-ui/react-box/)                                                                                                                                                                                                                                                         | @mui/material              |
| CallToAction1                                                                                                                                                                                                                                                                                         | @bibudem/coquille-web      |
| CallToAction2                                                                                                                                                                                                                                                                                         | @bibudem/coquille-web      |
| Card1                                                                                                                                                                                                                                                                                                 | @bibudem/coquille-web      |
| [Carousel](https://learus.github.io/react-material-ui-carousel/)                                                                                                                                                                                                                                      | react-material-ui-carousel |
| [Divider](https://mui.com/material-ui/react-divider/)                                                                                                                                                                                                                                                 | @mui/material<br />        |
| [Grid v2](https://mui.com/material-ui/react-grid2/)                                                                                                                                                                                                                                                   | @mui/material              |
| IconInSquare                                                                                                                                                                                                                                                                                          | @bibudem/coquille-web      |
| Link                                                                                                                                                                                                                                                                                                  | @bibudem/coquille-web      |
| [List](https://mui.com/material-ui/react-list/),<br />[ListItem](https://mui.com/material-ui/react-list/),<br />[ListItemButton](https://mui.com/material-ui/react-list/),<br />[ListItemIcon](https://mui.com/material-ui/react-list/),<br />[ListItemText](https://mui.com/material-ui/react-list/) | @mui/material              |
| Section                                                                                                                                                                                                                                                                                               | @bibudem/coquille-web      |
| [Tabs](https://mui.com/material-ui/react-tabs/),<br />[Tab](https://mui.com/material-ui/react-tabs/)                                                                                                                                                                                                  | @mui/material              |
| [Typography](https://mui.com/material-ui/react-typography/)                                                                                                                                                                                                                                           | @mui/material              |

Les autres composants de la librairie doivent être importées pour être utilisées. Par exemple:

une-page.mdx

```jsx
---
title: Une page
---

import {Card, CardContent, CardMedia, CardActionArea }  from '@mui/material'

# Exemple React utilisant le composant Typography et d'autres composants importés localement

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hendrerit dolor magna eget est lorem.

<Card sx={{ maxWidth: 345 }}>
  <CardActionArea>
    <CardMedia
      component="img"
      height="140"
      image="/static/images/cards/contemplative-reptile.jpg"
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" sx={{ color: theme => theme.palette.text.secondary>
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>
```

Consultez la [documentation de Material UI](https://mui.com/material-ui/all-components/) pour la liste complète des composants disponibles.

## Pour créer une nouvelle release

- npm version minor -m "Bump v%s"
