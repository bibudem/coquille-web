import { styled } from '@mui/material'
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
 *
 * @throws {Error} Si la propriété `align` n'est pas 'left' ou 'right'.
 * @throws {Error} Si la propriété `Image` n'est pas fournie.
 *
 * @returns {JSX.Element} Le composant HeroWithImage rendu.
 */
export default function HeroWithImage({ align = 'left', footer, Image, ...rest }) {
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
        <StyledImage src={Image} alt="" aria-hidden />
      </Grid>
    )
  }

  return (
    <GridOffset offset={0.5}>
      <Grid
        container
        spacing={0}
        direction={{ xs: 'column', md: 'row' }}
        gap={{ xs: '2rem', md: 0 }}
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
