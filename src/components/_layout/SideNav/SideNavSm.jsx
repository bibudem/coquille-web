import { SwipeableDrawer } from '@mui/material'
import { appBarHeight } from '../AppBar/TopAppBarSm'

export default function SideNavSm({ children, ...props }) {
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

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
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  )
}
