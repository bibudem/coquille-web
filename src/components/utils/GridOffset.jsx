import Grid from '@mui/material/Grid2'

export default function GridOffset({ offset = 0, children }) {
  if (typeof offset !== 'number') {
    throw new Error('The `offset` prop muse be a number.')
  }

  return (
    <Grid container spacing={0} id="t">
      <Grid size={12 - offset * 2} offset={offset}>
        {children}
      </Grid>
    </Grid>
  )
}
