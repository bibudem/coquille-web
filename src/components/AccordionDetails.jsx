import { useContext, useEffect, useId, useState } from 'react'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import AccordionContext from '@/components/AccordionContext'

export default function AccordionDetails({ sx, ...props }) {
  const { expanded, setExpanded, handleChange, currentColor } = useContext(AccordionContext)

  return (
    <MuiAccordionDetails
      sx={(theme) => ({
        ...sx,
        backgroundColor: currentColor?.background,
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

// const AccordionDetails = styled((props) => <MuiAccordionDetails {...props} />)(({ theme }) => ({
//   backgroundColor: theme.palette.bleu100.main,
//   padding: '20px',
//   [theme.breakpoints.up('md')]: {
//     padding: '3.125rem',
//   },
//   borderRadius: `0 0 ${theme.shape.corner.small} ${theme.shape.corner.small}`,
// }))

// export default AccordionDetails
