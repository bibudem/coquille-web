import { Drawer } from '@mui/material'

export default function SideNav({ children, ...props }) {
  console.log('############################################ ', props)
  return (
    <Drawer anchor="right" variant="temporary" {...props}>
      {children}
    </Drawer>
  )
}
