import { useMemo } from 'react'
import { styled } from '@mui/material'
import useSWR from 'swr'
import { ArrowRight, ClockCountdown } from '@phosphor-icons/react'
import Link from '@/components/Link'
import Bloc from './Bloc'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Dt = styled('dt')({
  fontFamily: 'Lora',
  fontSize: '1rem',
  fontWeight: 600,
  lineHeight: 1.6,
})

const Dd = styled('dd')({
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.6,
  paddingBottom: '.5rem',
})

export default function HoraireAujourdhui({ codeBib }) {
  const { data: services } = useSWR('https://api.bib.umontreal.ca/horaires/services', fetcher)
  const { data, error } = useSWR('https://api.bib.umontreal.ca/horaires/?fin=P1D', fetcher)

  if (error) {
    console.error(error)
    return
  }

  const evenements = useMemo(() => {
    if (data && services) {
      return data?.evenements
        .filter(({ bibliotheque }) => bibliotheque === codeBib)
        .map(({ service, sommaire }) => ({
          service: services[service].label,
          sommaire,
        }))
    }

    return null
  }, [data, services])

  return (
    evenements && (
      <Bloc title="Horaire d'aujourd'hui" Icon={ClockCountdown}>
        <dl>
          {evenements.map(({ service, sommaire }) => (
            <>
              <Dt>{service}</Dt>
              <Dd>{sommaire}</Dd>
            </>
          ))}
        </dl>
        <div>
          <Link to="/horaires/" Icon>
            Tous les horaires
          </Link>
        </div>
      </Bloc>
    )
  )
}
