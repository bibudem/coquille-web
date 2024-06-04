import { useEffect, useState } from 'react'
import { AppBar, SvgIcon, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import SideNavSm from '@/components/SideNav/SideNavSm'
import SideNavContent from '@/components/SideNav/SideNavContent'
import Link from '@/components/Link'
import MenuFab from './MenuFab'
import Home from '@/icons/home_24dp_FILL0_wght400_GRAD0_opsz48.svg'

export default function BottomAppBarSm() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newState) => () => {
    setOpen(newState ?? !open)
  }

  useEffect(() => {
    function onClose() {
      setOpen(false)
    }

    document.documentElement.addEventListener('close', onClose)

    return () => {
      document.documentElement.removeEventListener('close', onClose)
    }
  }, [])

  return (
    <>
      <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0 }} elevation={0}>
        <Toolbar>
          <IconButton component={Link} to="/" color="inherit" size="large" aria-label="open drawer">
            <SvgIcon component={Home} inheritViewBox />
          </IconButton>
          <MenuFab
            onClick={toggleDrawer(true)}
            sx={{
              position: 'absolute',
              zIndex: 1,
              bottom: 15,
              right: 15,
            }}
          />
        </Toolbar>
      </AppBar>
      <SideNavSm open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
        <SideNavContent />
      </SideNavSm>
    </>
  )
}
