import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import GatsbyAdapterNetlifyModule from 'gatsby-adapter-netlify'

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
  siteMetadata: {
    title: 'Les bibliothèques / UdeM',

    description: `Example project for the Gatsby Head API`,
    twitterUsername: `@bibUdeM`,
    image: `/gatsby-icon.png`,
    siteUrl: 'https://bib.umontreal.ca',
  },
  trailingSlash: 'never',
  plugins: [
    'gatsby-plugin-provide-react',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@/components': 'src/components',
          '@/hooks': 'src/hooks',
          '@/images': 'src/images',
          '@/icons': 'src/icons',
          '@/utils': 'src/utils',
        },
        extensions: [
          'js',
          'jsx',
          'mdx'
        ],
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contenu',
        path: join(__dirname, 'content'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: join(__dirname, 'src', 'images')
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'personnel',
        path: join(__dirname, 'data', 'personnel'),
        ignore: ['**/~$*']
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-excel',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo-bib-icon.svg'
      }
    },
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
            // {
            //   family: 'Open Sans Condensed',
            //   variants: ['300', '700'],
            // },
          ],
        },
      },
    },
    'gatsby-plugin-bib-theme'
  ]
}

export default config