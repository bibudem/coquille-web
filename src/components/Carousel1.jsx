import { Children } from 'react'
import { Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Button from '@/components/Button'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from './CustomIcons.jsx'

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
        <Typography
          variant="display5"
          component="h2"
          sx={{
            pb: 4,
            ...variableWidthStyles,
          }}
        >
          {title}
        </Typography>
        <Grid container>
          <Grid size="grow">
            <Typography
              variant="body1"
              sx={{
                pb: 2,
                ...variableWidthStyles,
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid container size="auto" spacing="10px" sx={{ alignItems: 'flex-end', pl: 4 }}>
            <ArrowLeftCircleIcon fontSize={50} color="#0057ac" />
            <ArrowRightCircleIcon fontSize={50} color="#0057ac" />
          </Grid>
        </Grid>
      </Grid>
      <Grid container size={12} spacing="10px">
        {Children.toArray(children).map((child, index) => (
          <Grid key={index} size="auto">
            {child}
          </Grid>
        ))}
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
