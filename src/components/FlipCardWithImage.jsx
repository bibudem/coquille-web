import { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

const cardSize = {
  width: '23rem',
  height: '25rem',
}

const CardContainer = styled('div')({
  position: 'relative',
  ...cardSize,
  cursor: 'pointer',
  perspective: '600px',
})

const FlipSide = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
})

const StyledTitle = styled('div')({
  fontSize: '1.75rem',
  fontWeight: 500,
  lineHeight: 1.2,
})

/**
 * FlipCardWithImage component that renders a card with a title and image.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {React.ComponentType} props.Image - The image component to be displayed.
 * @param {Object} [props.sx] - Optional MUI system styles to apply to the card.
 * @returns {React.ReactElement} - The FlipCardWithImage component.
 */
export default function FlipCardWithImage({ title, Image, ...rest }) {
  if (typeof Image === 'undefined') {
    throw new Error('The `Image` prop is missing')
  }

  const { sx, children, ...props } = rest
  const [_image, setImage] = useState(Image)
  const theme = useTheme()

  const FlipContainer = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transitionProperty: 'transform',
    transitionDuration: `${theme.transitions.easing.md3.emphasizedIn}`,
    transitionDuration: `${theme.transitions.duration.md3.long4}ms`,
    transformStyle: 'preserve-3d',
  })

  useEffect(() => {
    setImage(Image)
  }, [Image])

  return (
    <CardContainer
      sx={{
        ...sx,
        '&:hover': {
          '.flip-container': {
            transform: 'rotateY(180deg)',
            transition: `transform ${theme.transitions.duration.md3.long4}ms ${theme.transitions.easing.md3.emphasizedOut}`,
          },
        },
      }}
    >
      <FlipContainer className="flip-container">
        <FlipSide>
          <Card
            sx={(theme) => ({
              borderRadius: theme.shape.corner.small,
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%) no-repeat, url('${_image}') no-repeat center center`,
              backgroundSize: 'cover',
              color: '#fff',
              boxShadow: 'none',
              ...cardSize,
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
        </FlipSide>
        <FlipSide
          sx={{
            transform: 'rotateY(180deg)',
          }}
        >
          <Card
            sx={(theme) => ({
              borderRadius: theme.shape.corner.small,
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%) no-repeat, url('${_image}') no-repeat center center`,
              backgroundSize: 'cover',
              color: '#fff',
              boxShadow: 'none',
              ...cardSize,
              ...sx,
            })}
            {...props}
          >
            <CardContent
              sx={{
                padding: '1.88rem',
                height: '100%',

                // backgroundColor: _bg.main,
                flexGrow: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.88rem',
              }}
            >
              <Grid
                container
                sx={{
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Grid
                  sx={{
                    '> :first-child': {
                      marginTop: 0,
                    },
                    '& > :last-child': {
                      marginBottom: 0,
                    },
                  }}
                >
                  {children}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </FlipSide>
      </FlipContainer>
    </CardContainer>
  )
}
