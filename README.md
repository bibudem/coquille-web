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
git clone https://github.com/bibudem/prototype-web.git
cd prototype-web
npm install
```

## Pour commencer

Exécutez la commande suivante dans le dossier du projet:

```
npm run dev
```

Puis ouvrez un navigateur à l'URL suivante:

http://localhost:8000

Dans VS Code, allez dans `File > Open Folder...`, puis dirigez vous vers votre dossier `prototype-web` local du projet.

Les pages à éditer sont dans le dossier `content/`. Vous pouvez modifier le contenu des fichier ou ajouter des pages (`.mdx`), les changements seront reflétés instantanément dans votre navigateur.

### Autres commandes

| Commande          | Action                                                            |
| :---------------- | :---------------------------------------------------------------- |
| `npm install`     | Installs dependencies                                             |
| `npm run dev`     | Starts local dev server at `localhost:8000`                       |
| `npm run build`   | Build your production site to `./dist/`                           |
| `npm run preview` | Preview your build locally, before deploying, at `localhost:9000` |

### Composants disponibles

Le prototype utilise la librairie [Material UI](https://mui.com/material-ui/). Tous les composants de cette librairie peuvent être utilisées dans les fichiers markdown (`.mdx`). Les composants suivants sont pré-chargés dans le prototype et peuvent donc être utilisés directement:

- Link
- [Accordion, AccordionDetails, AccordionSummary](https://mui.com/material-ui/react-accordion/)
- [Button](https://mui.com/material-ui/react-button/)
- [Box](https://mui.com/material-ui/react-box/)
- [Divider](https://mui.com/material-ui/react-divider/)
- [Tabs, Tab](https://mui.com/material-ui/react-tabs/)

Les autres composants de la librairie doivent être importées pour être utilisées:

une-page.mdx

```jsx
---
title: Une page
---

import {Card, CardContent, CardMedia, CardActionArea, Typography }  from '@mui/material'

# Un titre

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
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>
```

Consultez la [documentation de Material UI](https://mui.com/material-ui/all-components/) pour la liste complète des composants disponibles.
