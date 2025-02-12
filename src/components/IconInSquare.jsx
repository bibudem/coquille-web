import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'

export default function IconInSquare({ icon, color, sx }) {
  const theme = useTheme()
  const bgColor = Reflect.has(theme.palette, color) ? theme.palette[color].main : 'transparent'
  return (
    <Grid
      container
      spacing={4}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        outline: '1px solid red',
        borderRadius: theme.shape.corner.small,
        bgColor,
        width: '10.875rem',
        height: '11.875rem',
        ...sx,
      }}
    >
      <Grid
        sx={{
          svg: {
            width: '5.25rem',
            height: '5.25rem',
          },
        }}
      >
        {icon}
      </Grid>
    </Grid>
  )
}
