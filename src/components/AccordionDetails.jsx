import { useContext } from 'react'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import AccordionsContext from '@/components/AccordionsContext'

export default function AccordionDetails({ sx, ...props }) {
  const { currentColor } = useContext(AccordionsContext)

  return (
    <MuiAccordionDetails
      sx={(theme) => ({
        ...sx,
        backgroundColor: currentColor?.backgroundColor,
      })}
      {...props}
    />
  )
}
