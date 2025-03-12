import { Children, useEffect, useState } from 'react'
import { IconButton, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Button from '@/components/Button'
import { Carousel, CarouselItem, CarouselLink } from '@/components/utils/Carousel3'
import Div from '@/components/utils/Div'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from './CustomIcons'
import { useBreakpoint } from '@/hooks/use-breakpoint'

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
export default function Carousel3({ title, description, moreText, moreLink = '#', ...rest }) {
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

  function onCarouselItemClick(event, item) {
    console.log('onCarouselItemClick', event, item)
  }

  return (
    <>
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
                <CarouselLink aria-label="précédent" to="page-7">
                  <ArrowLeftCircleIcon fontSize={50} />
                </CarouselLink>
                <CarouselLink aria-label="suivant" edge="end">
                  <ArrowRightCircleIcon fontSize={50} />
                </CarouselLink>
              </Grid>
            )}
          </Grid>
        </Grid>
        <div style={{ outline: '1px solid red', overflow: 'hidden' }}>
          <Carousel>
            {/* {Children.toArray(children).map((child, index) => {
              return (
                <CarouselItem name={`page-${index}`} key={index} index={index} onClick={onCarouselItemClick}>
                  {child}
                </CarouselItem>
              )
            })} */}
            {children}
          </Carousel>
        </div>
        {moreLink && moreText && (
          <Grid size={12}>
            <Button primary href={moreLink}>
              {moreText}
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  )
}
