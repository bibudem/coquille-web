import Grid from '@mui/material/Grid2'

export default function CallToAction({align, heading, action, sx, children, ...props}) {
  return (
    <Grid container spacing={2} sx={{alignItems: 'center', ...sx}} {...props}>

    </Grid>
  )
}