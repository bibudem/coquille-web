import { useContext } from 'react'
import HoraireBib from './HoraireBib'
import { HoraireBibContext } from './HoraireBibContext'
import Div from '@/components/utils/Div'
import LayoutContainer from '@/components/utils/LayoutContainer'

export default function ListeHorairesContainer({ ...rest }) {
  const data = useContext(HoraireBibContext)

  return (
    <LayoutContainer>
      <Div sx={{ paddingTop: '2.1667rem' }}>
        {data &&
          data.horaires &&
          Object.keys(data.horaires)?.map((codeBib) => {
            return <HoraireBib codeBib={codeBib} key={codeBib} />
          })}
      </Div>
    </LayoutContainer>
  )
}
