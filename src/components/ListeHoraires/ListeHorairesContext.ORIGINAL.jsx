import { createContext, useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { formatISO, previousSunday } from 'date-fns'
import { horaireBibContext } from './HoraireBibContext'

const fetcher = (...args) => {
  return fetch(...args)
    .then((res) => res.json())
    .then((data) => data.evenements)
}

export const HoraireBibContext = createContext()

function getLastSunday() {
  return formatISO(previousSunday(new Date()), { representation: 'date' })
}

export function HoraireBibProvider({ children }) {
  const [horaires, setHoraires] = useState([])
  const [dateDebut, setWeek] = useState(() => getLastSunday())
  const { data, error, isLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires?debut=${dateDebut}&fin=P7D`, fetcher)

  useEffect(() => {
    function parseData(data) {
      const result = {}
      const bibs = new Set()
      data?.forEach((item) => {
        const { bibliotheque: codeBib } = item
        if (!bibs.has(codeBib)) {
          bibs.add(codeBib)
          result[codeBib] = []
        }
        result[codeBib].push(item)
      })

      return result
    }

    const parsedData = parseData(data)
    console.log('parsedData:', parsedData)
    setHoraires(parsedData)
  }, [setWeek, data])

  return <HoraireBibContext.Provider value={{ horaires, setWeek }}>{children}</HoraireBibContext.Provider>
}
