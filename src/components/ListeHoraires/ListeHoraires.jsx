import { useState } from 'react'
import HoraireBibHeader from './HoraireBibHeader'
import HoraireBibProvider from './HoraireBibProvider'
import ListeHorairesContainer from './ListeHorairesContainer'
import SearchBox from './SearchBox'

export default function ListeHoraires({ children }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <HoraireBibProvider>
      <HoraireBibHeader />
      <SearchBox value={searchTerm} onChange={handleSearchChange} />
      <ListeHorairesContainer searchTerm={searchTerm}>
        {children}
      </ListeHorairesContainer>
    </HoraireBibProvider>
  )
}