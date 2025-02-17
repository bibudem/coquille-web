import { styled } from '@mui/material'
import Grid from '@mui/material/Grid2'

const StyledImage = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.corner.small,
  maxWidth: '100%',
  height: 'auto',
}))

/**
 * Le composant CallToAction1 affiche une section d'appel à l'action avec une image et du contenu.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} [props.align='left'] - L'alignement du contenu textuel, soit 'left' soit 'right'.
 * @param {string} props.image - L'image à afficher sous forme d'objet.
 * @param {Object} [props.rest] - Propriétés supplémentaires à passer au conteneur.
 *
 * @throws {Error} Si la propriété `align` n'est pas 'left' ou 'right'.
 * @throws {Error} Si la propriété `image` n'est pas fournie.
 *
 * @returns {JSX.Element} Le composant CallToAction1 rendu.
 */
export default function CallToAction1({ align = 'left', image, sx, children, ...rest }) {
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

  columns[align === 'left' ? 'push' : 'unshift'](<Grid size={1}></Grid>)

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
        '.MuiTypography-h2, .MuiTypography-h3': {
          fontFamily: 'Figtree',
          fontSize: '3.8125rem',
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: '2rem',
        },
        '.MuiButton-root:first-of-type': {
          marginTop: '2rem',
        },
        ...sx,
      }}
      {...rest}
    >
      {columns}
    </Grid>
  )
}
