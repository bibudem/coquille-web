import { SwipeableDrawer } from '@mui/material'

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
          '> .MuiBox-root': {
            width: '100%',
          },
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  )
}
