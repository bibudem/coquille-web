import { Children, useEffect, useState, useCallback } from 'react'
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
  sm: 1,
  md: 2,
  lg: 3,
  xl: 3,
}

export default function Carousel1({ title, description, moreText, moreLink, ...rest }) {
  const { sx, children, ...props } = rest
  const currentBreakpoint = useBreakpoint()
  const [slides, setSlides] = useState([])
  const [showNavigation, setShowNavigation] = useState(true)
  const theme = useTheme()
  const isSmall = useSmall()
  const [options, setOptions] = useState({
    align: isSmall ? 'start' : 'center', // Modifié pour mieux gérer l'alignement
    dragFree: false,
    loop: false,
    skipSnaps: false,
    slidesToScroll: 1,
  })
  const [ref, api] = useEmblaCarousel(options)
  const { prevBtnProps, nextBtnProps } = useCarousel(api)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  useEffect(() => {
    setSlides(Children.toArray(children))
  }, [children])

  useEffect(() => {
    const slidesToScroll = slidesPerPagPerBreakpoint[currentBreakpoint.key] || 1
    setOptions((prev) => ({
      ...prev,
      slidesToScroll,
      align: currentBreakpoint.key === 'xs' || currentBreakpoint.key === 'sm' ? 'start' : 'center', // Ajustement dynamique
    }))
  }, [currentBreakpoint])

  useEffect(() => {
    const slidesPerPage = options.slidesToScroll
    setShowNavigation(slides.length > slidesPerPage)
  }, [options.slidesToScroll, slides.length])

  // Réinitialisation plus robuste avec vérification de la taille
  useEffect(() => {
    if (!api) return
    
    const handleResize = () => {
      api.reInit()
    }
    
    // Ajout d'un délai pour s'assurer que le DOM est mis à jour
    const timer = setTimeout(() => {
      api.reInit()
    }, 100)
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [api, currentBreakpoint])

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    const updateScrollSnaps = () => {
      const snaps = api.scrollSnapList()
      setScrollSnaps(snaps)
    }

    api.on('select', onSelect)
    api.on('reInit', updateScrollSnaps)
    api.on('resize', updateScrollSnaps)
    updateScrollSnaps()
    onSelect()

    return () => {
      api.off('select', onSelect)
      api.off('reInit', updateScrollSnaps)
      api.off('resize', updateScrollSnaps)
    }
  }, [api])

  // Support horizontal navigation with mouse wheel / trackpad gestures.
  useEffect(() => {
    if (!api) return

    const root = api.rootNode()
    if (!root) return

    let wheelAccum = 0
    let resetTimer = null
    const threshold = 24
    const reset = () => {
      wheelAccum = 0
      if (resetTimer) {
        clearTimeout(resetTimer)
        resetTimer = null
      }
    }

    const onWheel = (event) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY

      if (!delta) return

      wheelAccum += delta
      if (!resetTimer) {
        resetTimer = setTimeout(reset, 200)
      }

      if (Math.abs(wheelAccum) < threshold) return

      const direction = wheelAccum > 0 ? 1 : -1
      reset()

      const canScroll = direction > 0 ? api.canScrollNext() : api.canScrollPrev()
      if (!canScroll) return

      event.preventDefault()
      if (direction > 0) {
        api.scrollNext()
      } else {
        api.scrollPrev()
      }
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      reset()
      root.removeEventListener('wheel', onWheel)
    }
  }, [api])

  const scrollTo = useCallback((index) => api && api.scrollTo(index), [api])

  const variableWidthStyles = {
    [theme.breakpoints.down('sm')]: { width: '100%' },
    [theme.breakpoints.up('md')]: { maxWidth: '100%' },
  }

  return (
    <div>
      <Grid container spacing="45px">
        <Grid size={12}>
          {typeof title === 'string'
            ? <Typography component="h2" variant="h2">{title}</Typography>
            : title}
          <Grid container direction={isSmall ? 'column' : 'row'}>
            <Grid size="grow">
              <Div sx={variableWidthStyles}>
                {typeof description === 'string'
                  ? <Typography variant="body1" component="div">{description}</Typography>
                  : description}
              </Div>
            </Grid>
            {showNavigation && (
              <Grid container size="auto" spacing="10px" sx={{
                ...(isSmall
                  ? { justifyContent: 'flex-end', mt: '10px' }
                  : { alignItems: 'flex-end', pl: 4 }),
              }}>
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
        <Div sx={{ 
          minWidth: '100%',
          overflow: 'hidden', 
        }}>
          <div className={styles.embla} ref={ref} {...props}>
            <div className={styles.embla__container}>
              {slides.map((child, index) => (
                <SliderItem key={index} isSmall={isSmall}>
                  {child}
                </SliderItem>
              ))}
            </div>
          </div>
        </Div>
        {moreLink && moreText && (
          <Grid size={12}>
            <Button primary href={moreLink}>{moreText}</Button>
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
              onClick={() => scrollTo(index)}
              aria-label={`Aller à la page ${index + 1}`}
              style={{
                width: index === selectedIndex ? 24 : 20,
                height: 5,
                borderRadius: '16px',
                backgroundColor: index === selectedIndex
                  ? theme.palette.grey[700]
                  : theme.palette.grey[400],
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: index === selectedIndex ? 1 : 0.6,
              }}
            />
          ))}
        </Div>
      )}
    </div>
  )
}

function SliderItem({ children, isSmall, ...props }) {
  return (
    <Div 
      sx={{ 
        display: 'flex', 
        flexShrink: 0,
        // Ajustement des marges pour les grandes tailles
        marginRight: isSmall ? 0 : '15px',
        '&:last-child': {
          marginRight: 0
        }
      }} 
      {...props}
    >
      {children}
    </Div>
  )
}
