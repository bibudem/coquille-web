import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  )
}
