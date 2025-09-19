import { useEffect, useState, useCallback } from 'react'
import {
  AppBar,
  Container,
  Toolbar,
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
export const appBarHeight = '5rem'

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

            <IconButton
              onClick={toggleDrawer(true)}
              aria-label="Ouvrir le menu de navigation"
              sx={{
                ml: 'auto',
                color: 'text.primary',
              }}
            >
              <MenuBurger open={open} onClick={toggleDrawer(true)} />
            </IconButton>
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
    </>
  )
}