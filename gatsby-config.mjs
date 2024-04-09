import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = {
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
          '@/images': 'src/images',
          '@/hooks': 'src/hooks'
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
    'gatsby-transformer-excel',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo-bib-icon.svg'
      }
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google2: [
            {
              family: 'Inter',
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