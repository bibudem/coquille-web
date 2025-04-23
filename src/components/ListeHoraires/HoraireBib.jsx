import { useContext, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import codeBibs from 'code-bib'
import BlocHoraire from './BlocHoraire'
import { HoraireBibContext } from './HoraireBibContext'
import useSyncCarousels from './useSyncCarousels'
import useHoraires from './useHoraires'
import Div from '@/components/utils/Div'

function Title({ children }) {
  return <Div sx={{ width: 300, fontSize: '1.7778rem', fontWeight: 400, lineHeight: 1.2 }}>{children}</Div>
}

function Header({ data }) {
  console.log('header data:', data)
  return <></>
}

export default function HoraireBib({ codeBib, children }) {
  const horairesData = useContext(HoraireBibContext)
  const carouselProps = useSyncCarousels()
  const { header } = useHoraires()
  const { daysOfWeekHeaders } = horairesData
  console.log('daysOfWeekHeaders:', daysOfWeekHeaders)
  const _horaires = useMemo(() => {
    const { horaires, ...props } = horairesData
    if (!codeBib in horaires) {
      throw new Error(`Code bib ${codeBib} not found in horaires`)
    }
    return {
      horaires: horaires[codeBib],
      ...props,
      ...carouselProps,
    }
  }, [horairesData, codeBib])

  return (
    <Div
      sx={{
        display: 'flex',
        gap: '3.5556rem',
        outline: '1px solid red',
        marginBottom: '3.5556rem',
      }}
    >
      <Div>
        <Title>{codeBibs[codeBib].court}</Title>
        {children}
      </Div>
      <BlocHoraire data={daysOfWeekHeaders} />
      {/* <Div
        sx={{
          flexGrow: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
          gridTemplateAreas: '"horaire horaire horaire horaire horaire horaire horaire"',
        }}
      >
        <Header data={header} />
        {Array(8)
          .fill(1)
          .map((_, i) => {
            return <Div key={i}>{i}</Div>
          })}
      </Div> */}
    </Div>
  )
}
