import { useMediaQuery, useTheme } from '@mui/material'

export function useSmall(mediaQuery) {
  const theme = useTheme()

  return useMediaQuery(mediaQuery || theme.breakpoints.down('sm'))
}
