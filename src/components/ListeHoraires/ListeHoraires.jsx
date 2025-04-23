import Banner from './Banner'
import ListeHorairesProvider from './ListeHorairesProvider'
import ListeHorairesContainer from './ListeHorairesContainer'
import useSyncCarousels from './useSyncCarousels'

export default function ListeHoraires() {
  const { navCurrentWeekTitle } = useSyncCarousels()
  return (
    <ListeHorairesProvider>
      <Banner header={navCurrentWeekTitle} />
      <ListeHorairesContainer />
    </ListeHorairesProvider>
  )
}
