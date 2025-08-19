import { useMemo } from 'react'
import { styled } from '@mui/material'
import useSWR from 'swr'
import { ClockCountdown } from '@phosphor-icons/react'
import Link from '@/components/Link'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import ConditionalWrapper from '@/components/utils/ConditionalWrapper'
import { useSmall } from '@/hooks/use-small'
import Bloc from './Bloc'
import { getBiblioByCode } from '@/utils/api-horraire-bibliotheques.js' 

const fetcher = (url) => fetch(url).then((r) => r.json())

const Dl = styled('dl')(() => ({
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}))

const Dt = styled('dt')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.1,
  [theme.breakpoints.up('md')]: {
    fontWeight: 600,
    lineHeight: 1.2,
  },
}))

const Dd = styled('dd')(({ theme }) => ({
  color: theme.palette.bleuFonce.main,
  fontSize: '0.7778rem',
  fontWeight: 500,
  lineHeight: 1.1,
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.2,
    paddingBottom: '.5rem',
  },
}))

function ALink({ href, children }) {
  const isSmall = useSmall('md')
  return isSmall ? (
    <Button primary href={href}>{children}</Button>
  ) : (
    <Link to={href} Icon>{children}</Link>
  )
}

export default function HoraireAujourdhui({ codeBib, ...rest }) {
  const { children } = rest

  if (typeof children === 'boolean' && !children) return null

  const { data: services } = useSWR('https://api.bib.umontreal.ca/horaires/services', fetcher)
  const { data, error } = useSWR('https://api.bib.umontreal.ca/horaires/?fin=P1D', fetcher)
  const isSmall = useSmall('md')

  if (error) {
    console.error(error)
    return null
  }

  const evenements = useMemo(() => {
    if (data && services) {
      return data?.evenements
        .filter(({ bibliotheque }) => bibliotheque === codeBib)
        .map(({ service, sommaire, bibliotheque }) => ({
          service: services[service]?.label || service,
          sommaire,
          bibliotheque,
        }))
    }
    return null
  }, [data, services, codeBib])

  const idBibliotheque = evenements?.[0]?.bibliotheque || ''

  // Utilisation de la fonction utilitaire
  const biblioInfo = getBiblioByCode(idBibliotheque)

  return (
    evenements && (
      <Bloc title="Aujourd'hui" Icon={ClockCountdown} flex>
        {evenements.map(({ service, sommaire }, i) => (
          <ConditionalWrapper
            key={i}
            condition={isSmall}
            wrapper={(children) => (
              <Div sx={{ display: 'flex', gap: '1em' }}>
                <ClockCountdown size={26} color="var(--bib-palette-primary-main)" />
                {children}
              </Div>
            )}
          >
            <Dl>
              <Dt>{service}</Dt>
              <Dd>{sommaire}</Dd>
            </Dl>
          </ConditionalWrapper>
        ))}
        {biblioInfo && (
          <div>
            <ALink href={`/horaires#${biblioInfo.ancre}`}>
              Tous les horaires
            </ALink>
          </div>
        )}
        {children}
      </Bloc>
    )
  )
}