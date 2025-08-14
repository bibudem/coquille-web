import { ListItemIcon, ListItemText as MuiListItemText, MenuItem, MenuList, Paper, useScrollTrigger, useTheme, IconButton, Box, useMediaQuery } from '@mui/material'
import { CalendarPlus, Chats, ClockCountdown, Lifebuoy } from '@phosphor-icons/react'
import Div from '@/components/utils/Div'
import { SofiaIcon } from '@/components/CustomIcons'
import Link from '@/components/Link'
import LibChatWidget from '@/components/LibChatWidget';

function ListItemText({ children, trigger }) {
  return (
    <MuiListItemText
      disableTypography
      sx={{
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
        transition: 'opacity 0.2s ease',
        '.MuiMenuItem-root:hover &': {
          opacity: 1,
        },
        // Pour les petits écrans, toujours montrer le texte
        '@media (max-width: 900px)': {
          opacity: 1,
        }
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
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  function handleOnMenuItemClick(event) {
    event.preventDefault()
    alert('Action à définir')
  }

  function handleChatClick(event) {
    event.preventDefault();
    if (typeof window.openLibChatDirect === 'function') {
      window.openLibChatDirect();
    } else {
      console.error("La fonction openLibChatDirect n'est pas disponible");
    }
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
      <LibChatWidget />
      <Paper
        component="nav"
        elevation={3}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          zIndex: theme.zIndex.drawer,
          pointerEvents: 'none',
          color: '#fff',
          transform: trigger ? 'translateX(calc(100% - 65px))' : 'translateX(0)',
          transitionTimingFunction: theme.transitions.easing.md3[trigger ? 'emphasizedDecelerate' : 'emphasizedAccelerate'],
          transitionDuration: `${theme.transitions.duration.md3[trigger ? 'medium4' : 'short4']}ms`,
          backgroundColor: theme.vars.palette.bleuPrincipal.main,
          pointerEvents: 'auto',
          borderRadius: '12px 0 0 12px',
          transitionProperty: 'transform',
          '&:hover': {
            transform: isLargeScreen && trigger ? 'translateX(0)' : null,
            transitionTimingFunction: theme.transitions.easing.md3.emphasizedDecelerate,
            transitionDuration: `${theme.transitions.duration.md3.medium4}ms`,
          },
        })}
      >
        <MenuList sx={{
          padding: '8px 0',
          '& .MuiMenuItem-root': {
            borderRadius: '6px',
            padding: '8px 16px',
            margin: '0 8px',
            transition: 'background-color 0.2s ease',
            minHeight: '48px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }
        }}>
          <MenuItem component={Link} to="https://umontreal.on.worldcat.org/discovery?lang=fr" target="_blank"  rel="noopener noreferrer">
            <ListItemIcon>
              <SofiaIcon color="#fff" fontSize='24px' />
            </ListItemIcon>
            <ListItemText trigger={trigger}>Sofia</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/horaires">
            <ListItemIcon>
              <ClockCountdown color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText trigger={trigger}>Horaires</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="https://calendrier.bib.umontreal.ca/r" target="_blank"  rel="noopener noreferrer">
            <ListItemIcon>
              <CalendarPlus color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText trigger={trigger}>Réserver une salle</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="https://studio.bib.umontreal.ca/informatique/" target="_blank"  rel="noopener noreferrer">
            <ListItemIcon>
              <Lifebuoy color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText trigger={trigger}>Soutien informatique</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="#" onClick={handleChatClick}>
            <ListItemIcon>
              <Chats color="#fff" size={24} />
            </ListItemIcon>
            <ListItemText trigger={trigger}>Clavarder</ListItemText>
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

  function handleChatClick(event) {
    event.preventDefault();
    if (typeof window.openLibChatDirect === 'function') {
      window.openLibChatDirect();
    } else {
      console.error("La fonction openLibChatDirect n'est pas disponible");
    }
  }

  return (
    <Div
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        zIndex: theme.zIndex.drawer,

        position: 'fixed',
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
      <LibChatWidget />
      <Box
        component="nav"
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 500,
          maxWidth: '100%',
        }}
      >
        <IconButton component={Link} to="https://umontreal.on.worldcat.org/discovery?lang=fr" aria-label="Sofia">
          <SofiaIcon color="#fff" fontSize="40px" />
        </IconButton>
        <IconButton component={Link} to="/horaires" aria-label="Horaires">
          <ClockCountdown color="#fff" size={40} />
        </IconButton>
        <IconButton component={Link} to="https://calendrier.bib.umontreal.ca/r" aria-label="Réserver une salle">
          <CalendarPlus color="#fff" size={40} />
        </IconButton>
        <IconButton component={Link} to="https://studio.bib.umontreal.ca/informatique/" aria-label="Soutien informatique">
          <Lifebuoy color="#fff" size={40} />
        </IconButton>
        <IconButton component={Link} to="#" onClick={handleChatClick} aria-label="Clavarder">
          <Chats color="#fff" size={40} />
        </IconButton>
      </Box>
    </Div>
  )
}
