import { useEffect, useState } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'

export function useBreakpoint() {
  const theme = useTheme()
  const [resolution, setResolution] = useState('')
  const queriesLength = theme.breakpoints.keys.length
  const queries = theme.breakpoints.keys.map((key, i) => {
    return {
      i,
      key,
      match: useMediaQuery(theme.breakpoints.only(key)),
      // range: `${theme.breakpoints.values[key]} - ${i + 1 === theme.breakpoints.keys.length ? '' : theme.breakpoints.values[theme.breakpoints.keys[i + 1]]}`,
      // color: cc.contrastColor({ bgColor: bg }),
      // bg,
    }
  })

  useEffect(() => {
    const newResolution = queries.find((query) => query.match)
    if (newResolution && resolution?.key !== newResolution.key) {
      setResolution(newResolution)
    }
  }, queries)

  return resolution
}
