import { Stack, styled, useScrollTrigger } from '@mui/material'
import { CalendarPlus, Chats, ClockCountdown, Lifebuoy } from '@phosphor-icons/react'
import { SofiaIcon } from '@/components/CustomIcons'

const StyledNav = styled(Stack)(({ theme }) => ({
  margin: 0,
  padding: 20,
  backgroundColor: theme.vars.palette.bleuPrincipal.main, // var(--mui-palette-primary-main)
  color: theme.vars.palette.bleuPrincipal.contrastText,
  boxShadow: '0 4px 16px 0 #22293040',
  borderRadius: '12px 0 0 12px',
  listStyle: 'none',
  gap: 15.69,
  pointerEvents: 'auto',
  transitionProperty: `transform`,
}))

const StyledNavItem = styled('li')({})

const A = styled('a')(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  gap: '0.98088rem',
}))

const StyledNavItemText = styled('div')({
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.6rem',
})

export default function MenuLatteral() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  })

  function handleClick(event) {
    alert('Action à définir')
  }

  return (
    <Stack
      direction="column"
      aria-labelledby="udem-footer-aide-header"
      spacing={0}
      component="nav"
      sx={(theme) => ({
        display: 'flex',
        position: 'fixed',
        top: '0',
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        // width: '4rem',
        zIndex: theme.zIndex.drawer,
        pointerEvents: 'none',
        color: '#fff',
      })}
    >
      <StyledNav
        component="ul"
        sx={(theme) => ({
          transform: trigger ? 'translateX(170px)' : 'translateX(0)',
          transitionTimingFunction: theme.transitions.easing.md3[trigger ? 'emphasizedDecelerate' : 'emphasizedAccelerate'],
          transitionDuration: `${theme.transitions.duration.md3[trigger ? 'medium4' : 'short4']}ms`,
        })}
      >
        <StyledNavItem>
          <A href="https://umontreal.on.worldcat.org/discovery?lang=fr">
            <SofiaIcon color="#fff" />
            <StyledNavItemText>Sofia</StyledNavItemText>
          </A>
        </StyledNavItem>
        <StyledNavItem>
          <A href="/horaires">
            <ClockCountdown color="#fff" size={24} />
            <StyledNavItemText>Horaires</StyledNavItemText>
          </A>
        </StyledNavItem>
        <StyledNavItem>
          <A href="https://calendrier.bib.umontreal.ca/r">
            <CalendarPlus color="#fff" size={24} />
            <StyledNavItemText>Réserver une salle</StyledNavItemText>
          </A>
        </StyledNavItem>
        <StyledNavItem>
          <A href="#" onClick={handleClick}>
            <Lifebuoy color="#fff" size={24} />
            <StyledNavItemText>Soutien informatique</StyledNavItemText>
          </A>
        </StyledNavItem>
        <StyledNavItem>
          <A href="#" onClick={handleClick}>
            <Chats color="#fff" size={24} />
            <StyledNavItemText>Clavarder</StyledNavItemText>
          </A>
        </StyledNavItem>
      </StyledNav>
    </Stack>
  )
}
