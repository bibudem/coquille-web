import { Grid2 as Grid, List } from '@mui/material'

export default function ListRich({ children }) {
  return (
    <Grid container spacing={0}>
      <Grid size={11} offset={0.5}>
        <List>{children}</List>
      </Grid>
    </Grid>
  )
}
