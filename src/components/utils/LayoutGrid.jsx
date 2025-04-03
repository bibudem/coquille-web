import Grid from '@mui/material/Grid2'

export default function LayoutGrid({ outter = false, sx, children, ...props }) {
  return (
    <Grid
      container
      spacing="64px"
      sx={{
        ...(outter && {
          paddingLeft: '64px',
          paddingRight: '64px',
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Grid>
  )
}
