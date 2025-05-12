import { useEffect, useState } from 'react'
import { AppBar, Box, Button, Divider, Stack, Toolbar, useScrollTrigger } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { ArrowRight } from '@phosphor-icons/react'

import Link from '@/components/Link'
import SideNav from '@/components/_layout/SideNav/SideNav'
import SideNavContent from '@/components/_layout/SideNav/SideNavContent'
import Div from '@/components/utils/Div'
import LogoUdeMMonochrome from '@/images/logo-udem/logo_udem-noir.svg'
import LogoUdeM from '@/images/logo-udem/logo_udem-officiel.svg'
import MenuBurger from './MenuBurger'
import pages from './menu'

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
    fill: lvl < 2 ? theme.palette.grey['50'] : '#37424D',
  }

  useEffect(() => {
    setColor(lvl < 2 ? theme.palette.grey['50'] : 'inherit')
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
      {lvl < 2 ? (
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
          borderColor: lvl < 2 ? theme.palette.grey['200'] : theme.palette.grey['600'],
          margin: '12px',
        }}
      />
      <Div
        sx={{
          color: lvl < 2 ? 'inherit' : 'primary.main',
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
 * Primary app bar component
 */
export default function TopAppBar({ lvl, location = {} }) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  })

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
          '--AppBar-background': lvl < 2 ? (trigger ? '#fff' : 'transparent') : '#fff',
          '--AppBar-color': lvl < 2 ? (trigger ? '#222930' : theme.palette.grey['50']) : '#222930',
          backgroundImage: lvl < 2 ? (trigger ? 'none' : 'linear-gradient(180deg, rgba(0,0,0,0.10) 90%, rgba(0,0,0,0) 100%)') : 'none',
          transition: 'background-color 0.15s ease-in-out',
          '.MuiToolbar-root': {
            height: appBarHeight,
          },
          zIndex: 5,
        }}
      >
        <Toolbar disableGutters sx={{ margin: '0 auto', width: '100%', maxWidth: theme.breakpoints.values.xl, paddingLeft: '1.44rem', paddingRight: '1.25rem' }}>
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
              const isActive = location.pathname.startsWith(url)
              return (
                <StyledButton
                  size="large"
                  href={url}
                  key={url}
                  lvl={lvl}
                  sx={{
                    fontWeight: isActive && 700,
                  }}
                >
                  {label}
                </StyledButton>
              )
            })}
            <Button
              variant="contained"
              disableElevation
              size="large"
              href="/nous-soutenir/"
              sx={{
                color: lvl < 2 ? '#0B113A' : '#fafdfe',
                bgcolor: lvl < 2 ? '#fff' : 'bleuFonce.main',
                '.MuiButton-icon svg': {
                  fill: lvl < 2 ? theme.palette.rougeOrange.main : 'currentColor',
                },
              }}
              endIcon={<ArrowRight color={theme.palette.rougeOrange.main} />}
            >
              Je donne
            </Button>
          </Stack>
          <Box sx={{ paddingLeft: '2rem' }}>
            <MenuBurger lvl={lvl} onClick={toggleDrawer(true)} />
          </Box>
        </Toolbar>
      </AppBar>
      <SideNav open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
        <SideNavContent />
      </SideNav>
    </>
  )
}
