import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import GridOffset from '@/components/utils/GridOffset'
import Div from '@/components/utils/Div'
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
      <Div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <FichesBibliothequesContext.Provider value={expanded}>{children}</FichesBibliothequesContext.Provider>
      </Div>
    </GridOffset>
  )
}
