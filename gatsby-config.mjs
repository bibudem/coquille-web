import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = {
  siteMetadata: {
    title: `Les bibliothèques / UdeM`,
    siteUrl: `https://bib.umontreal.ca`
  },
  trailingSlash: 'never',
  plugins: [
    'gatsby-plugin-provide-react',
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@/components': 'src/components',
          '@/images': 'src/images'
        },
        extensions: [
          'js',
          'jsx',
          'mdx'
        ],
      }
    },
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
        name: 'pages',
        path: join(__dirname, 'src', 'pages')
      },
      __key: 'pages'
    },
    // Add a collection called 'posts' that looks
    // for files in content/posts
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'posts',
        path: join(__dirname, 'content'),
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
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