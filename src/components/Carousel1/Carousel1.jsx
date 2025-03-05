import { Children } from 'react'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Button from '@/components/Button'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '../CustomIcons.jsx'

export default function Carousel1({ title, description, moreText, moreLink = '#', ...rest }) {
  const { sx, children, ...props } = rest

  return (
    <Grid container spacing="45px">
      <Grid size={12}>
        <Typography variant="display5" component="div" sx={{ pb: 4 }}>
          {title}
        </Typography>
        <Grid container>
          <Grid size="grow">
            <Typography variant="body1" sx={{ pb: 2 }}>
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
          <Grid key={index} size={3}>
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
