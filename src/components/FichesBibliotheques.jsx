import { Typography } from '@mui/material'
import GridOffset from '@/components/utils/GridOffset'
import Div from '@/components/utils/Div'
import { FichesBibliothequesContext } from './FicheBibliotheque/FichesBibliothequesContext'
import { useState } from 'react'

function Header1({ Icon, children }) {
  return (
    <Div
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        marginBottom: '16px',
      })}
    >
      <Icon size={24} color="currentColor" />
      <Typography
        component="h4"
        sx={{
          fontSize: '1.6667rem',
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {children}
      </Typography>
    </Div>
  )
}

export default function FichesBibliotheques({ title, ...rest }) {
  const { children, ...props } = rest
  const [expanded, setExpanded] = useState(false)

  return (
    <GridOffset offset={1}>
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
