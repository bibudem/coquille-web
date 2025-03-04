import { styled } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

const StyledTitle = styled('div')({
  fontSize: '1.75rem',
  fontWeight: 500,
  lineHeight: 1.2,
})

/**
 * FlipCardWithBg component that renders a card with a title and image.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {React.ComponentType} props.Image - The image component to be displayed.
 * @param {Object} [props.sx] - Optional MUI system styles to apply to the card.
 * @returns {React.ReactElement} - The FlipCardWithBg component.
 */
export default function FlipCardWithBg({ title, bgColor = 'bleuPrincipal', Icon, ...rest }) {
  if (typeof title === 'undefined') {
    throw new Error('The `title` prop is missing')
  }

  if (typeof Icon === 'undefined') {
    throw new Error('The `Icon` prop is missing')
  }

  const { sx, ...props } = rest
  // couleurs: rose, bleu vert
  return (
    <Card
      sx={(theme) => ({
        borderRadius: theme.shape.corner.small,
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%) no-repeat, url('${Image}') no-repeat center center`,
        backgroundSize: 'cover',
        color: '#fff',
        boxShadow: 'none',
        width: '23rem',
        height: '25rem',
        ...sx,
      })}
      {...props}
    >
      <CardContent
        sx={{
          padding: '1.88rem',
          height: '100%',
        }}
      >
        <Grid
          container
          sx={{
            alignItems: 'flex-end',
            height: '100%',
          }}
        >
          <Grid>
            <StyledTitle> {title} </StyledTitle>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
