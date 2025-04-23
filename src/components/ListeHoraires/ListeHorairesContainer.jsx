import { useContext, useEffect, useState } from 'react'
import ListeHoraire from './HoraireBib'
import { HoraireBibContext } from './HoraireBibContext'
import Div from '@/components/utils/Div'

export default function ListeHorairesContainer({ ...rest }) {
  const data = useContext(HoraireBibContext)
  console.log('ici:', data)

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
