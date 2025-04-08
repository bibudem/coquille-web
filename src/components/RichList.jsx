import { List } from '@mui/material'
import GridOffset from './utils/GridOffset'

export default function ListRich({ offset = 0.5, children }) {
  return (
    <GridOffset offset={offset}>
      <List>{children}</List>
    </GridOffset>
  )
}
