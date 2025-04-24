import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { HoraireBibContext } from './HoraireBibContext.jsx'
import { addWeekISODate, formatWeekHeader, getFormatedDaysOfWeek, getLastSundayISODate } from '@/utils/dateTimeUtils'

const fetcher = (...args) => {
  return fetch(...args).then((res) => res.json())
}

export default function HoraireBibProvider({ children }) {
  const [labels, setLabels] = useState({})
  const [services, setServices] = useState({})
  const [currentWeek, setCurrentWeek] = useState(() => getLastSundayISODate())
  const { data: horairesData, error, isLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires?debut=${currentWeek}&fin=P7D`, fetcher)
  const { data: servicesData, error: serviceError, isLoading: serviceIsLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires/services`, fetcher)

  function nav(to) {
    setCurrentWeek(addWeekISODate(currentWeek, to))
  }

  const horaires = useMemo(() => {
    if (!horairesData) {
      return
    }

    function parseData(horairesData) {
      if (!horairesData) {
        return
      }

      const result = {}
      const bibs = new Set()

      horairesData.evenements?.forEach((item) => {
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

    return parsedData
  }, [horairesData])

  // const services = useMemo(() => {
  //   if (!servicesData) {
  //     return
  //   }

  //   return Object.values(servicesData)
  // }, [servicesData])

  useEffect(() => {
    if (servicesData) {
      setServices(servicesData)
    }
  }, [servicesData])

  useEffect(() => {
    if (currentWeek) {
      const currentWeekTitle = formatWeekHeader(currentWeek)
      const daysOfWeekHeaders = getFormatedDaysOfWeek(currentWeek)

      setLabels({
        currentWeekTitle,
        daysOfWeekHeaders,
      })
    }
  }, [currentWeek])

  return <HoraireBibContext.Provider value={{ ...horaires, error, isLoading, ...labels, services, nav }}>{children}</HoraireBibContext.Provider>
}
