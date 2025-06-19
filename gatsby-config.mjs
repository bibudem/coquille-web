import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import GatsbyAdapterNetlifyModule from 'gatsby-adapter-netlify'
import 'dotenv/config'

const adapter = GatsbyAdapterNetlifyModule.default
const __dirname = dirname(fileURLToPath(import.meta.url))

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://bib.umontreal.ca',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

/**
 * @type {import('gatsby').GatsbyConfig}
 */
export default {
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
    siteUrl,
  },
  trailingSlash: 'ignore',
  plugins: [
    'gatsby-plugin-provide-react',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              elements: ['h2', 'h3', 'h4'],
              icon: '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"/></svg>',
              maintainCase: false,
              removeAccents: true,
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
        ]
      }
    },
    'gatsby-plugin-catch-links',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'bibliotheques',
        path: join(__dirname, 'content', 'bibliotheques'),
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`webp`, 'jpg'],
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
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google2: [
            {
              family: 'Figtree',
              axes: 'wght@300..700',
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
    'gatsby-plugin-bib-theme',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{
              userAgent: '*',
              allow: '/',
              disallow: ['/consent/']
            }]
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    }
  ]
}

