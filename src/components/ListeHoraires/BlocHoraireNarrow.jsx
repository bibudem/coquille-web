import { useContext, useEffect, useState } from 'react'
import Div from '@/components/utils/Div'
import LayoutTable from '@/components/utils/LayoutTable'
import { HoraireBibContext } from './HoraireBibContext'
import { styled } from '@mui/material'

export default function BlocHoraireNarrow({ codeBib }) {
  const { daysOfWeekHeaders, horaires, services } = useContext(HoraireBibContext)
  const [data, setData] = useState()

  useEffect(() => {
    if (horaires && services) {
      const sortedServices = Object.values(services).sort((service1, service2) => service1.order - service2.order)
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
          rows.push(
            <Div key={key}>
              <Title>{label}</Title>

              <LayoutTable sx={{ width: '100%' }}>
                <tbody>
                  {blocs[key].map((horaire, i) => {
                    const { isoFormated, isActive, formated } = daysOfWeekHeaders.days[i]
                    const { sommaire } = horaire
                    return (
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
                  })}
                </tbody>
              </LayoutTable>
            </Div>
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
