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

const StyledButton = styled(Button)({
  alignContent: 'center',
  my: 2,
  color: 'inherit',
  fontSize: '0.875rem',
  fontWeight: 400,
  display: 'block',
  textTransform: 'none',
})

export const appBarHeight = '5rem'

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
          backgroundImage: trigger ? 'none' : 'linear-gradient(180deg, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0) 100%)',
          ...transitionProps,
          transitionProperty: 'background-color, box-shadow',
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
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <LogoLink trigger={trigger} />
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
          <Box sx={{ paddingLeft: '2rem' }}>
            <MenuBurger onClick={toggleDrawer(true)} />
          </Box>
        </Toolbar>
      </AppBar>
      <SideNav open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
        <SideNavContent onClose={toggleDrawer(false)} />
      </SideNav>
    </>
  )
}

function JeDonneButton({ trigger, transitionProps }) {
  const theme = useTheme()
  const styles = useMemo(() => {
    return {
      color: trigger ? '#fafdfe' : '#0B113A',
      bgcolor: trigger ? 'bleuFonce.main' : '#fff',
      ...transitionProps,
      transitionProperty: 'color, background-color',
      '.MuiButton-icon svg': {
        fill: trigger ? '#fafdfe' : theme.palette.rougeOrange.main,
        ...transitionProps,
        transitionProperty: 'fill',
      },
    }
  }, [trigger, transitionProps])

  return (
    <Button
      variant="contained"
      disableElevation
      size="large"
      href="/nous-soutenir/"
      sx={{
        ...styles,
      }}
      endIcon={<ArrowRightIcon color={theme.palette.rougeOrange.main} />}
    >
      Je donne
    </Button>
  )
}
