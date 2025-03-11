import { Children, useEffect, useState } from 'react'
import { IconButton, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
// import 'pure-react-carousel/dist/react-carousel.es.css'
import { Carousel } from '@ark-ui/react/carousel'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from './CustomIcons'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { LocaleProvider } from '@ark-ui/react'

const slidesPerPagPerBreakpoint = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
}

/**
 * A React component that renders a carousel with a title, description, and optional "more" link.
 *
 * @param {object} props - The component props.
 * @param {string|React.ReactNode} props.title - The title of the carousel, which can be a string or a React element.
 * @param {string|React.ReactNode} props.description - The description of the carousel, which can be a string or a React element.
 * @param {string} [props.moreText] - The text for the "more" link.
 * @param {string} [props.moreLink] - The URL for the "more" link.
 * @param {React.ReactNode} [props.children] - The content to be displayed in the carousel.
 * @returns {React.ReactElement} - The Carousel1 component.
 */
export default function Carousel1({ title, description, moreText, moreLink = '#', ...rest }) {
  const { sx, children, ...props } = rest
  const [slidesPerPage, setSlidesPerPage] = useState(1)
  const [showNavigation, setShowNavigation] = useState(false)
  const theme = useTheme()
  const currentBreakpoint = useBreakpoint()

  const variableWidthStyles = {
    [theme.breakpoints.up('md')]: {
      maxWidth: '69rem',
    },
  }

  useEffect(() => {
    if (Reflect.has(slidesPerPagPerBreakpoint, currentBreakpoint.key) && slidesPerPage !== slidesPerPagPerBreakpoint[currentBreakpoint.key]) {
      setSlidesPerPage(slidesPerPagPerBreakpoint[currentBreakpoint.key])
    }
  }, [currentBreakpoint])

  useEffect(() => {
    setShowNavigation(Children.count(children) > slidesPerPage)
  }, [children, slidesPerPage])

  return (
    <LocaleProvider locale="fr-FR">
      <Carousel.Root
        defaultPage={0}
        slideCount={Children.count(children)}
        slidesPerPage={slidesPerPage}
        allowMouseDrag
        spacing="10px"
        style={{
          justifyContent: 'start',
          '--slide-item-size': 'min-content',
        }}
        {...props}
      >
        <p>slidesPerPage: {slidesPerPage}</p>
        <Grid container spacing="45px">
          <Grid size={12}>
            <Div
              sx={{
                pb: 4,
                ...variableWidthStyles,
                '.MuiTypography-root': {
                  fontSize: '2.25rem!important',
                  fontWeight: 400,
                  lineHeight: 1,
                },
              }}
            >
              {typeof title === 'string' ? <Typography component="h2">{title}</Typography> : title}
            </Div>
            <Grid container>
              <Grid
                size="grow"
                sx={{
                  '.MuiTypography-root': {
                    fontSize: '1.25rem!important',
                    ...variableWidthStyles,
                  },
                }}
              >
                <Div sx={variableWidthStyles}>
                  {typeof description === 'string' ? (
                    <Typography variant="body1" component="div">
                      {description}
                    </Typography>
                  ) : (
                    description
                  )}
                </Div>
              </Grid>
              {showNavigation && (
                <Grid container size="auto" spacing="10px" sx={{ alignItems: 'flex-end', pl: 4 }}>
                  <Carousel.Control>
                    <Carousel.PrevTrigger asChild>
                      <IconButton color="primary" aria-label="précédent" sx={{ fontSize: 50 }}>
                        <ArrowLeftCircleIcon fontSize={50} />
                      </IconButton>
                    </Carousel.PrevTrigger>
                    <Carousel.NextTrigger asChild>
                      <IconButton color="primary" aria-label="suivant" sx={{ fontSize: 50 }} edge="end">
                        <ArrowRightCircleIcon fontSize={50} />
                      </IconButton>
                    </Carousel.NextTrigger>
                  </Carousel.Control>
                </Grid>
              )}
            </Grid>
          </Grid>
          <div style={{ outline: '1px solid red' }}>
            <Carousel.ItemGroup>
              {Children.toArray(children).map((child, index) => {
                return (
                  <Carousel.Item key={index} index={index}>
                    {child}
                  </Carousel.Item>
                )
              })}
            </Carousel.ItemGroup>
          </div>
          {moreLink && moreText && (
            <Grid size={12}>
              <Button primary href={moreLink}>
                {moreText}
              </Button>
            </Grid>
          )}
        </Grid>
      </Carousel.Root>
    </LocaleProvider>
  )
}
