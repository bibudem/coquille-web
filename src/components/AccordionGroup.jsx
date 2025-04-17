import { useEffect, useState } from 'react'
// import { navigate } from 'gatsby'
import { useTheme } from '@mui/material'
import AccordionsContext from '@/components/AccordionsContext'

export default function AccordionGroup({ color = 'bleuPrincipal', children, ...props }) {
  const [expanded, setExpanded] = useState(false)
  const [currentColor, setCurrentColor] = useState(null)
  const theme = useTheme()

  const colors = {
    bleuPrincipal: {
      backgroundColor: theme.palette.bleu100.main,
      color: theme.palette.bleuPrincipal.main,
    },
    rose: {
      backgroundColor: '#fcf3f1',
      color: '#b72600',
    },
  }

  function handleChange(accordionId) {
    return function handleChange(event, isExpanded) {
      setExpanded(isExpanded ? accordionId : false)
    }
  }

  useEffect(() => {
    if (color) {
      if (!Reflect.has(colors, color)) {
        throw new Error(`The color ${color} is not supported.`)
      }

      setCurrentColor(colors[color])
    } else {
      setCurrentColor(colors.default)
    }
  }, [color])

  // useEffect(() => {
  //   console.log('================================================ onchange', expanded)
  //   if (expanded) {
  //     navigate(`#${expanded}`, { replace: true })
  //   }
  // }, [expanded])

  return <AccordionsContext.Provider value={{ expanded, setExpanded, handleChange, currentColor, setCurrentColor }}>{children}</AccordionsContext.Provider>
}
