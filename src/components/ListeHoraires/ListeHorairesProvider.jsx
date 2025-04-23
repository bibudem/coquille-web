import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { HoraireBibContext } from './HoraireBibContext'
import { formatWeekHeader, getLastSundayISODate } from '@/utils/dateTimeUtils'

const fetcher = (...args) => {
  return fetch(...args).then((res) => res.json())
}

export default function ListeHorairesProvider({ children }) {
  const [horaires, setHoraires] = useState([])
  const [labels, setLabels] = useState({})
  const [currentWeek, setCurrentWeek] = useState(() => getLastSundayISODate())
  const { data: horairesData, error, isLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires?debut=${currentWeek}&fin=P7D`, fetcher)

  useEffect(() => {
    if (!horairesData) {
      return
    }

    function parseData(horairesData) {
      if (!horairesData) {
        return
      }

      const result = {}
      const bibs = new Set()

      horairesData.evenements.forEach((item) => {
        const { bibliotheque: codeBib } = item
        if (!bibs.has(codeBib)) {
          bibs.add(codeBib)
          result[codeBib] = []
        }
        result[codeBib].push(item)
      })
      console.log('result:', result)
      return result
    }

    const { labels } = horairesData
    const parsedData = {
      horaires: parseData(horairesData),
      labels,
      setCurrentWeek,
    }

    setHoraires(parsedData)
  }, [horairesData])

  useEffect(() => {
    if (currentWeek) {
      const currentWeekTitle = formatWeekHeader(currentWeek)

      setLabels({
        currentWeekTitle,
      })
    }
  }, [currentWeek])

  return <HoraireBibContext.Provider value={{ ...horaires, error, isLoading, ...labels }}>{children}</HoraireBibContext.Provider>
}
