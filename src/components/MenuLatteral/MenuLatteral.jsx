import { Paper, Stack, styled, Typography } from '@mui/material'
import { CalendarPlus, Chats, ClockCountdown, VectorThree } from '@phosphor-icons/react'
import * as styles from './MenuLatteral.module.css'

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
  console.log('styles:', styles)
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
        zIndex: 1000,
      })}
    >
      <StyledNav component="ul">
        <StyledNavItem>
          <a href="#">
            <ClockCountdown color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Sofia</Typography>
          </a>
        </StyledNavItem>
        <StyledNavItem>
          <a href="#">
            <ClockCountdown color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Horaires</Typography>
          </a>
        </StyledNavItem>
        <StyledNavItem>
          <a href="#">
            <CalendarPlus color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Réserver une salle</Typography>
          </a>
        </StyledNavItem>
        <StyledNavItem>
          <a href="#">
            <ClockCountdown color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Soutien informatique</Typography>
          </a>
        </StyledNavItem>
        <StyledNavItem>
          <a href="#">
            <Chats color="#fff" size={24} />
            <Typography sx={{ display: 'none' }}>Clavarder</Typography>
          </a>
        </StyledNavItem>
      </StyledNav>
    </Stack>
  )
}
