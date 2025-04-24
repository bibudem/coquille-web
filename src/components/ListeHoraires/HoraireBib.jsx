import { useContext, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import codeBibs from 'code-bib'
import BlocHoraire from './BlocHoraire'
import { HoraireBibContext } from './HoraireBibContext'
import useSyncCarousels from './useSyncCarousels'
import Div from '@/components/utils/Div'

function Title({ children }) {
  return <Div sx={{ width: 300, fontSize: '1.7778rem', fontWeight: 400, lineHeight: 1.2 }}>{children}</Div>
}

export default function HoraireBib({ codeBib, children }) {
  const horairesData = useContext(HoraireBibContext)
  const carouselProps = useSyncCarousels()

  return (
    <Div
      sx={{
        display: 'flex',
        gap: '20px',
        marginBottom: '3.5556rem',
      }}
    >
      <Div>
        <Title>{codeBibs[codeBib].court}</Title>
        {children}
      </Div>
      <BlocHoraire codeBib={codeBib} />
    </Div>
  )
}
