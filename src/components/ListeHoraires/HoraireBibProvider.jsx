import { useEffect, useMemo, useState } from 'react'
import useSWR, { preload } from 'swr'
import { HoraireBibContext } from './HoraireBibContext.jsx'
import { addWeekISODate } from '@/utils/dateTimeUtils'
import Week from './Week.js'

const fetcher = (...args) => {
  return fetch(...args).then((res) => res.json())
}

export default function HoraireBibProvider({ children }) {
  const [labels, setLabels] = useState({})
  const [services, setServices] = useState({})
  const [currentWeek, setCurrentWeek] = useState(new Week())
  const { data: horairesData, error, isLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires?debut=${currentWeek}&fin=P7D`, fetcher)
  const { data: servicesData, error: serviceError, isLoading: serviceIsLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires/services`, fetcher)
  const fetchedWeeks = new Set([currentWeek])

  function nav(to) {
    setCurrentWeek(addWeekISODate(currentWeek, to))
  }

  function prevBtnProps() {
    const actualWeek = new Week()
    return {
      onClick: () => setCurrentWeek(currentWeek.previousWeek()),
      disabled: currentWeek.toDate() <= actualWeek.toDate(),
    }
  }

  function nextBtnProps() {
    const actualWeek = new Week()
    return {
      onClick: () => setCurrentWeek(currentWeek.nextWeek()),
      // disabled: currentWeek.toDate() <= actualWeek.toDate(),
    }
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

  useEffect(() => {
    if (servicesData) {
      setServices(servicesData)
    }
  }, [servicesData])

  useEffect(() => {
    if (currentWeek) {
      const currentWeekTitle = currentWeek.formatWeekHeader()
      const daysOfWeekHeaders = currentWeek.formatDaysOfWeekHeader()

      setLabels({
        currentWeekTitle,
        daysOfWeekHeaders,
      })
    }
  }, [currentWeek])

  useEffect(() => {
    if (currentWeek) {
      const nextWeek = addWeekISODate(currentWeek, 1)
      if (!fetchedWeeks.has(nextWeek)) {
        console.log('currentWeek: %s, nextWeek: %s', currentWeek, nextWeek)
        fetchedWeeks.add(nextWeek)
        preload(`https:///api.bib.umontreal.ca/horaires?debut=${nextWeek}&fin=P7D`, fetcher)
      }
    }
  }, [currentWeek])

  return <HoraireBibContext.Provider value={{ ...horaires, error, isLoading, ...labels, services, nav, prevBtnProps, nextBtnProps }}>{children}</HoraireBibContext.Provider>
}
