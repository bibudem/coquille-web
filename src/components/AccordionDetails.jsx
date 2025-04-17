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
        padding: '20px',
        [theme.breakpoints.up('md')]: {
          padding: '3.125rem',
        },
        borderRadius: `0 0 ${theme.shape.corner.small} ${theme.shape.corner.small}`,
      })}
      {...props}
    />
  )
}
