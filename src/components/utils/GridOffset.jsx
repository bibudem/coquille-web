import Grid from '@mui/material/Grid2'
import { useEffect, useState } from 'react'

export default function GridOffset({ offset = 0, children, ...rest }) {
  if (isNaN(offset)) {
    throw new Error('The `offset` prop must be a number.')
  }

  const [size, setSize] = useState(offset)

  const { sx, ...props } = rest

  useEffect(() => {
    if (offset) {
      setSize(12 - parseFloat(offset) * 2)
    }
  }, [offset])

  return (
    <Grid container spacing={0}>
      <Grid container size={size} offset={offset} {...props}>
        {children}
      </Grid>
    </Grid>
  )
}
