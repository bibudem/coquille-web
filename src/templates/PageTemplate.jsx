import { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Box, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { IconContext } from '@phosphor-icons/react'

import TopAppBar from '@/components/_layout/AppBar/TopAppBar'
import TopAppBarSm from '@/components/_layout/AppBar/TopAppBarSm'
import { QuickLinks, QuickLinksSm } from '@/components/_layout/QuickLinks'
import Footer from '@/components/_layout/Footer/Footer'
import Breadcrumbs from '@/components/_layout/Breadcrumbs/Breadcrumbs'
import SkipTo from '@/components/_layout/SkipTo'
import Debug from '@/components/_layout/Debug'
import LayoutGrid from '../components/utils/LayoutGrid'
import RetroactionUsager from '@/components/RetroactionUsager'
import ConditionalWrapper from '@/components/utils/ConditionalWrapper'
import LayoutContainer from '@/components/utils/LayoutContainer'

import { useSmall } from '@/hooks/use-small'
import { SecondaryNav } from '@/components/_layout/SecondaryNav/SecondaryNav'

import commonComponents from './commonComponents'
import SuperHero from '@/components/_layout/SuperHero/SuperHeroLvl2'

function getCurrentPageLevel(location) {
  return location.pathname.split('/').filter((item) => item).length
}

export default function PageTemplate({ pageContext, children, data, location }) {
  const isSmall = useSmall('md')
  const isMedium = useSmall('lg')
  const theme = useTheme()
  const [hasSecondaryNav, setHasSecondaryNav] = useState(false)
  const [lvl, setLvl] = useState(getCurrentPageLevel(location))

  // Déterminer si on est sur la page d'accueil
  const isHomePage = location.pathname === '/' || location.pathname === ''

  const { superHero } = pageContext.frontmatter

  useEffect(() => {
    setLvl(getCurrentPageLevel(location))
  }, [location])

  useEffect(() => {
    setHasSecondaryNav(lvl > 1)
  }, [lvl])

  // NOUVEAU : Gestion du scroll vers les ancres
  useEffect(() => {
    if (location.hash) {
      // Petit délai pour s'assurer que le DOM est complètement chargé
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [location.hash, location.pathname])

  if (typeof window !== 'undefined') {
    window.bib = window.bib || {}
    window.bib.theme = theme
    //console.log('window.bib.theme:', window.bib.theme)
  }

  const {
    breadcrumb: { crumbs },
  } = pageContext

  const mainContent = (
    <>
      {hasSecondaryNav && <Breadcrumbs crumbs={crumbs} location={location} />}
      <Box id="main-content" component="main" role="main" sx={{ '& > :first-child': { marginTop: 0, paddingTop: 0 } }}>
        {children}
        {/* Condition pour afficher RetroactionUsager seulement si pas sur la page d'accueil */}
        {!isHomePage && (
          <ConditionalWrapper condition={lvl < 2} wrapper={(children) => <LayoutContainer>{children}</LayoutContainer>}>
            <RetroactionUsager />
          </ConditionalWrapper>
        )}
      </Box>
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

        <udem-urgence
          style={{
            position: 'relative',
            zIndex: theme.zIndex.appBar + 1,
          }}
        />

        {lvl < 2 && (
          <bib-avis
            bouton-fermer
            style={{
              '--bib-avis-spacing-inline': '0',
              position: 'relative',
              zIndex: theme.zIndex.appBar + 1,
            }}
          />
        )}

        {isMedium ? <TopAppBarSm /> : <TopAppBar lvl={lvl} location={location} />}

        {isSmall ? <QuickLinksSm /> : <QuickLinks />}

        {lvl > 1 && superHero && <SuperHero title={superHero.title} imageName={superHero.imageName} lvl={lvl} />}

        {lvl >= 2 && <bib-avis bouton-fermer />}

        {hasSecondaryNav ? (
          isMedium ? (
            <Box sx={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '60px' }}>{mainContent}</Box>
          ) : (
            <Box sx={{ paddingTop: '60px' }}>
              <LayoutContainer>
                <LayoutGrid>
                  <Grid
                    sx={{ width: '100%' }}
                    container
                    spacing={{
                      xs: 1,
                      sm: 3,
                      lg: 4,
                    }}
                  >
                    <Grid size={3} className="bib-secondary-nav-col">
                      <SecondaryNav currentLocation={location} className="bib-secondary-nav" />
                    </Grid>
                    <Grid size={9} className="bib-main-content-col">
                      <div>{mainContent}</div>
                    </Grid>
                  </Grid>
                </LayoutGrid>
              </LayoutContainer>
            </Box>
          )
        ) : (
          <>{mainContent}</>
        )}

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
