import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { darken } from '@mui/material/styles'

const DARKEN_FACTOR = .8

export default function IconInSquare({ icon, color, sx }) {
  const theme = useTheme()
  const hasColor = Reflect.has(theme.palette, color)
  const bgcolor = hasColor ? theme.palette[color].main : typeof color === 'undefined' ? 'transparent' : color
  const iconColor = hasColor ? darken(theme.palette[color].main, DARKEN_FACTOR) : typeof color === 'undefined' ? 'transparent' : darken(color, DARKEN_FACTOR)

  return (
    <Grid
      container
      spacing={4}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.shape.corner.small,
        bgcolor,
        width: '10.875rem',
        height: '11.875rem',
        marginInline: 'auto',
        ...sx,
      }}
    >
      <Grid
        sx={{
          svg: {
            width: '5.25rem',
            height: '5.25rem',
            fill: iconColor
          },
        }}
      >
        {icon}
      </Grid>
    </Grid>
  )
}
