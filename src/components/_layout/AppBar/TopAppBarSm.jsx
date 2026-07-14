import { useEffect, useState, useCallback } from 'react'
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  useMediaQuery,
  IconButton
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from '@/components/Link'
import SideNavSm from '@/components/_layout/SideNav/SideNavSm'
import SideNavContent from '@/components/_layout/SideNav/SideNavContent'
import MenuBurger from './MenuBurger'
import SearchButton from './SearchButton'
import SearchOverlay, { isSearchOverlayOpenInUrl } from './SearchOverlay'
import LogoUdeMMonochrome from '@/images/logo-udem/logo_udem-noir.svg'

export const appBarHeight = '5rem'

export default function TopAppBarSm(props) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(isSearchOverlayOpenInUrl) // ouverture de la modale de recherche (SearchOverlay)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const toggleDrawer = useCallback((newState) => () => setOpen(newState ?? !open), [])

  useEffect(() => {
    function onClose(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onClose)
    return () => document.removeEventListener('keydown', onClose)
  }, [])

  return (
    <>
      {/* `sticky` (pas `fixed`) : reste dans le flux normal tant qu'on n'a
          pas scrollé, donc s'affiche sous l'avis au chargement au lieu de le
          chevaucher — contrairement à `fixed`, pas besoin d'un `Offset` ni de
          calculer sa hauteur pour réserver sa place. */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          // Force son propre calque de composition : Safari iOS repositionne
          // parfois mal les éléments sticky/fixed pendant le scroll
          // (flicker/décalage temporaire), surtout à côté d'un autre élément
          // à z-index élevé comme <bib-avis>. `translateZ(0)` contourne ce
          // bug connu de WebKit sans effet visible ailleurs.
          transform: 'translateZ(0)',
        }}
      >
        <Container
          sx={{
            '&.MuiContainer-maxWidthXl': {
              maxWidth: '1500px',
            },
            py: 1,
            px: 2,
          }}
        >
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo - caché quand le menu est ouvert */}
            {!open && (
              <Link
                aria-label="Accueil"
                to="/"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  color: 'text.primary',
                  textDecoration: 'none',
                }}
              >
                <LogoUdeMMonochrome
                  style={{
                    width: isSmallScreen ? 120 : 140,
                    height: 'auto',
                  }}
                />
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  Les bibliothèques
                </span>
              </Link>
            )}

            {/* Loupe + burger regroupés dans un même Box pour rester collés à droite
                malgré le `justify-content: space-between` du Toolbar parent */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: open ? 'auto' : 0 }}>
              {/* Fond du header toujours blanc ici : icône sombre pour rester visible
                  (contrairement à TopAppBar.jsx, blanche par défaut sur fond transparent) */}
              {!open && <SearchButton dark open={searchOpen} onClick={() => setSearchOpen(true)} />}

              <IconButton
                onClick={toggleDrawer(true)}
                aria-label="Ouvrir le menu de navigation"
                sx={{
                  color: 'text.primary',
                }}
              >
                <MenuBurger open={open} onClick={toggleDrawer(true)} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <SideNavSm
        open={open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <SideNavContent onClose={toggleDrawer(false)} />
      </SideNavSm>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}