import Banner from './Banner'
import HoraireBibProvider from './HoraireBibProvider'
import ListeHorairesContainer from './ListeHorairesContainer'
import useSyncCarousels from './useSyncCarousels'

export default function ListeHoraires() {
  const { navCurrentWeekTitle } = useSyncCarousels()
  return (
    <HoraireBibProvider>
      <Banner header={navCurrentWeekTitle} />
      <ListeHorairesContainer />
    </HoraireBibProvider>
  )
}
