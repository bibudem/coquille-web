import { useEffect, useState } from 'react'
// import { navigate } from 'gatsby'
import { useTheme } from '@mui/material'
import AccordionsContext from '@/components/AccordionsContext'

/**
 * Composant AccordionGroup qui gère l'état et le contexte pour un groupe d'accordéons.
 *
 * @param {Object} props - Propriétés du composant
 * @param {('bleuPrincipal'|'rose')} [props.color='bleuPrincipal'] - Thème de couleur pour le groupe d'accordéons. Valeurs possibles: 'bleuPrincipal' ou 'rose'
 * @param {React.ReactNode} props.children - Composants enfants à rendre dans le groupe d'accordéons
 * @returns {React.ReactElement} Groupe d'accordéons avec fournisseur de contexte
 */
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

  return (
    <div>
      <AccordionsContext.Provider value={{ expanded, setExpanded, handleChange, currentColor, setCurrentColor }}>{children}</AccordionsContext.Provider>
    </div>
  )
}
