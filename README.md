# Prototype d'environnement de publication Web

Basé sur [_Accessible Astro Starter_](https://github.com/markteekman/accessible-astro-starter) (🚀 [Live Preview](https://accessible-astro.netlify.app/))

## Prérequis

### Node.js LTS

Par souci d'uniformité, nous allons tous utiliser la [version LTS courante de Node.js, soit 20.11.1](https://nodejs.org/).

Vous pouvez utiliser le gestionnaire [NVM Windows](https://github.com/coreybutler/nvm-windows) sur Windows, ou [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) pour macOS.

### Visual Code

Nous recommandons d'utiliser l'éditeur de code [Visual Sudio Code (VS Code)](https://code.visualstudio.com/) de Microsoft, avec les extensions suivantes:

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode), le plugin officiel d'Astro pour VS Code
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

http://localhost:4321

Dans VS Code, allez dans `File > Open Folder...`, puis dirigez vous vers votre dossier `prototype-web` local du projet.

Les pages à éditer sont dans le dossier `src/pages/`. Vous pouvez modifier le contenu des fichier ou ajouter des pages (.astro, .md, .mdx ou .html), les changements seront reflétés instantanément dans votre navigateur.

### Autres commandes

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
