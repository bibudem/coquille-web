import { SwipeableDrawer, useTheme } from '@mui/material'
import { appBarHeight } from '../AppBar/TopAppBarSm'

export default function SideNavSm({ children, ...props }) {
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const theme = useTheme()
  return (
    <SwipeableDrawer
      anchor="right"
      variant="temporary"
      transitionDuration={{
        enter: theme.transitions.duration.md3.medium3,
        exit: theme.transitions.duration.md3.medium3,
      }}
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
