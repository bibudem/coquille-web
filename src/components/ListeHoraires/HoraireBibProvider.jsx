import { useEffect, useMemo, useState } from 'react'
import useSWR, { preload } from 'swr'
import { HoraireBibContext } from './HoraireBibContext'
import { addWeekISODate } from '@/utils/dateTimeUtils'
import { useSmall } from '@/hooks/use-small'
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
  const isSmall = useSmall('md')
  const { data: horairesData, error, isLoading: horairesIsLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires?debut=${currentWeek}&fin=P7D`, fetcher)
  const { data: servicesData, error: serviceError, isLoading: serviceIsLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires/services`, fetcher)
  const { data: listeBibliothequesData, error: listeBibliothequesError, isLoading: listeBibliothequesIsLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires/liste`, fetcher)
  const fetchedWeeks = new Set([currentWeek])

  function prevBtnProps() {
    const actualWeek = new Week()
    return {
      onClick: () => setCurrentWeek(currentWeek.previousWeek()),
      disabled: currentWeek.toDate() <= actualWeek.toDate(),
    }
  }

  function nextBtnProps() {
    return {
      onClick: () => setCurrentWeek(currentWeek.nextWeek()),
      // disabled: currentWeek.toDate() <= actualWeek.toDate(),
    }
  }

  function getHorairesFor(codeBib) {
    console.log('[getHorairesFor(%s)] %o (horaires: %o)', codeBib, horaires.horaires[codeBib], horaires.horaires)
    return horaires.horaires[codeBib] ?? { isNotAvailable: true }
  }

  const sortedServices = useMemo(() => {
    if (servicesData) {
      return Object.values(servicesData).sort((service1, service2) => service1.order - service2.order)
    }
  }, [servicesData])

  const horaires = useMemo(() => {
    if (!servicesData || !horairesData || !listeBibliothequesData) {
      console.log('[%s] No horairesData !! servicesData:', currentWeek, horairesData, servicesData)
      return
    }

    function parseData(horairesData) {
      const result = {}

      console.log('ici:', horairesData)
      horairesData.evenements?.forEach((horaire) => {
        const { bibliotheque: codeBib, service } = horaire

        if (!Reflect.has(result, codeBib)) {
          result[codeBib] = {}
        }

        if (!Reflect.has(result[codeBib], service)) {
          result[codeBib][service] = []
        }

        result[codeBib][service].push(horaire)
      })

      Object.keys(listeBibliothequesData).forEach((codeBib) => {
        if (!Reflect.has(result, codeBib)) {
          result[codeBib] = { isNotAvailable: true }
        }
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
  }, [horairesData, services])

  useEffect(() => {
    if (servicesData) {
      setServices(servicesData)
    }
  }, [servicesData])

  useEffect(() => {
    if (currentWeek) {
      const currentWeekTitle = currentWeek.formatWeekHeader(isSmall)
      const daysOfWeekHeaders = {
        days: currentWeek.formatDaysOfWeekHeader(),
        weekDate: currentWeek.toDate(),
      }

      setLabels({
        currentWeekTitle,
        daysOfWeekHeaders,
      })
    }
  }, [currentWeek, isSmall])

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

  return <HoraireBibContext.Provider value={{ ...horaires, error, isLoading, isReady, ...labels, services, prevBtnProps, nextBtnProps, sortedServices, getHorairesFor }}>{children}</HoraireBibContext.Provider>
}
