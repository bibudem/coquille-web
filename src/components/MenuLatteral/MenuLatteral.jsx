import { ListItemIcon, ListItemText as MuiListItemText, MenuItem, MenuList, Paper, Stack, styled, useScrollTrigger, useTheme } from '@mui/material'
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

function ListItemText({ children }) {
  return (
    <MuiListItemText
      disableTypography
      sx={{
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
      }}
    >
      {children}
    </MuiListItemText>
  )
}

export default function MenuLatteral() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 175,
  })

  const theme = useTheme()

  function handleOnMenuItemClick(event) {
    event.preventDefault()
    alert('Action à définir')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        // width: '4rem',
        zIndex: theme.zIndex.drawer,
        pointerEvents: 'none',
        color: '#fff',
      }}
    >
      <Paper
        component="nav"
        elevation={3}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          // width: '4rem',
          zIndex: theme.zIndex.drawer,
          pointerEvents: 'none',
          color: '#fff',
          transform: trigger ? 'translateX(170px)' : 'translateX(0)',
          transitionTimingFunction: theme.transitions.easing.md3[trigger ? 'emphasizedDecelerate' : 'emphasizedAccelerate'],
          transitionDuration: `${theme.transitions.duration.md3[trigger ? 'medium4' : 'short4']}ms`,
          backgroundColor: theme.vars.palette.bleuPrincipal.main, // var(--mui-palette-primary-main)
          pointerEvents: 'auto',
          borderRadius: '12px 0 0 12px',
          transitionProperty: `transform`,
        })}
      >
        <MenuList>
          <MenuItem component="a" href="https://umontreal.on.worldcat.org/discovery?lang=fr">
            <ListItemIcon>
              <SofiaIcon color="#fff" />
            </ListItemIcon>
            <ListItemText>Sofia</ListItemText>
          </MenuItem>
          <MenuItem component="a" href="/horaires">
            <ListItemIcon>
              <ClockCountdown color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText>Horaires</ListItemText>
          </MenuItem>
          <MenuItem component="a" href="https://calendrier.bib.umontreal.ca/r">
            <ListItemIcon>
              <CalendarPlus color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText>Réserver une salle</ListItemText>
          </MenuItem>
          <MenuItem component="a" href="#" onClick={handleOnMenuItemClick}>
            <ListItemIcon>
              <Lifebuoy color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText>Soutien informatique</ListItemText>
          </MenuItem>
          <MenuItem component="a" href="#" onClick={handleOnMenuItemClick}>
            <ListItemIcon>
              <Chats color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText>Clavarder</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  )
}
