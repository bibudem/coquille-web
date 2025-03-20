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
 *
 * @returns {JSX.Element} Le composant HeroWithText rendu.
 */
export default function HeroWithText2({ leftColl, rightColl, leftFooter, rightFooter, ...rest }) {
  const { sx, children, ...props } = rest
  const isSmall = useSmall('md')
  const leftCollContainer = (
    <Grid size={{ xs: 12, md: 6 }}>
      {leftColl}
      {!isSmall && <FooterContainer>{leftFooter}</FooterContainer>}
    </Grid>
  )
  const rightCollContainer = (
    <Grid size={{ xs: 12, md: 6 }}>
      {rightColl}
      {!isSmall && <FooterContainer>{rightFooter}</FooterContainer>}
    </Grid>
  )

  return (
    <GridOffset offset={0.5}>
      <Grid
        container
        spacing={{ xs: 5.625, md: 8 }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          alignItems: 'center',
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
        {isSmall && (
          <Grid size={12} sx={{ marginTop: '2rem' }}>
            {leftFooter}
            {rightFooter}
          </Grid>
        )}
      </Grid>
    </GridOffset>
  )
}
