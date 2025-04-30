import { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import Div from '@/components/utils/Div'
import { HoraireBibContext } from './HoraireBibContext'
import { Hour } from './Microformat'
import { useSmall } from '@/hooks/use-small'

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
        [theme.breakpoints.down('md')]: {
          wordSpacing: '99rem',
          textAlign: 'center',
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
  return (
    <>
      <TableHeaderCell sx={(theme) => ({ borderRadius: `${theme.shape.corner.small} 0 0 0` })}></TableHeaderCell>
      {data &&
        data.map((item, i) => (
          <TableHeaderCell
            sx={{
              backgroundColor: 'bleu100.main',
              textTransform: 'capitalize',
            }}
          >
            {item}
          </TableHeaderCell>
        ))}
    </>
  )
}

function Title({ children }) {
  return <Div sx={{}}>{children}</Div>
}

export default function BlocHoraireNarrow({ codeBib }) {
  const { daysOfWeekHeaders, horaires, services } = useContext(HoraireBibContext)
  const [data, setData] = useState()

  useEffect(() => {
    if (horaires && services) {
      const sortedServices = Object.values(services).sort((service1, service2) => service1.order - service2.order)
      console.log('horaires[codeBib]:', horaires[codeBib])
      console.log('services:', services)
      console.log('sortedServices:', sortedServices)
      console.log('daysOfWeekheaders:', daysOfWeekHeaders)
      const blocs = {}
      const rows = []
      horaires[codeBib].forEach((horaire, i) => {
        const key = horaire.service
        if (!Reflect.has(blocs, key)) {
          blocs[key] = []
        }

        blocs[key].push(horaire)
      })

      sortedServices.forEach(({ key, label }) => {
        if (blocs[key]) {
          rows.push(<Div>{label}</Div>)
          console.log('blocs[key]:', blocs[key])

          rows.push(
            <table>
              {blocs[key].map((horaire, i) => {
                rows.push(
                  <tr>
                    <th>{daysOfWeekHeaders[i]}</th>
                    <td>
                      <Hour event={horaire} />
                    </td>
                  </tr>
                )
              })}
            </table>
          )
        }
      })

      setData(rows)
    }
  }, [horaires, services])

  return (
    <Div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {data}
    </Div>
  )
}
