import { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material'
import LayoutTable from '@/components/utils/LayoutTable'
import Div from '@/components/utils/Div'
import HoraireNonDisponible from './HoraireNonDisponible'
import { HoraireBibContext } from './HoraireBibContext'

export default function BlocHoraireNarrow({ codeBib }) {
  const { daysOfWeekHeaders, horaires, services, sortedServices, isLoading, isReady, error } = useContext(HoraireBibContext)
  const [data, setData] = useState()

  useEffect(() => {
    if (daysOfWeekHeaders && horaires && services && sortedServices) {
      const rows = []
      const currentHoraires = horaires[codeBib]

      if (currentHoraires.isNotAvailable) {
        setData(
          <Div>
            <Title>{services.regulier.label}</Title>
            <HoraireNonDisponible />
          </Div>
        )
        return
      }

      sortedServices.forEach(({ key, label }) => {
        const serviceHoraires = currentHoraires[key]
        if (serviceHoraires) {
          const serviceRow = []
          for (let i = 0; i <= 6; i++) {
            const sommaire = serviceHoraires[i]?.sommaire ?? '-'
            const { isoFormated, isActive, formated } = daysOfWeekHeaders.days[i]
            serviceRow.push(
              <Tr
                key={i}
                sx={{
                  ...(isActive && { backgroundColor: 'bleu100.main' }),
                }}
              >
                <Th>
                  <time dateTime={isoFormated}>{formated}</time>
                </Th>
                <Td>
                  <Span>{sommaire}</Span>
                </Td>
              </Tr>
            )
          }
          rows.push(
            <Div key={key}>
              <Title>{label}</Title>

              <LayoutTable sx={{ width: '100%' }}>
                <tbody>{serviceRow}</tbody>
              </LayoutTable>
            </Div>
          )
        }
      })

      setData(rows)
    }
  }, [horaires, services, sortedServices])

  useEffect(() => {
    console.log('[isLoading]', isLoading)
  }, [isLoading])

  useEffect(() => {
    console.log('[isReady]', isReady)
  }, [isReady])

  useEffect(() => {
    console.log('[error]', error)
  }, [error])

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

function Title({ children }) {
  return (
    <Div
      className="bib-comp-horaire--service-title"
      sx={(theme) => ({
        padding: '.5em 8px .5em 0',
        fontSize: '1.1em',
        borderBottom: `1px solid ${theme.palette.bleu200.dark}`,
      })}
    >
      {children}
    </Div>
  )
}

const Td = styled(LayoutTable.Td)({
  padding: '.35em .5em',
  width: '66.6667%',
})

const Th = styled(LayoutTable.Th)({
  padding: '.35em .5em',
  width: '33.3333%',
  fontWeight: 'normal',
  fontVariant: 'small-caps',
  fontVariantCaps: 'all-small-caps',
})

const Tr = styled(LayoutTable.Tr)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.bleu200.dark}`,
}))

const Span = styled('span')(({ theme }) => ({
  display: 'inline-block',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '11ch',
  },
}))
