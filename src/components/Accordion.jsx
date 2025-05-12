import { useContext, useEffect, useId } from 'react'
import { styled } from '@mui/material'
import MuiAccordion from '@mui/material/Accordion'
import AccordionsContext from '@/components/AccordionsContext'

function BibAccordion({ defaultExpanded, ...props }) {
  const { expanded, setExpanded, handleChange, currentColor, setCurrentColor } = useContext(AccordionsContext)
  const tabId = useId()

  useEffect(() => {
    if (defaultExpanded) {
      setExpanded(tabId)
    }
  }, [])

  return <MuiAccordion defaultExpanded={defaultExpanded} expanded={expanded === tabId} onChange={handleChange(tabId)} disableGutters elevation={0} square {...props} />
}

export default styled(BibAccordion)(({ theme }) => ({
  '&::before': {
    display: 'none',
  },
}))
