import { Drawer } from '@mui/material'

export default function SideNav({ children, ...props }) {
  return (
    <Drawer anchor="right" variant="temporary" {...props}>
      {children}
    </Drawer>
  )
}
