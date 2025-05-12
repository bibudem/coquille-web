import { useContext, useEffect, useId, useState } from 'react'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionContext from '@mui/material/Accordion/AccordionContext'
import { Minus, Plus } from '@phosphor-icons/react'
import AccordionsContext from '@/components/AccordionsContext'
import Div from '@/components/utils/Div'

export default function AccordionSummary({ id, ['aria-controls']: ariaControls, sx, ...props }) {
  const randId = useId()
  const { currentColor } = useContext(AccordionsContext)
  const accordionContext = useContext(MuiAccordionContext)
  const [colorData, setColorData] = useState({})
  props.id = id || `panel-${randId}-header`
  props['aria-controls'] = ariaControls || `panel-${randId}-content`

  useEffect(() => {
    if (currentColor) {
      setColorData({
        ...currentColor,
      })
    }
  }, [currentColor])

  return (
    <MuiAccordionSummary
      expandIcon={
        <Div
          sx={(theme) => ({
            height: 35,
            width: 35,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: accordionContext.expanded ? 0 : 1,
              transition: `opacity ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
              backgroundColor: colorData.backgroundColor,
              borderRadius: theme.shape.corner.full,
              zIndex: -1,
            },
          })}
        >
          {accordionContext.expanded ? <Minus size={17.5} color={colorData.color} /> : <Plus size={17.5} color={colorData.color} />}
        </Div>
      }
      {...props}
      sx={(theme) => ({
        ...sx,
        // border: 'unset',
        ...(colorData && {
          borderBottom: `1px solid ${colorData.color}`,
          '&.Mui-expanded': {
            color: colorData.color,
          },
        }),
      })}
    />
  )
}
