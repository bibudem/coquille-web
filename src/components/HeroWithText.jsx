import Grid from '@mui/material/Grid2'

/**
 * Le composant HeroWithText affiche une mise en page à deux colonnes avec un contenu personnalisable.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.leftColl - Le contenu à afficher dans la colonne de gauche.
 * @param {React.ReactNode} props.rightColl - Le contenu à afficher dans la colonne de droite.
 *
 * @returns {JSX.Element} Le composant HeroWithText rendu.
 */
export default function HeroWithText({ leftColl, rightColl, sx, children, ...rest }) {
  const leftCollContainer = <Grid size={{ xs: 12, md: 3 }}>{leftColl}</Grid>

  const rightCollContainer = <Grid size={{ xs: 12, md: 8 }}>{rightColl}</Grid>

  return (
    <Grid
      container
      spacing={0}
      sx={{
        alignItems: 'flex-start',
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
      {leftCollContainer}
      {rightCollContainer}
    </Grid>
  )
}
