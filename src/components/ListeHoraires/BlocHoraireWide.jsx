import { useContext, useEffect, useState } from 'react'
import Div from '@/components/utils/Div'
import { HoraireBibContext } from './HoraireBibContext'

const activeDayStyles = {
  fontWeight: 600,
  backgroundColor: 'bleu200.main',
}

function TableHeaderCell({ isActive = false, sx, children }) {
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
        [theme.breakpoints.down('md')]: {
          wordSpacing: '99rem',
          textAlign: 'center',
        },
        ...sx,
        ...(isActive && activeDayStyles),
      })}
    >
      {children}
    </Div>
  )
}

function TableRowHeader({ sx, children }) {
  return (
    <Div
      sx={(theme) => ({
        padding: '10px 12px',
        fontWeight: 600,
        lineHeight: 1.4,
        [theme.breakpoints.up('sm')]: {
          letterSpacing: '.32px',
        },
        ...sx,
      })}
    >
      {children}
    </Div>
  )
}

function TableCell({ isActive = false, sx, children }) {
  return (
    <Div
      sx={{
        padding: '10px 12px',
        lineHeight: 2,
        ...(isActive && activeDayStyles),
        ...sx,
      }}
    >
      {children}
    </Div>
  )
}

function TableHeader({ headers }) {
  return (
    <>
      <TableHeaderCell sx={(theme) => ({ borderRadius: `${theme.shape.corner.small} 0 0 0` })}></TableHeaderCell>
      {headers &&
        headers.map(({ formated, isoFormated, isActive }, i) => (
          <TableHeaderCell
            key={isoFormated}
            sx={{
              backgroundColor: 'bleu100.main',
            }}
            isActive={isActive}
          >
            {formated}
          </TableHeaderCell>
        ))}
    </>
  )
}

export default function BlocHoraireWide({ codeBib }) {
  const { daysOfWeekHeaders, horaires, services } = useContext(HoraireBibContext)
  const [data, setData] = useState(null)
  const [headers, setHeaders] = useState(null)

  useEffect(() => {
    if (horaires && services && daysOfWeekHeaders) {
      const rows = []
      const todayIndex = daysOfWeekHeaders.days.findIndex((day) => day.isActive)
      horaires[codeBib].forEach((horaire, i) => {
        const currentHeaderIndex = i % 7
        if (currentHeaderIndex === 0) {
          rows.push(<TableRowHeader>{services[horaire.service]?.label}</TableRowHeader>)
        }
        rows.push(<TableCell isActive={todayIndex === currentHeaderIndex}>{horaire.sommaire}</TableCell>)
      })

      setData(rows)
    }
  }, [horaires, services, daysOfWeekHeaders])

  useEffect(() => {
    if (daysOfWeekHeaders) {
      setHeaders(daysOfWeekHeaders.days)
    }
  }, [daysOfWeekHeaders])

  return (
    <Div
      sx={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: '1fr repeat(7, minmax(0, 1fr))',
        fontSize: '0.8889rem', // 16px
      }}
    >
      <TableHeader headers={headers} />
      {data}
    </Div>
  )
}
