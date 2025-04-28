import { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import Div from '@/components/utils/Div'
import { HoraireBibContext } from './HoraireBibContext'

function TableHeaderCell({ sx, children }) {
  return (
    <Div
      sx={(theme) => ({
        padding: '10px 12px',
        fontWeight: 600,
        letterSpacing: '.32px',
        backgroundColor: 'bleu100.main',
        '&:nth-child(8)': {
          borderRadius: `0 ${theme.shape.corner.small} 0 0`,
        },
        ...sx,
      })}
    >
      {children}
    </Div>
  )
}

function TableRowHeader({ sx, children }) {
  return (
    <Div
      sx={{
        padding: '10px 12px',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '.32px',
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
        lineHeight: 2,
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
      {data &&
        data.map((item, i) => (
          <TableHeaderCell
            sx={{
              backgroundColor: 'bleu100.main',
            }}
          >
            {item}
          </TableHeaderCell>
        ))}
    </>
  )
}

export default function BlocHoraire({ codeBib }) {
  const { daysOfWeekHeaders, horaires, services } = useContext(HoraireBibContext)
  const [data, setData] = useState([])

  useEffect(() => {
    if (horaires) {
      const rows = []
      horaires[codeBib].forEach((horaire, i) => {
        if (i % 7 === 0) {
          rows.push(<TableRowHeader>{services[horaire.service]?.label}</TableRowHeader>)
        }
        rows.push(<TableCell>{horaire.sommaire}</TableCell>)
      })
      setData(rows)
    }
  }, [horaires])

  return (
    <Div
      sx={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
        fontSize: '0.8889rem', // 16px
      }}
    >
      <TableHeader data={daysOfWeekHeaders} />
      {data}
    </Div>
  )
}
