import { Box, Container } from '@mui/material'
import LayoutContainer from '@/components/utils/LayoutContainer'

export default function RetroactionUsager() {
  return (
    <Box
      component="aside"
      sx={{
        my: 4,
      }}
    >
      <Box
        sx={(theme) => ({
          padding: 2,
          bgcolor: 'grey.100',
          borderRadius: theme.shape.corner['extra-small'],
        })}
      >
        <bib-retroaction-usager
          style={{
            '--bib-comp-retroaction-usager-title-weight': 600,
            '--md-sys-typescale-label-large-size': '.875em',
          }}
        />
      </Box>
    </Box>
  )
}
