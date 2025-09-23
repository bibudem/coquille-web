import { useEffect, useMemo, useState } from 'react'
import { AppBar, Box, Button, Stack, Toolbar, useScrollTrigger } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { ArrowRightIcon } from '@phosphor-icons/react'

import Link from '@/components/Link'
import SideNav from '@/components/_layout/SideNav/SideNav'
import SideNavContent from '@/components/_layout/SideNav/SideNavContent'
import MenuBurger from './MenuBurger'
import LogoLink from './LogoLink'
import pages from './menu'
import { useLocation } from '@reach/router'

const StyledButton = styled(Button)({
  alignContent: 'center',
  my: 2,
  color: 'inherit',
  fontSize: '1rem',
  fontWeight: 400,
  display: 'inline-block',
  position: 'relative',
  textTransform: 'none',
  textDecoration: 'none',
  cursor: 'pointer',

  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '1px',
    backgroundColor: 'currentColor',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },

  '&:hover::after': {
    transform: 'scaleX(1)',
  },
})

export const appBarHeight = '5rem'

/**
 * Primary app bar component
 */
export default function TopAppBar({ lvl, location: propLocation = {} }) {
  /* Récupération automatique de la localisation via Gatsby */
  const gatsbyLocation = useLocation()
  const location = propLocation || gatsbyLocation
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  })
  const transitionProps = useMemo(
    () => ({
      transitionProperty: 'color',
      transitionTimingFunction: theme.transitions.easing.md3[trigger ? 'emphasizedAccelerate' : 'emphasizedDecelerate'],
      transitionDuration: `${theme.transitions.duration.md3.short4}ms`,
    }),
    [trigger, theme]
  )

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
          elevation={trigger ? 2 : 0}
          sx={{
            '--AppBar-background': trigger ? '#fff' : 'transparent',
            '--AppBar-color': trigger ? '#222930' : theme.palette.grey['50'],
            backgroundImage: trigger ? 'none' : 'linear-gradient(180deg, rgba(0,0,0,0.5) 90%, rgba(0,0,0,0) 100%)',
            // Transition améliorée
            transition: `
              background-color ${theme.transitions.duration.md3.medium4}ms ${theme.transitions.easing.md3.emphasizedDecelerate},
              box-shadow ${theme.transitions.duration.md3.medium4}ms ${theme.transitions.easing.md3.emphasizedDecelerate},
              background-image ${theme.transitions.duration.md3.medium4}ms ${theme.transitions.easing.md3.emphasizedDecelerate}
            `,
            '.MuiToolbar-root': {
              height: appBarHeight,
              transition: `height ${theme.transitions.duration.md3.short4}ms ease-in-out`,
            },
            zIndex: 5,
          }}
        >
        <Toolbar
            disableGutters
            sx={{
              margin: '0 auto',
              width: '100%',
              maxWidth: theme.breakpoints.values.xl,
              px: '1.25rem',
              height: appBarHeight,
              display: 'flex',
              alignItems: 'center',
              '& .MuiStack-root': {
                alignItems: 'center',
              },
              '& .MuiButton-root': {
                margin: 0,
                paddingTop: 0,
                paddingBottom: 0,
                lineHeight: 1.2, // réduit l’espace vertical du texte
              },
            }}
          >
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <LogoLink trigger={trigger} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {pages.map(({ url, label }) => {
              // Sécurisation : si "location" ou "pathname" est undefined,
              const isActive = location?.pathname?.startsWith(url) || false
              return (
                <StyledButton
                  size="large"
                  href={url}
                  key={url}
                  sx={{
                    fontWeight: isActive && 700,
                  }}
                >
                  {label}
                </StyledButton>
              )
            })}
            <JeDonneButton trigger={trigger} transitionProps={transitionProps} />
          </Stack>
          <Box sx={{ ml: '1.25rem' }} >
            <MenuBurger open={open} onClick={toggleDrawer(true)} />
          </Box>
        </Toolbar>
      </AppBar>
       <SideNav
        open={open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <SideNavContent onClose={toggleDrawer(false)} />
      </SideNav>
    </>
  )
}

function JeDonneButton({ trigger, transitionProps }) {
  const theme = useTheme();

  const styles = useMemo(() => {
    return {
      borderColor: trigger ? theme.palette.bleuFonce.main : '#fff',
      backgroundColor: 'transparent',
      color: trigger ? theme.palette.bleuFonce.main : '#fff',
      transition: `${theme.transitions.easing.md3.standardDecelerate}`,
      fontSize: '0.875rem',

      // style de l'icône
      '.MuiButton-endIcon svg': {
        fill: trigger ? theme.palette.rougeOrange.main : '#fff',
      },

      // Effet hover
      '&:hover': {
        backgroundColor: theme.palette.bleuFonce.main,
        color: '#fff',
        borderColor: theme.palette.bleuFonce.main,
        
        // Effet hover sur l'icône
        '.MuiButton-endIcon svg': {
          fill: '#fff',
        },
      },

      ...transitionProps,
    };
  }, [trigger, transitionProps, theme]);

  return (
    <Button
      variant="outlined"
      disableElevation
      size="large"
      href="/nous-soutenir/"
      sx={styles}
      endIcon={<ArrowRightIcon />}
    >
      Je donne
    </Button>
  );
}