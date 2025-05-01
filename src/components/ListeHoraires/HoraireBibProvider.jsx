import { useEffect, useMemo, useState } from 'react'
import useSWR, { preload } from 'swr'
import { HoraireBibContext } from './HoraireBibContext'
import { addWeekISODate } from '@/utils/dateTimeUtils'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import Week from './Week'

const fetcher = (...args) => {
  return fetch(...args).then((res) => res.json())
}

export default function HoraireBibProvider({ children }) {
  const [labels, setLabels] = useState({})
  const [services, setServices] = useState({})
  const [currentWeek, setCurrentWeek] = useState(new Week())
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const currentBreakpoint = useBreakpoint()
  const { data: horairesData, error, isLoading: horairesIsLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires?debut=${currentWeek}&fin=P7D`, fetcher)
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
    // const actualWeek = new Week()
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
    console.log('[useEffect] currentWeek:', currentWeek)
    if (currentWeek) {
      const currentWeekTitle = currentWeek.formatWeekHeader(currentBreakpoint)
      const daysOfWeekHeaders = {
        days: currentWeek.formatDaysOfWeekHeader(),
        weekDate: currentWeek.toDate(),
      }

      setLabels({
        currentWeekTitle,
        daysOfWeekHeaders,
      })
    }
  }, [currentWeek, currentBreakpoint])

  useEffect(() => {
    if (currentWeek) {
      const nextWeek = addWeekISODate(currentWeek, 1)

      // Le bloc d'horaires de la semaine suivante
      // est mis en cache pour plus de rapidité
      if (!fetchedWeeks.has(nextWeek)) {
        fetchedWeeks.add(nextWeek)
        preload(`https:///api.bib.umontreal.ca/horaires?debut=${nextWeek}&fin=P7D`, fetcher)
      }
    }
  }, [currentWeek])

  useEffect(() => {
    setIsReady(!!horairesData && !!servicesData)
  }, [horairesData, servicesData])

  useEffect(() => {
    setIsLoading(!!horairesIsLoading || !!serviceIsLoading)
  }, [horairesIsLoading, serviceIsLoading])

  return <HoraireBibContext.Provider value={{ ...horaires, error, isLoading, isReady, ...labels, services, prevBtnProps, nextBtnProps }}>{children}</HoraireBibContext.Provider>
}
