import { useContext, useEffect, useState } from 'react'
import Div from '@/components/utils/Div'
import HoraireNonDisponible from './HoraireNonDisponible'
import { HoraireBibContext } from './HoraireBibContext'

const activeDayStyles = {
  fontWeight: 600,
  backgroundColor: 'bleu200.main',
}

function key() {
  return [...arguments].join('::')
}

function TableHeaderCell({ isActive = false, sx, children, ...props }) {
  return (
    <Div
      {...props}
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

function TableCell({ isActive = false, sx, children, ...props }) {
  return (
    <Div
      {...props}
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
  const { daysOfWeekHeaders, horaires, services, sortedServices } = useContext(HoraireBibContext)
  const [data, setData] = useState(null)
  const [headers, setHeaders] = useState(null)

  useEffect(() => {
    if (daysOfWeekHeaders && horaires && services && sortedServices) {
      const rows = []
      const todayIndex = daysOfWeekHeaders.days.findIndex((day) => day.isActive)
      const currentHoraires = horaires[codeBib]

      if (currentHoraires && currentHoraires.isNotAvailable) {
        const { key: serviceKey, label: serviceLabel } = sortedServices[0]
        setData([
          <TableRowHeader key={key(codeBib, serviceKey)}>{serviceLabel}</TableRowHeader>,
          <Div
            key="is-not-available"
            sx={{
              gridColumnStart: 2,
              gridColumnEnd: 9,
            }}
          >
            <HoraireNonDisponible />
          </Div>,
        ])
        return
      }

      sortedServices.forEach(({ key: serviceKey, label: serviceLabel }) => {
        if (currentHoraires && Reflect.has(currentHoraires, serviceKey)) {
          const serviceHoraires = currentHoraires[serviceKey]
          for (let i = 0; i <= 6; i++) {
            const currentHeaderIndex = i % 7
            const sommaire = serviceHoraires[i]?.sommaire ?? '-'
            if (currentHeaderIndex === 0) {
              rows.push(<TableRowHeader key={key(codeBib, serviceKey)}>{serviceLabel}</TableRowHeader>)
            }
            rows.push(
              <TableCell key={key(codeBib, serviceKey, i)} isActive={todayIndex === currentHeaderIndex}>
                {sommaire}
              </TableCell>
            )
          }
        }
      })

      setData(rows)
    }
  }, [horaires, services, daysOfWeekHeaders, sortedServices])

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
        gridAutoRows: 'min-content',
        fontSize: '0.8889rem', // 16px
      }}
    >
      <TableHeader headers={headers} />
      {data}
    </Div>
  )
}
