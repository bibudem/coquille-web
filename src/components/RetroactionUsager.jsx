import { Box } from '@mui/material'

export default function RetroactionUsager() {
  return (
    <Box
      component="aside"
      sx={{
        '--md-sys-typescale-label-large-size': '.875em',
        '--bib-comp-retroaction-usager-title-weight': 600,
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
        <bib-retroaction-usager />
      </Box>
    </Box>
  )
}
