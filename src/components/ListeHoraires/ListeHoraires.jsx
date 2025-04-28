import HoraireBibHeader from './HoraireBibHeader'
import HoraireBibProvider from './HoraireBibProvider'
import ListeHorairesContainer from './ListeHorairesContainer'

export default function ListeHoraires({ children }) {
  return (
    <HoraireBibProvider>
      <HoraireBibHeader />
      <ListeHorairesContainer>{children}</ListeHorairesContainer>
    </HoraireBibProvider>
  )
}
