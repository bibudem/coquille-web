import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import GridOffset from '@/components/utils/GridOffset'
import { FichesBibliothequesContext } from './FicheBibliotheque/FichesBibliothequesContext'
import { useSmall } from '@/hooks/use-small'

export default function FichesBibliotheques({ title, ...rest }) {
  const { children, ...props } = rest
  const [expanded, setExpanded] = useState(false)
  const isSmall = useSmall('md')
  const [gridProps, setGridProps] = useState({})

  useEffect(() => {
    if (!isSmall) {
      setGridProps({
        offset: 1,
      })
    } else {
      setGridProps({
        offset: 0.25,
      })
    }
  }, [isSmall])

  return (
    <GridOffset {...gridProps}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FichesBibliothequesContext.Provider value={expanded}>{children}</FichesBibliothequesContext.Provider>
      </Box>
    </GridOffset>
  )
}
