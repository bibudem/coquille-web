import { useContext, useEffect, useId, useState } from 'react'
import { SvgIcon } from '@mui/material'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import PlusIcon from '@/components/FicheBibliotheque/plus.svg'
import AccordionContext from '@/components/AccordionContext'

export default function AccordionSummary({ id, ['aria-controls']: ariaControls, sx, ...props }) {
  const randId = useId()
  const { currentColor } = useContext(AccordionContext)
  const [colorData, setColorData] = useState(null)
  props.id = id || `panel-${randId}-header`
  props['aria-controls'] = ariaControls || `panel-${randId}-content`

  useEffect(() => {
    if (currentColor) {
      setColorData(currentColor)
    }
  }, [currentColor])

  return (
    <MuiAccordionSummary
      expandIcon={<SvgIcon component={PlusIcon} color="currentColor" inheritViewBox />}
      {...props}
      sx={(theme) => ({
        ...sx,
        border: 'unset',
        paddingLeft: 0,
        paddingRight: 0,
        transition: `color ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
        '.MuiAccordionSummary-content': {
          fontSize: '1.2222rem',
          fontWeight: 700,
          lineHeight: 1.2,
        },
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
