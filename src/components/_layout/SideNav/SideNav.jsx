import { Drawer } from '@mui/material'
import { appBarHeight } from '../AppBar/TopAppBar'

export default function SideNav({ children, ...props }) {
  return (
    <Drawer
      variant="temporary"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#222930',
            color: '#fff',
            padding: '2rem',
            top: appBarHeight, // reste sous l’AppBar
            height: 'auto',    // hauteur ajustée au contenu
            maxHeight: `calc(100% - ${appBarHeight})`, // jamais plus que l’écran
          },
        },
      }}
      {...props}
    >
      {children}
    </Drawer>
  )
}
