import { useContext, useMemo, useState } from 'react'
import Div from '@/components/utils/Div'
import { HoraireBibContext } from './HoraireBibContext'
import { useTheme } from '@mui/material'

function TableHeaderCell({ sx, children }) {
  return (
    <Div
      sx={{
        padding: '10px 12px',
        fontWeight: 600,
        letterSpacing: '.32px',
        backgroundColor: 'bleu100.main',
        ...sx,
      }}
    >
      {children}
    </Div>
  )
}

function TableCell({ sx, children }) {
  return (
    <Div
      sx={{
        padding: '10px 12px',
        ...sx,
      }}
    >
      {children}
    </Div>
  )
}

function TableHeader({ data }) {
  const theme = useTheme()
  return (
    <>
      <TableHeaderCell sx={{ borderRadius: `${theme.shape.corner.small} 0 0 0` }}></TableHeaderCell>
      {data.map((item, i) => (
        <TableHeaderCell
          sx={(theme) => ({
            backgroundColor: 'bleu100.main',
            ...(i === 6 && { borderRadius: `0 ${theme.shape.corner.small} 0 0` }),
          })}
        >
          {item}
        </TableHeaderCell>
      ))}
    </>
  )
}

export default function BlocHoraire({ codeBib }) {
  const { daysOfWeekHeaders, horaires } = useContext(HoraireBibContext)

  return (
    <Div
      sx={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
        gridTemplateAreas: '"horaire horaire horaire horaire horaire horaire horaire"',
      }}
    >
      <TableHeader data={daysOfWeekHeaders} />
      {Array(8)
        .fill(1)
        .map((_, i) => {
          return <TableCell key={i}>{i}</TableCell>
        })}
    </Div>
  )
}
