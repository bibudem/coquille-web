import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { darken } from '@mui/material/styles'

const DARKEN_FACTOR = 0.8

/**
 * Un composant qui affiche une icône à l'intérieur d'un carré avec une couleur de fond et des styles personnalisables.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.icon - Le composant icône à afficher à l'intérieur du carré. (obligatoire)
 * @param {string} [props.color='transparent'] - La couleur de fond du carré. Peut être une couleur de la palette de thème ou une couleur personnalisée.
 *
 * @returns {JSX.Element} Le composant rendu.
 */
export default function IconInSquare({ icon, color = 'transparent', sx }) {
  const theme = useTheme()

  if (icon === undefined) {
    throw new Error('La propriété icon est obligatoire et ne doit pas être indéfinie.')
  }

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
            fill: iconColor,
          },
        }}
      >
        {icon}
      </Grid>
    </Grid>
  )
}
