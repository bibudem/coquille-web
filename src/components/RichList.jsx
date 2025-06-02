import { List } from '@mui/material'
import GridOffset from './utils/GridOffset'

export default function ListRich({ offset = 0.5, children }) {
  return (
    <GridOffset offset={offset} className="bib-comp-rich-list">
      <List sx={{ padding: 0, width: '100%' }}>{children}</List>
    </GridOffset>
  )
}
