import { Children, useEffect, useMemo, useState } from 'react'
import { IconButton, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import * as carousel from '@zag-js/carousel'
import { normalizeProps, useMachine } from '@zag-js/react'
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

let idCounter = 1

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
  const [showNavigation, setShowNavigation] = useState(true)
  const [slidesPerPage, setSlidesPerPage] = useState(4)
  const theme = useTheme()
  const isSmall = useSmall()
  const slides = Children.toArray(children)
  const id = useMemo(() => idCounter++, [])

  const service = useMachine(carousel.machine, { id, slideCount: slides.length, spacing: '10px', slidesPerPage: slidesPerPagPerBreakpoint[currentBreakpoint.key] })
  const { getRootProps, getControlProps, getPrevTriggerProps, getNextTriggerProps, getItemGroupProps, getItemProps } = carousel.connect(service, normalizeProps)

  const variableWidthStyles = {
    [theme.breakpoints.up('md')]: {
      maxWidth: '69rem',
    },
  }

  useEffect(() => {
    setSlidesPerPage(slidesPerPagPerBreakpoint[currentBreakpoint.key])
  }, [currentBreakpoint])

  useEffect(() => {
    setShowNavigation(slides.length > slidesPerPage)
  }, [slidesPerPage, slides])

  return (
    <div {...getRootProps()}>
      <Div sx={{ '--slide-item-size': 'calc(96% / var(--slides-per-page) - var(--slide-spacing) * (var(--slides-per-page) - 1) / var(--slides-per-page))' }}>
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
                <Grid container size="auto" spacing="10px" sx={{ ...(isSmall ? { justifyContent: 'flex-end' } : { alignItems: 'flex-end', pl: 4 }) }} {...getControlProps()}>
                  <IconButton color="primary" aria-label="précédent" sx={{ fontSize: 50 }} {...getPrevTriggerProps()}>
                    <ArrowLeftCircleIcon fontSize={50} />
                  </IconButton>
                  <IconButton color="primary" aria-label="suivant" sx={{ fontSize: 50 }} edge="end" {...getNextTriggerProps()}>
                    <ArrowRightCircleIcon fontSize={50} />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Div sx={{ minWidth: '100%' }} {...getItemGroupProps()}>
            {Children.toArray(children).map((child, index) => {
              return (
                <SnapSliderItem key={index} {...getItemProps({ index })}>
                  {child}
                </SnapSliderItem>
              )
            })}
          </Div>
          {moreLink && moreText && (
            <Grid size={12}>
              <Button primary href={moreLink}>
                {moreText}
              </Button>
            </Grid>
          )}
        </Grid>
      </Div>
    </div>
  )
}

function SnapSliderItem({ children, ...props }) {
  return (
    <Div xs={{ display: 'flex', flexShrink: 0 }} {...props}>
      {children}
    </Div>
  )
}
