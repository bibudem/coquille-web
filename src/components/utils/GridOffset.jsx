import Grid from '@mui/material/Grid2'

export default function GridOffset({ offset = 0, children, ...props }) {
  if (isNaN(offset)) {
    throw new Error('The `offset` prop must be a number.')
  }

  offset = parseFloat(offset)

  return (
    <Grid container spacing={0}>
      <Grid container size={12 - offset * 2} offset={offset} {...props}>
        {children}
      </Grid>
    </Grid>
  )
}
