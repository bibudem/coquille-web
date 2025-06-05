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
  lg: 3,
  xl: 3,
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
    loop: false,        // <-- 
    skipSnaps: true,
    slidesToScroll: 1,
  })
  const [ref, api] = useEmblaCarousel(options)
  const { prevBtnProps, nextBtnProps } = useCarousel(api)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  useEffect(() => {
    setSlides(Children.toArray(children))
  }, [children])

  const variableWidthStyles = {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    },
}

  useEffect(() => {
  setOptions((prev) => ({
    ...prev,
    slidesToScroll: slidesPerPagPerBreakpoint[currentBreakpoint.key] || 1,
  }))
}, [currentBreakpoint])

  useEffect(() => {
    const slidesPerPage = options.slidesToScroll
    if (slides && typeof slidesPerPage === 'number') {
      setShowNavigation(slides.length > slidesPerPage)
    }
  }, [options, slides])

// <-- Activer pour le défilement automatique.
  /*useEffect(() => {
  if (!api) return
  const interval = setInterval(() => {
    if (api.canScrollNext()) {
      api.scrollNext()
    } else {
      api.scrollTo(0) // revenir au début
    }
  }, 4000) // toutes les 4 secondes


  return () => clearInterval(interval)
}, [api])*/

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    setScrollSnaps(api.scrollSnapList())
    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div>
      <Grid container spacing="45px">
        <Grid size={12}>
            {typeof title === 'string' ? <Typography component="h2" variant="h2Carousel">{title}</Typography> : title}
          <Grid container direction={isSmall ? 'column' : 'row'}>
            <Grid
              size="grow"
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
      {scrollSnaps.length > 1 && (
        <Div
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
            gap: 1,
          }}
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
              style={{
                width: 20,
                height: 5,
                borderRadius: '16px',
                backgroundColor:
                index === selectedIndex
                  ? theme.palette.grey[700] 
                  : theme.palette.grey[400], 
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </Div>
      )}
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
