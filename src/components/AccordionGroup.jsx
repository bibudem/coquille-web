import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import AccordionContext from '@/components/AccordionContext'

export default function AccordionGroup({ color, children, ...props }) {
  const [expanded, setExpanded] = useState(false)
  const [currentColor, setCurrentColor] = useState(null)
  const theme = useTheme()

  const colors = {
    default: {
      background: 'transparent',
      color: 'inherit',
    },
    bleuPrincipal: {
      background: theme.palette.bleu100.main,
      color: theme.palette.bleuPrincipal.main,
    },
    rose: {
      background: '#fcf3f1',
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

  return <AccordionContext.Provider value={{ expanded, setExpanded, handleChange, currentColor, setCurrentColor }}>{children}</AccordionContext.Provider>
}
