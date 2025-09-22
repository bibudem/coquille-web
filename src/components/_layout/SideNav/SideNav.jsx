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
            width:'85vw',
            top: appBarHeight,
            height: 'auto',   
            maxHeight: `calc(100% - ${appBarHeight})`,
          },
        },
      }}
      {...props}
    >
      {children}
    </Drawer>
  )
}
