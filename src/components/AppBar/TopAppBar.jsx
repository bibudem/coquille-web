import { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Divider, Stack, Toolbar } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import Link from '@/components/Link'
import SideNav from '@/components/SideNav/SideNav'
import SideNavContent from '@/components/SideNav/SideNavContent'
import Div from '@/components/utils/Div'
import LogoUdeMMonochrome from '@/images/logo-udem/logo_udem-noir.svg'
import LogoUdeM from '@/images/logo-udem/logo_udem-officiel.svg'
import MenuFab from './MenuButton'

const pages = [
  { url: '/espaces', label: 'Espaces' },
  { url: '/etudes', label: 'Études' },
  { url: '/recherche', label: 'Recherche' },
  { url: '/enseignement', label: 'Enseignement' },
  { url: '/engagements', label: 'Engagements' },
  { url: '/tests', label: 'Tests' },
]

const styles = {}

const StyledButton = styled(Button)(({ theme }) => ({
  alignContent: 'center',
  my: 2,
  color: 'inherit',
  fontSize: '0.875rem',
  fontWeight: 400,
  display: 'block',
  textTransform: 'none',
}))
/**
 *

width: 35px;
height: 0px;

border: 1px solid #C3CCD5;
transform: rotate(90deg);

flex: none;
order: 1;
flex-grow: 0;

 */
export const appBarHeight = '5rem'

function Logo({ lvl }) {
  const theme = useTheme()
  const [color, setColor] = useState(theme.palette.grey['50'])
  const logoUdeMBaseStyles = {
    width: 'auto',
    height: '59px',
    fill: lvl === 1 ? theme.palette.grey['50'] : '#37424D',
  }

  useEffect(() => {
    setColor(lvl === 1 ? theme.palette.grey['50'] : 'inherit')
  }, [lvl])
  return (
    <Div
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        color,
      }}
    >
      {lvl === '1' ? (
        <LogoUdeMMonochrome
          style={{
            ...logoUdeMBaseStyles,
          }}
        />
      ) : (
        <LogoUdeM
          style={{
            ...logoUdeMBaseStyles,
          }}
        />
      )}
      <Divider
        orientation="vertical"
        flexItem
        aria-hidden="true"
        sx={{
          borderColor: lvl === 1 ? theme.palette.grey['200'] : theme.palette.grey['600'],
          margin: '12px',
        }}
      />
      <Div
        sx={{
          color: lvl === 1 ? 'inherit' : 'primary.main',
          fontSize: '1.1875rem',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.01188rem',
        }}
      >
        Les bibliothèques
      </Div>
    </Div>
  )
}

/**
 * Primary search app bar component
 */
export default function TopAppBar({ lvl }) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()

  const toggleDrawer = (newState) => () => {
    setOpen(newState ?? !open)
  }

  useEffect(() => {
    function onClose() {
      setOpen(false)
    }

    document.documentElement.addEventListener('close', onClose)

    return () => {
      document.documentElement.removeEventListener('close', onClose)
    }
  }, [])

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          '--AppBar-background': lvl < 2 ? 'transparent' : '#fff',
          '--AppBar-color': lvl === 1 ? theme.palette.grey['50'] : '#222930',
          '.MuiToolbar-root': {
            height: appBarHeight,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 0.5,
            px: '0!important',
          }}
        >
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Link
                aria-label="Accueil"
                variant="h6"
                noWrap
                to="/"
                sx={{
                  display: { xs: 'none', sm: 'block', color: 'inherit' },
                }}
              >
                <Logo lvl={lvl} />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {pages.map(({ url, label }) => {
                return (
                  <StyledButton size="large" href={url} key={url} lvl={lvl}>
                    {label}
                  </StyledButton>
                )
              })}
              <Button
                variant="contained"
                disableElevation
                size="large"
                href="/connexion"
                sx={{
                  color: lvl === 1 ? '#0B113A' : '#0b113a',
                  bgcolor: lvl === 1 ? '#fff' : 'bleuFonce.main',
                }}
              >
                Je donne
              </Button>
            </Stack>
            <Box>
              <MenuFab onClick={toggleDrawer(true)} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <SideNav open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
        <SideNavContent />
      </SideNav>
    </>
  )
}
