import { styled } from '@mui/material'
import Grid from '@mui/material/Grid2'

const StyledImage = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.corner.small,
  maxWidth: '100%',
  height: 'auto',
}))

export default function CallToAction({ data, align = 'left', image, sx, children, ...props }) {
  if (!['left', 'right'].includes(align)) {
    throw new Error(`Invalid align property: ${align}. Muse be one of: \`left\` (default) or \`right\``)
  }

  if (typeof image === 'undefined') {
    throw new Error('Missing image property')
  }

  const columns = [
    <Grid size={{ xs: 12, md: 6 }} key="content">
      {children}
    </Grid>,
  ]

  columns[align === 'left' ? 'push' : 'unshift'](
    <Grid
      container
      size={{ xs: 12, md: 6 }}
      key="image"
      sx={{
        justifyContent: 'center',
      }}
    >
      <StyledImage src={image} alt="" />
    </Grid>
  )

  return (
    <Grid
      container
      spacing={10}
      sx={{
        alignItems: 'center',
        '.MuiTypography-h2': {
          fontFamily: 'Figtree',
        },
        ...sx,
      }}
      {...props}
    >
      {columns}
    </Grid>
  )
}
