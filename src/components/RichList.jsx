import { List } from '@mui/material'
import GridOffset from './utils/GridOffset'

export default function ListRich({ children }) {
  return (
    <GridOffset offset={0.5}>
      <List>{children}</List>
    </GridOffset>
  )
}
