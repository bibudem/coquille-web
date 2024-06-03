import { SwipeableDrawer } from '@mui/material'
import { useState } from 'react'

export default function SideNavSm({ children }) {
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [open, setOpen] = useState(false)

  function toggleDrawer(newOpen) {
    setOpen(newOpen)
  }

  return (
    <SwipeableDrawer open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
      {children}
    </SwipeableDrawer>
  )
}
