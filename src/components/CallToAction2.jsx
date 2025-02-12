import { styled } from '@mui/material'
import Grid from '@mui/material/Grid2'

export default function CallToAction2({ leftColl, rightColl, sx, children, ...props }) {
  // if (!['left', 'right'].includes(align)) {
  //   throw new Error(`Invalid align property: ${align}. Muse be one of: \`left\` (default) or \`right\``)
  // }

  const leftCollContainer = (
    <Grid size={{ xs: 12, md: 3 }}>
      {leftColl}
    </Grid>
  )
  
  const rightCollContainer = (
    <Grid size={{ xs: 12, md: 8 }}>
      {rightColl}
    </Grid>
  )

  return (
    <Grid
      container
      spacing={0}
      sx={{
        alignItems: 'flex-start',
        '.MuiTypography-h2, .MuiTypography-h3': {
          fontFamily: 'Figtree',
          fontSize: '3.8125rem',
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: '2rem'
        },
        '.MuiButton-root:first-of-type': {
            marginTop: '2rem',
        },
        ...sx,
      }}
      {...props}
    >
      {leftCollContainer}
      {rightCollContainer}
    </Grid>
  )
}
