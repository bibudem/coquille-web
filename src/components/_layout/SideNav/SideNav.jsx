import { Drawer, useTheme } from '@mui/material'
import { appBarHeight } from '../AppBar/TopAppBar'

export default function SideNav({ children, ...props }) {
  const theme = useTheme()

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      transitionDuration={{
        enter: theme.transitions.duration.md3.medium3,
        exit: theme.transitions.duration.md3.medium2,
      }}
      SlideProps={{
        easing: {
          enter: theme.transitions.easing.md3.emphasizedDecelerate,
          exit: theme.transitions.easing.md3.emphasizedAccelerate,
        },
      }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#222930',
            color: '#fff',
            padding: '2rem',
            width: '85vw',
            top: appBarHeight,
            height: 'auto',
            maxHeight: `calc(100% - ${appBarHeight})`,
            borderTopLeftRadius: theme.shape.corner.large,
            borderBottomLeftRadius: theme.shape.corner.large,
            boxShadow: 'rgba(0,0,0,0.2) -6px 0px 16px',
            transition: `
              box-shadow ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.emphasized},
              border-radius ${theme.transitions.duration.md3.short3}ms ${theme.transitions.easing.md3.standard}
            `,
          },
        },
      }}
      {...props}
    >
      {children}
    </Drawer>
  )
}
