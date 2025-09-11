import { useEffect, useState, useCallback } from 'react'
import {
  AppBar,
  Container,
  Slide,
  Toolbar,
  useScrollTrigger,
  useMediaQuery,
  IconButton
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Link from '@/components/Link'
import SideNavSm from '@/components/_layout/SideNav/SideNavSm'
import SideNavContent from '@/components/_layout/SideNav/SideNavContent'
import MenuBurger from './MenuBurger'
import LogoUdeMMonochrome from '@/images/logo-udem/logo_udem-noir.svg'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 150,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function TopAppBarSm(props) {
  const [open, setOpen] = useState(false)
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
      <Offset />
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
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

              <IconButton
                onClick={toggleDrawer(true)}
                aria-label="Ouvrir le menu de navigation"
                sx={{
                  ml: 'auto',
                  color: 'text.primary',
                }}
              >
                <MenuBurger />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <SideNavSm
        open={open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <SideNavContent onClose={toggleDrawer(false)} />
      </SideNavSm>
    </>
  )
}
