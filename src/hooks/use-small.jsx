import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

export function useSmall(breakpoint = 'sm') {
  const theme = useTheme()

  return useMediaQuery(theme.breakpoints.down(breakpoint))
}
