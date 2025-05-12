import Grid from '@mui/material/Grid2'

export default function LayoutGrid({ outter = false, sx, children, ...props }) {
  return (
    <Grid
      container
      spacing="64px"
      sx={(theme) => ({
        ...(outter && {
          paddingLeft: '20px',
          paddingRight: '20px',
          [theme.breakpoints.up('md')]: {
            paddingLeft: '64px',
            paddingRight: '64px',
          },
        }),
        ...sx,
      })}
      {...props}
    >
      {children}
    </Grid>
  )
}
