import Grid from '@mui/material/Grid2'
import GridOffset from './utils/GridOffset'
import { useSmall } from '@/hooks/use-small'
import Div from './utils/Div'

function FooterContainer({ children }) {
  return <Div style={{ paddingTop: '2rem' }}>{children}</Div>
}

/**
 * Le composant HeroWithText affiche une mise en page à deux colonnes avec un contenu personnalisable.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.leftColl - Le contenu à afficher dans la colonne de gauche.
 * @param {React.ReactNode} props.rightColl - Le contenu à afficher dans la colonne de droite.
 * @param {React.ReactNode} [props.leftFooter] - Contenu à afficher dans le pied de la section.
 * @param {React.ReactNode} [props.rightFooter] - Contenu à afficher dans le pied de la section.
 *
 * @returns {JSX.Element} Le composant HeroWithText rendu.
 */
export default function HeroWithText({ leftColl, rightColl, leftFooter, rightFooter, ...rest }) {
  const { sx, children, ...props } = rest
  const isSmall = useSmall('md')

  const leftCollContainer = (
    <Grid size={{ xs: 12, md: 3 }}>
      {leftColl}
      {!isSmall && leftFooter && <FooterContainer>{leftFooter}</FooterContainer>}
    </Grid>
  )

  const rightCollContainer = (
    <Grid size={{ xs: 12, md: 8 }}>
      {rightColl}
      {!isSmall && rightFooter && <FooterContainer>{rightFooter}</FooterContainer>}
    </Grid>
  )

  return (
    <GridOffset offset={0.5}>
      <Grid
        container
        spacing={0}
        gap={{ xs: '2rem', md: 0 }}
        sx={{
          alignItems: 'flex-start',
          '.MuiTypography-h2, .MuiTypography-h3': {
            fontFamily: 'Figtree',
            fontSize: '3.8125rem',
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: '2rem',
          },
          ...sx,
        }}
        {...rest}
      >
        {leftCollContainer}
        {rightCollContainer}
        {isSmall && leftFooter && <Grid size={12}>{leftFooter}</Grid>}
        {isSmall && rightFooter && <Grid size={12}>{rightFooter}</Grid>}
      </Grid>
    </GridOffset>
  )
}
