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
    <Grid size={{ xs: 12, md: 5 }} key="content">
      {children}
    </Grid>,
  ]

  columns[align === 'left' ? 'push' : 'unshift'](
    <Grid size={1}></Grid>
  )

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
      spacing={0}
      sx={{
        alignItems: 'center',
        '.MuiTypography-h2': {
          fontFamily: 'Figtree',
          fontSize: '3.8125rem',
          marginBottom: '2rem'
        },
        '.MuiButton-root:first-of-type': {
            marginTop: '2rem',
        },
        ...sx,
      }}
      {...props}
    >
      {columns}
    </Grid>
  )
}
