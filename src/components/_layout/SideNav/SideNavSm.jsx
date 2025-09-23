import { SwipeableDrawer, useTheme } from '@mui/material'
import { appBarHeight } from '../AppBar/TopAppBarSm'

export default function SideNavSm({ children, ...props }) {
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const theme = useTheme()
  return (
    <SwipeableDrawer
      anchor="right"
      variant="temporary"
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      {...props}
      sx={{
        '> .MuiPaper-root': {
          width: '100%',
          padding:'1rem',
          backgroundColor: '#222930',
          top: appBarHeight, 
          height: 'auto',  
          maxHeight: `calc(100% - ${appBarHeight})`, 
          boxShadow: 'rgba(0,0,0,0.2) -6px 0px 16px',
          transition: `
            box-shadow ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.emphasized},
            border-radius ${theme.transitions.duration.md3.short3}ms ${theme.transitions.easing.md3.standard}
          `,
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  )
}
