import { Children } from 'react'
import { Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from './CustomIcons'

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
  const theme = useTheme()

  const variableWidthStyles = {
    [theme.breakpoints.up('md')]: {
      maxWidth: '69rem',
    },
  }

  return (
    <Grid container spacing="45px">
      <Grid size={12}>
      <Div sx={{
        pb: 4,
        ...variableWidthStyles,
        '.MuiTypography-root': {
            fontSize: '2.25rem!important',
            fontWeight: 400,
            lineHeight: 1
          }
        }}
        >
          {
            typeof title === 'string' ? (
              <Typography
                component="h2"
              >
                {title}
              </Typography>
            ) : (
              title
            )
          }
        </Div>
        <Grid container>
          <Grid 
            size="grow"
            sx={{
              '.MuiTypography-root': {
                fontSize: '1.25rem!important',
                ...variableWidthStyles,
              }
            }}
          >
            <Div sx={variableWidthStyles}>
              {typeof description === 'string' ? (    
                <Typography
                  variant="body1"
                  component="div"
                >
                  {description}
                </Typography>
                ) : (
                description
                )}
              </Div>
          </Grid>
          <Grid container size="auto" spacing="10px" sx={{ alignItems: 'flex-end', pl: 4 }}>
            <ArrowLeftCircleIcon fontSize={50} color="#0057ac" />
            <ArrowRightCircleIcon fontSize={50} color="#0057ac" />
          </Grid>
        </Grid>
      </Grid>
      <Grid container size={12} spacing="10px">
        {Children.toArray(children).map((child, index) => {
          return (
            <Grid key={index} size="auto">
              {child}
            </Grid>
          )
        })}
      </Grid>
      {moreLink && moreText && (
        <Grid size={12}>
          <Button primary href={moreLink}>
            {moreText}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
