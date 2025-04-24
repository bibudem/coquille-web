import HoraireBibHeader from './HoraireBibHeader'
import HoraireBibProvider from './HoraireBibProvider'
import ListeHorairesContainer from './ListeHorairesContainer'

export default function ListeHoraires() {
  return (
    <HoraireBibProvider>
      <HoraireBibHeader />
      <ListeHorairesContainer />
    </HoraireBibProvider>
  )
}
