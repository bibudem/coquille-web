import { Drawer } from '@mui/material'

export default function SideNav({ children, ...props }) {
  return (
    <Drawer variant="temporary" slotProps={{ paper: { sx: { backgroundColor: 'bleuFonce.main', color: 'bleu200.main' } } }} {...props}>
      {children}
    </Drawer>
  )
}
