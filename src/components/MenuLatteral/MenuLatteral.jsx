import { Stack, styled, Typography } from '@mui/material'
import { CalendarPlus, Chats, ClockCountdown, Lifebuoy } from '@phosphor-icons/react'
import { SofiaIcon } from '@/components/CustomIcons'

const StyledNav = styled(Stack)(({ theme }) => ({
  margin: 0,
  padding: 20,
  backgroundColor: theme.vars.palette.primary.main, // var(--mui-palette-primary-main)
  color: theme.vars.palette.primary.contrastText,
  borderRadius: '12px 0 0 12px',
  listStyle: 'none',
  gap: 15.69,
}))

const StyledNavItem = styled('li')(({ theme }) => ({}))

export default function MenuLatteral() {
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
        width: '4rem',
        zIndex: theme.zIndex.drawer,
        pointerEvents: 'none',
      })}
    >
      <StyledNav
        component="ul"
        sx={{
          pointerEvents: 'auto',
        }}
      >
        <StyledNavItem>
          <a href="https://umontreal.on.worldcat.org/discovery?lang=fr">
            <SofiaIcon color="#fff" />
            <Typography sx={{ display: 'none' }}>Sofia</Typography>
          </a>
        </StyledNavItem>
        <StyledNavItem>
          <a href="/horaires">
            <ClockCountdown color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Horaires</Typography>
          </a>
        </StyledNavItem>
        <StyledNavItem>
          <a href="https://calendrier.bib.umontreal.ca/r">
            <CalendarPlus color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Réserver une salle</Typography>
          </a>
        </StyledNavItem>
        <StyledNavItem>
          <a href="#" onClick={handleClick}>
            <Lifebuoy color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Soutien informatique</Typography>
          </a>
        </StyledNavItem>
        <StyledNavItem>
          <a href="#" onClick={handleClick}>
            <Chats color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Clavarder</Typography>
          </a>
        </StyledNavItem>
      </StyledNav>
    </Stack>
  )
}
