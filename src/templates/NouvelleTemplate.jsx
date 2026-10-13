import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import { IconContext } from '@phosphor-icons/react/dist/lib/context'

import TopAppBar from '@/components/_layout/AppBar/TopAppBar'
import TopAppBarSm from '@/components/_layout/AppBar/TopAppBarSm'
import { QuickLinks, QuickLinksSm } from '@/components/_layout/QuickLinks'
import Footer from '@/components/_layout/Footer/Footer'
import Breadcrumbs from '@/components/_layout/Breadcrumbs/Breadcrumbs'
import SkipTo from '@/components/_layout/SkipTo'
import Debug from '@/components/_layout/Debug'
import RetroactionUsager from '@/components/RetroactionUsager'
import ConditionalWrapper from '@/components/utils/ConditionalWrapper'
import LayoutContainer from '@/components/utils/LayoutContainer'
import { Head as HtmlHead } from '../components/_layout/HtmlHead'

import { useSmall } from '@/hooks/use-small'

import commonComponents from './commonComponents'
import SuperHero from '@/components/_layout/SuperHero/SuperHeroLvl2'

export default function NouvelleTemplate({ pageContext, children, data, location }) {
  const isSmall = useSmall('md')
  const isMedium = useSmall('lg')
  const theme = useTheme()
  // Voir PageTemplate.jsx : `lvl` vient du build (gatsby-node.mjs), plus de
  // calcul côté client.
  const lvl = pageContext.lvl
  const hasSecondaryNav = lvl > 1

  const { superHero } = pageContext.frontmatter

  if (typeof window !== 'undefined') {
    window.bib = window.bib || {}
    window.bib.theme = theme
    console.log('window.bib.theme:', window.bib.theme)
  }

  const {
    breadcrumb: { crumbs },
  } = pageContext

  // Suppression du noeud "2026"
  const newCrumbs = [...crumbs]
  newCrumbs.splice(2, 1)

  const mainContent = (
    <>
      {hasSecondaryNav && <Breadcrumbs crumbs={newCrumbs} />}
      <main id="main-content" role="main">
        {children}
        <ConditionalWrapper condition={lvl < 2} wrapper={(children) => <LayoutContainer>{children}</LayoutContainer>}>
          <RetroactionUsager />
        </ConditionalWrapper>
      </main>
    </>
  )

  return (
    <MDXProvider components={commonComponents}>
      <IconContext.Provider
        value={{
          size: '2rem',
          color: theme.palette.grey['700'],
        }}
      >
        {process.env.NODE_ENV !== 'production' && <Debug />}

        <SkipTo href="#main-content">Aller au contenu</SkipTo>

        <udem-urgence></udem-urgence>
        <bib-avis bouton-fermer />

        {isMedium ? <TopAppBarSm /> : <TopAppBar lvl={lvl} location={location} />}

        {isSmall ? <QuickLinksSm /> : <QuickLinks />}

        {lvl > 1 && superHero && <SuperHero title={superHero.title} imageName={superHero.imageName} lvl={lvl} />}

        <Container>{mainContent}</Container>
        <Footer />

        <bib-consent></bib-consent>
        <bib-gtm></bib-gtm>
        <bib-clarity></bib-clarity>
      </IconContext.Provider>
    </MDXProvider>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        authors
        dateFormated: date(formatString: "LL", locale: "fr")
        date
        newsImage {
          alt
          legend
          name
          source
        }
        newsUrl
        slug
        source
        template
        type
      }
    }
  }
`
function convertTZ(date) {
  return date.replace(/\.000Z$/i, '-05:00')
}

export function Head(props) {
  const { pageContext, location } = props
  const { frontmatter = {} } = pageContext
  const { date, title, authors } = frontmatter
  const d = convertTZ(date)

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    datePublished: d,
    dateModified: d,
    // image: `https://www.udem.fr/images/nouvelles/${imageName}`,
    author: authors?.map((author) => ({ name: author.split(',')[0] })),
  }

  return (
    <HtmlHead {...props}>
      <script type="application/ld+json">{JSON.stringify(jsonld)}</script>
    </HtmlHead>
  )
}
