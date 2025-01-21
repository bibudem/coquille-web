import { useMediaQuery, useTheme } from '@mui/material'

export function useSmall(breakpoint = 'sm') {
  const theme = useTheme()

  return useMediaQuery(theme.breakpoints.down(breakpoint))
}
