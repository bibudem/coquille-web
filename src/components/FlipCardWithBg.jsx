import { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

const bgColors = ['bleuPrincipal', 'rose300', 'vertFonce']

const CardContainer = styled('div')({
  position: 'relative',
  width: 337,
  height: 400,
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

const Title = styled('div')({
  fontSize: '1.9375rem',
  fontWeight: 500,
  lineHeight: 1.2,
  fontVariantNumeric: 'lining-nums tabular-nums',
  fontFeatureSettings: "'liga' off, 'clig' off",
})

/**
 * FlipCardWithBg component that renders a flippable card with a title and icon.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {React.ComponentType} props.Icon - The icon component to be displayed.
 * @param {'bleuPrincipal' | 'rose300' | 'vertFonce'} [props.bg='bleuPrincipal'] - The background color of the card.
 * @returns {React.ReactElement} - The FlipCardWithBg component.
 */
export default function FlipCardWithBg({ title, Icon, bg = 'bleuPrincipal', ...rest }) {
  if (typeof title === 'undefined') {
    throw new Error('The `title` prop is missing')
  }

  if (typeof Icon === 'undefined') {
    throw new Error('The `Icon` prop is missing')
  }

  if (!bgColors.includes(bg)) {
    throw new Error(`The \`bg\` prop accepted values are: ${bgColors.join(', ')}. Received: ${bg}`)
  }

  const { sx, children, ...props } = rest
  const theme = useTheme()
  const [_bg, setBg] = useState(bg)

  const FlipContainer = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transitionProperty: 'transform',
    borderRadius: theme.shape.corner.small,
    transitionDuration: `${theme.transitions.easing.md3.emphasizedIn}`,
    transitionDuration: `${theme.transitions.duration.md3.long4}ms`,
    transformStyle: 'preserve-3d',
  })

  useEffect(() => {
    if (bg) {
      setBg(theme.palette[bg])
    }
  }, [bg])

  function onCardContainerClick() {
    // console.log('click')
    // setBg(theme.palette[bg])
  }

  return (
    <CardContainer
      sx={{
        borderRadius: theme.shape.corner.small,
        ...sx,
        '&:hover, &:focus': {
          '.flip-container': {
            transform: 'rotateY(180deg)',
            transition: `transform ${theme.transitions.duration.md3.long4}ms ${theme.transitions.easing.md3.emphasizedOut}`,
          },
        },
      }}
      tabIndex="0"
      onClick={onCardContainerClick}
    >
      <FlipContainer className="flip-container">
        <FlipSide>
          <Card
            sx={(theme) => ({
              borderRadius: theme.shape.corner.small,
              color: _bg.contrastText,
              boxShadow: 'none',
              width: 337,
              height: 400,
              ...sx,
            })}
            {...props}
          >
            <CardContent
              sx={{
                padding: '1.88rem',
                height: '100%',

                backgroundColor: _bg.main,
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
                  alignItems: 'stretch',
                  alignContent: 'space-between',
                  height: '100%',
                }}
              >
                <Grid
                  sx={{
                    svg: {
                      fill: bg === 'rose300' ? theme.palette.rougeOrange.main : '#fff',
                      fillOpacity: 0.5,
                      width: 55,
                      fontSize: 55,
                      height: 'auto',
                    },
                  }}
                >
                  <Icon />
                </Grid>
                <Grid>
                  <Title>{title}</Title>
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
              background: _bg.main,
              color: _bg.contrastText,
              boxShadow: 'none',
              width: 337,
              height: 400,
              ...sx,
            })}
            {...props}
          >
            <CardContent
              sx={{
                padding: '1.88rem',
                height: '100%',

                backgroundColor: _bg.main,
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
