import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid2'
import { useSmall } from '@/hooks/use-small'
import GridOffset from './utils/GridOffset'
import Div from './utils/Div'

function FooterContainer({ children }) {
  return <Div style={{ paddingTop: '2rem' }}>{children}</Div>
}

const StyledImage = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.corner.small,
  maxWidth: '100%',
  height: 'auto',
}))

/**
 * Le composant HeroWithImage affiche une section d'appel à l'action avec une image et du contenu.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} [props.align='left'] - L'alignement du contenu textuel, soit 'left' soit 'right'.
 * @param {React.ReactNode} [props.footer] - Contenu à afficher dans le pied de la section.
 * @param {React.ReactNode} props.Image - L'image à afficher.
 * @param {number} [props.imageWidth] - Largeur réelle de l'image, en pixels.
 * @param {number} [props.imageHeight] - Hauteur réelle de l'image, en pixels.
 *   Avec ces deux valeurs, le navigateur réserve la place de l'image avant
 *   son téléchargement : le contenu en dessous ne saute plus quand elle
 *   arrive (décalage de mise en page, CLS).
 *
 * @throws {Error} Si la propriété `align` n'est pas 'left' ou 'right'.
 * @throws {Error} Si la propriété `Image` n'est pas fournie.
 *
 * @returns {JSX.Element} Le composant HeroWithImage rendu.
 */
export default function HeroWithImage({ align = 'left', footer, Image, imageWidth, imageHeight, ...rest }) {
  if (!['left', 'right'].includes(align)) {
    throw new Error(`Invalid align property: ${align}. Muse be one of: \`left\` (default) or \`right\``)
  }

  if (typeof Image === 'undefined') {
    throw new Error('Missing image property')
  }

  const { sx, children, ...props } = rest

  const isSmall = useSmall('md')

  const columns = [
    <Grid size={{ xs: 12, md: 5 }} key="content">
      {children}
      {!isSmall && footer && <FooterContainer>{footer}</FooterContainer>}
    </Grid>,
  ]

  if (typeof Image !== 'undefined') {
    if (!isSmall) {
      columns[align === 'left' ? 'push' : 'unshift'](<Grid size={1} key="spacer"></Grid>)
    }

    columns[align === 'left' ? 'push' : 'unshift'](
      <Grid
        container
        size={{ xs: 12, md: 6 }}
        key="image"
        sx={{
          justifyContent: 'center',
        }}
      >
        <StyledImage src={Image} width={imageWidth} height={imageHeight} alt="" aria-hidden />
      </Grid>
    )
  }

  return (
    <GridOffset offset={0.5}>
      <Grid
        container
        spacing={0}
        direction={{ xs: 'column', md: 'row' }}
        gap={{ xs: '2.5rem', md: 0 }}
        sx={{
          alignItems: 'center',
          ...sx,
        }}
        {...rest}
      >
        {columns}
        {isSmall && footer && <Grid size={12}>{footer}</Grid>}
      </Grid>
    </GridOffset>
  )
}
