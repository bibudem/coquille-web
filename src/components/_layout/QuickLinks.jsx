import { ListItemIcon, ListItemText as MuiListItemText, MenuItem, MenuList, Paper, useScrollTrigger, useTheme, IconButton, Box } from '@mui/material'
import { CalendarPlus, Chats, ClockCountdown, Lifebuoy } from '@phosphor-icons/react'
import Div from '@/components/utils/Div'
import { SofiaIcon } from '@/components/CustomIcons'
import Link from '@/components/Link'

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

export function QuickLinks() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  })

  const theme = useTheme()

  function handleOnMenuItemClick(event) {
    event.preventDefault()
    alert('Action à définir')
  }

  return (
    <Div
      sx={{
        display: 'flex',
        position: 'fixed',
        justifyContent: 'center',
        zIndex: theme.zIndex.drawer,
        color: '#fff',
        flexDirection: 'column',
        top: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
      }}
    >
      <Paper
        component="nav"
        elevation={3}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          zIndex: theme.zIndex.drawer,
          pointerEvents: 'none',
          color: '#fff',
          transform: trigger ? 'translateX(185px)' : 'translateX(0)',
          transitionTimingFunction: theme.transitions.easing.md3[trigger ? 'emphasizedDecelerate' : 'emphasizedAccelerate'],
          transitionDuration: `${theme.transitions.duration.md3[trigger ? 'medium4' : 'short4']}ms`,
          backgroundColor: theme.vars.palette.bleuPrincipal.main,
          pointerEvents: 'auto',
          borderRadius: '12px 0 0 12px',
          transitionProperty: `transform`,
        })}
      >
        <MenuList>
          <MenuItem component={Link} to="https://umontreal.on.worldcat.org/discovery?lang=fr">
            <ListItemIcon>
              <SofiaIcon color="#fff" />
            </ListItemIcon>
            <ListItemText>Sofia</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/horaires">
            <ListItemIcon>
              <ClockCountdown color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText>Horaires</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="https://calendrier.bib.umontreal.ca/r">
            <ListItemIcon>
              <CalendarPlus color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText>Réserver une salle</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="#" onClick={handleOnMenuItemClick}>
            <ListItemIcon>
              <Lifebuoy color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText>Soutien informatique</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="#" onClick={handleOnMenuItemClick}>
            <ListItemIcon>
              <Chats color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText>Clavarder</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Div>
  )
}

export function QuickLinksSm() {
  const theme = useTheme()

  function handleOnMenuItemClick(event) {
    event.preventDefault()
    alert('Action à définir')
  }

  return (
    <Div
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        position: 'fixed',
        zIndex: theme.zIndex.drawer,

        left: 0,
        right: 0,
        bottom: 0,
        color: '#fff',
        backgroundColor: theme.vars.palette.bleuPrincipal.main,
        zIndex: theme.zIndex.drawer,
        padding: '15px 30px',
        boxShadow: theme.shadows[3],
      }}
    >
      <Box
        component="nav"
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: 500,
          maxWidth: '100%',
        }}
      >
        <IconButton component={Link} href="https://umontreal.on.worldcat.org/discovery?lang=fr" aria-label="Sofia">
          <SofiaIcon color="#fff" fontSize="40px" />
        </IconButton>
        <IconButton component={Link} href="/horaires" aria-label="Horaires">
          <ClockCountdown color="#fff" size={40} />
        </IconButton>
        <IconButton component={Link} href="https://calendrier.bib.umontreal.ca/r" aria-label="Réserver une salle">
          <CalendarPlus color="#fff" size={40} />
        </IconButton>
        <IconButton component={Link} href="#" onClick={handleOnMenuItemClick} aria-label="Soutien informatique">
          <Lifebuoy color="#fff" size={40} />
        </IconButton>
        <IconButton component={Link} href="#" onClick={handleOnMenuItemClick} aria-label="Clavarder">
          <Chats color="#fff" size={40} />
        </IconButton>
      </Box>
    </Div>
  )
}
