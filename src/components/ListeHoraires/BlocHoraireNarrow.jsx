import { useContext, useEffect, useState, useMemo } from 'react'
import { styled } from '@mui/material'
import { format } from 'date-fns'
import LayoutTable from '@/components/utils/LayoutTable'
import Div from '@/components/utils/Div'
import HoraireNonDisponible from './HoraireNonDisponible'
import { HoraireBibContext } from './HoraireBibContext'

export default function BlocHoraireNarrow({ codeBib }) {
  const { daysOfWeekHeaders, horaires, services, sortedServices, isLoading, isReady, error } = useContext(HoraireBibContext)
  const [data, setData] = useState(null)

  const todayString = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

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
          
          daysOfWeekHeaders.days.forEach((day, i) => {
            const isActive = day.isoFormated === todayString
            const sommaire = serviceHoraires[i]?.sommaire ?? '-'
            
            serviceRow.push(
              <Tr 
                key={`${key}-${day.isoFormated}`}
                sx={isActive ? { 
                  backgroundColor: 'bleu200.main',
                  fontWeight: 600
                } : {}}
              >
                <Th>
                  <time dateTime={day.isoFormated}>{day.formated}</time>
                </Th>
                <Td>
                  <Span>{sommaire}</Span>
                </Td>
              </Tr>
            )
          })

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
  }, [horaires, services, sortedServices, daysOfWeekHeaders, todayString])

  useEffect(() => {
    if (error) {
      console.error('[Horaire Error]', error)
    }
  }, [error])

  return (
    <Div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {isLoading ? (
        <Div>Chargement en cours...</Div>
      ) : (
        data
      )}
    </Div>
  )
}

const Title = styled(Div)(({ theme }) => ({
  padding: '.5em 8px .5em 0',
  fontSize: '1.1em',
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.bleu200.dark}`,
}))

const Td = styled(LayoutTable.Td)({
  padding: '.35em .5em',
  width: '66.6667%',
})

const Th = styled(LayoutTable.Th)(({ theme }) => ({
  padding: '.35em .5em',
  width: '33.3333%',
  fontWeight: 'normal',
  fontVariant: 'small-caps',
  fontVariantCaps: 'all-small-caps',
  color: theme.palette.text.primary,
}))

const Tr = styled(LayoutTable.Tr)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.bleu200.dark}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}))

const Span = styled('span')(({ theme }) => ({
  display: 'inline-block',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '11ch',
  },
}))