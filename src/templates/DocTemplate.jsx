import { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { useTheme } from '@mui/material'
import { IconContext } from '@phosphor-icons/react'

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

import { useSmall } from '@/hooks/use-small'
import commonComponents from './commonComponents'

function getCurrentPageLevel(location) {
  return location.pathname.split('/').filter((item) => item).length
}

export default function PageTemplate({ pageContext, children, data, location }) {
  const isSmall = useSmall('md')
  const isMedium = useSmall('lg')
  const theme = useTheme()
  const [hasSecondaryNav, setHasSecondaryNav] = useState(false)
  const [lvl, setLvl] = useState(getCurrentPageLevel(location))

  useEffect(() => {
    setLvl(getCurrentPageLevel(location))
  }, [location])

  useEffect(() => {
    setHasSecondaryNav(lvl > 1)
  }, [lvl])

  if (typeof window !== 'undefined') {
    window.bib = window.bib || {}
    window.bib.theme = theme
    console.log('window.bib.theme:', window.bib.theme)
  }

  const {
    breadcrumb: { crumbs },
  } = pageContext

  const mainContent = (
    <>
      {hasSecondaryNav && <Breadcrumbs crumbs={crumbs} />}
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

        {isMedium ? <TopAppBarSm /> : <TopAppBar lvl={lvl} location={location} />}

        {isSmall ? <QuickLinksSm /> : <QuickLinks />}

        <bib-avis bouton-fermer></bib-avis>

        {mainContent}

        <Footer />

        <bib-consent></bib-consent>
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
      }
    }
  }
`
export { Head } from '@/components/_layout/HtmlHead'
