import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import GatsbyAdapterNetlifyModule from 'gatsby-adapter-netlify'
import 'dotenv/config'

const adapter = GatsbyAdapterNetlifyModule.default
const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = {
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
    imageCDN: false,
  }),
  flags: {
    // DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Les bibliothèques / UdeM',

    description: `Site Web des Bibliothèques de l'Université de Montréal`,
    twitterUsername: `@bibUdeM`,
    image: `/gatsby-icon.png`,
    siteUrl: 'https://bib.umontreal.ca',
  },
  trailingSlash: 'ignore',
  plugins: [
    'gatsby-plugin-provide-react',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@/components': 'src/components',
          '@/hooks': 'src/hooks',
          '@/icons': 'src/icons',
          '@/images': 'src/images',
          '@/utils': 'src/utils',
        },
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: join(__dirname, 'content', 'pages'),
        ignore: ['**/super-heroes'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: join(__dirname, 'src', 'images'),
        ignore: ['**/super-heroes'],
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'super-heroes',
        path: join(__dirname, 'content', 'pages', 'images', 'super-heroes'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'nouvelles',
        path: join(__dirname, 'content', 'nouvelles'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'personnel',
        path: join(__dirname, 'content', 'personnel'),
        ignore: ['**/~$*']
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`avif`, `webp`, 'jpg'],
          placeholder: `blurred`,
          quality: 80,
          breakpoints: [600, 900, 1200, 1536],
          backgroundColor: `transparent`,
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    'gatsby-transformer-excel',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo-bib/logo-bib-icon.svg'
      }
    },
    'gatsby-plugin-bib-secondary-nav',
    'gatsby-plugin-mdx-frontmatter',
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google2: [
            {
              family: 'Figtree',
              axes: 'wght@300..600',
            },
            {
              family: 'Lora',
              axes: 'wght@400..700',
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // useAutoGen: required 'true' to use autogen
        useAutoGen: true,
        // autoGenHomeLabel: optional 'Home' is default
        autoGenHomeLabel: `Accueil`,
        // exclude: optional, include this array to exclude paths you don't want to
        // generate breadcrumbs for (see below for details).
        exclude: [
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`
        ],
        // isMatchOptions: optional, include this object to configure the wildcard-match library.
        excludeOptions: {
          separator: '.'
        },
        // crumbLabelUpdates: optional, update specific crumbLabels in the path
        crumbLabelUpdates: [
          {
            pathname: '/book',
            crumbLabel: 'Books'
          }
        ],
        // trailingSlashes: optional, will add trailing slashes to the end
        // of crumb pathnames. default is false
        // trailingSlashes: true,
      }
    },
    'gatsby-plugin-bib-theme'
  ]
}

export default config