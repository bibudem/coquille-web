import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { IconButton, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import useEmblaCarousel from 'embla-carousel-react'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@/components/CustomIcons'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import useCarousel from './useCarousel'
import * as styles from './Carousel1.module.css'

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
export default function Carousel1({ title, description, moreText, moreLink, ...rest }) {
  const { sx, children, ...props } = rest
  const currentBreakpoint = useBreakpoint()
  const [slides, setSlides] = useState(null)
  const [showNavigation, setShowNavigation] = useState(true)
  const theme = useTheme()
  const isSmall = useSmall()
  const [options, setOptions] = useState({
    align: 'start',
    dragFree: false,
    loop: false,
    skipSnaps: true,
    slidesToScroll: 1,
  })
  const [ref, api] = useEmblaCarousel(options)
  const { prevBtnProps, nextBtnProps } = useCarousel(api)

  useEffect(() => {
    setSlides(Children.toArray(children))
  }, [children])

  const variableWidthStyles = {
    [theme.breakpoints.up('md')]: {
      maxWidth: '69rem',
    },
  }

  useEffect(() => {
    setOptions({
      ...options,
      slidesToScroll: slidesPerPagPerBreakpoint[currentBreakpoint.key],
    })
  }, [currentBreakpoint])

  useEffect(() => {
    const slidesPerPage = options.slidesToScroll
    if (slides && typeof slidesPerPage === 'number') {
      setShowNavigation(slides.length > slidesPerPage)
    }
  }, [options, slides])

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
              <Grid container size="auto" spacing="10px" sx={{ ...(isSmall ? { justifyContent: 'flex-end', mt: '10px' } : { alignItems: 'flex-end', pl: 4 }) }}>
                <IconButton color="primary" aria-label="précédent" sx={{ fontSize: 50 }} {...prevBtnProps()}>
                  <ArrowLeftCircleIcon fontSize={50} />
                </IconButton>
                <IconButton color="primary" aria-label="suivant" sx={{ fontSize: 50 }} edge="end" {...nextBtnProps()}>
                  <ArrowRightCircleIcon fontSize={50} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Div sx={{ minWidth: '100%' }}>
          <div className={styles.embla} ref={ref} {...props}>
            <div className={styles.embla__container}>
              {Children.toArray(children).map((child, index) => {
                return <SliderItem key={index}>{child}</SliderItem>
              })}
            </div>
          </div>
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
