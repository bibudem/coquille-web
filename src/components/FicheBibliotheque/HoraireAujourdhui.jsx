import { useMemo } from 'react'
import { styled } from '@mui/material'
import useSWR from 'swr'
import { ClockCountdown } from '@phosphor-icons/react'
import ConditionalWrap from 'conditional-wrap'
import Link from '@/components/Link'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'
import Bloc from './Bloc'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Dl = styled('dl')(({ theme }) => ({
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  // [theme.breakpoints.up('md')]: {
  //   fontWeight: 600,
  //   lineHeight: 1.2,
  // },
}))

const Dt = styled('dt')(({ theme }) => ({
  fontFamily: 'Lora',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.6,
  [theme.breakpoints.up('md')]: {
    fontWeight: 600,
    lineHeight: 1.2,
  },
}))

const Dd = styled('dd')(({ theme }) => ({
  color: theme.palette.bleuFonce.main,
  fontSize: '0.7778rem',
  fontWeight: 500,
  lineHeight: 1.5,
  paddingBottom: '.5rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
}))

export default function HoraireAujourdhui({ codeBib }) {
  const { data: services } = useSWR('https://api.bib.umontreal.ca/horaires/services', fetcher)
  const { data, error } = useSWR('https://api.bib.umontreal.ca/horaires/?fin=P1D', fetcher)
  const isSmall = useSmall('sm')

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
      <Bloc title="Aujourd'hui" Icon={ClockCountdown}>
        {evenements.map(({ service, sommaire }) => (
          <ConditionalWrap
            condition={isSmall}
            wrap={(children) => (
              <Div
                sx={{
                  display: 'flex',
                  gap: '1em',
                }}
              >
                <ClockCountdown size={26} color="var(--bib-palette-primary-main)" />
                {children}
              </Div>
            )}
          >
            <Dl>
              <Dt>{service}</Dt>
              <Dd>{sommaire}</Dd>
            </Dl>
          </ConditionalWrap>
        ))}
        <div>
          <Link to="/horaires/" Icon>
            Tous les horaires
          </Link>
        </div>
      </Bloc>
    )
  )
}
