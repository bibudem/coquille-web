import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import { appBarHeight } from '../AppBar/TopAppBar'

export default function SideNav({ children, ...props }) {
  const theme = useTheme()

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      transitionDuration={{
        enter: theme.transitions.duration.md3.medium3,
        exit: theme.transitions.duration.md3.medium3,
      }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#222930',
            color: '#fff',
            padding: '2rem',
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