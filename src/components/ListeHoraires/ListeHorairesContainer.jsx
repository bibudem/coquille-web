import { useContext } from 'react'
import ListeHoraire from './HoraireBib'
import { HoraireBibContext } from './HoraireBibContext'
import Div from '@/components/utils/Div'

export default function ListeHorairesContainer({ ...rest }) {
  const data = useContext(HoraireBibContext)

  return (
    <Div sx={{ paddingTop: '2.1667rem' }}>
      {data &&
        data.horaires &&
        Object.keys(data.horaires)?.map((codeBib) => {
          return <ListeHoraire codeBib={codeBib} key={codeBib} />
        })}
    </Div>
  )
}
