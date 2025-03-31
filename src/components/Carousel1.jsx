import { Children, useEffect, useMemo, useRef, useState } from 'react'
import { IconButton, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import TinySlider from 'tiny-slider-react'
import 'tiny-slider/dist/tiny-slider.css'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from './CustomIcons'
import { useBreakpoint } from '@/hooks/use-breakpoint'

const slidesPerPagPerBreakpoint = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 4,
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
  const currentBreakpoint = useBreakpoint()
  const sliderRef = useRef(null)
  const [sliderState, setSliderState] = useState(null)
  const [showNavigation, setShowNavigation] = useState(true)
  const [slidesPerPage, setSlidesPerPage] = useState(1)
  const [isFirst, setIsFirst] = useState(true)
  const [isLast, setIsLast] = useState(false)
  const theme = useTheme()
  const isSmall = useSmall()
  const slides = Children.toArray(children)
  const [api, setApi] = useState(null)

  const settings = {
    autoWidth: true,
    gutter: 10,
    lazyload: true,
    loop: false,
    nav: false,
    mouseDrag: true,
    controls: false, // remove built-in nav buttons
    responsive: {
      [theme.breakpoints.values.xs]: {
        items: 1,
      },
      [theme.breakpoints.values.sm]: {
        items: 2,
      },
      [theme.breakpoints.values.md]: {
        items: 3,
      },
      [theme.breakpoints.values.lg]: {
        items: 4,
      },
    },
    slideBy: 'page',
  }

  const variableWidthStyles = {
    [theme.breakpoints.up('md')]: {
      maxWidth: '69rem',
    },
  }

  useEffect(() => {
    if (sliderRef.current) {
      setApi(sliderRef.current)
      setSliderState(sliderRef.current.slider.getInfo())
    }
  }, [])

  useEffect(() => {
    if (sliderState) {
      const lastPage = Math.ceil(sliderState.slideCountNew / sliderState.slideBy) - 1
      const currentPage = Math.ceil(sliderState.index / sliderState.slideBy)
      setIsFirst(currentPage === 0)
      setIsLast(currentPage === lastPage)
    }
  }, [sliderState])

  function goTo(direction) {
    if (api) {
      api.slider.goTo(direction)
    } else {
      console.error('Carousel api not available')
    }
  }

  useEffect(() => {
    setSlidesPerPage(slidesPerPagPerBreakpoint[currentBreakpoint.key])
  }, [currentBreakpoint])

  useEffect(() => {
    setShowNavigation(slides.length > slidesPerPage)
  }, [slidesPerPage, slides])

  return (
    <div>
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
          <Grid container direction={isSmall ? 'column' : 'row'}>
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
              <Grid container size="auto" spacing="10px" sx={{ ...(isSmall ? { justifyContent: 'flex-end' } : { alignItems: 'flex-end', pl: 4 }) }}>
                <IconButton color="primary" aria-label="précédent" sx={{ fontSize: 50 }} onClick={() => goTo('prev')} disabled={isFirst}>
                  <ArrowLeftCircleIcon fontSize={50} />
                </IconButton>
                <IconButton color="primary" aria-label="suivant" sx={{ fontSize: 50 }} edge="end" onClick={() => goTo('next')} disabled={isLast}>
                  <ArrowRightCircleIcon fontSize={50} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Div sx={{ minWidth: '100%' }}>
          <TinySlider ref={sliderRef} settings={settings} onIndexChanged={setSliderState}>
            {Children.toArray(children).map((child, index) => {
              return <SliderItem key={index}>{child}</SliderItem>
            })}
          </TinySlider>
        </Div>
        {moreLink && moreText && (
          <Grid size={12}>
            <Button primary href={moreLink}>
              {moreText}
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

function SliderItem({ children, ...props }) {
  return (
    <Div xs={{ display: 'flex', flexShrink: 0 }} {...props}>
      {children}
    </Div>
  )
}
