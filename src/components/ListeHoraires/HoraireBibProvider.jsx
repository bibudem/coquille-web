import { useEffect, useMemo, useState } from 'react'
import useSWR, { preload } from 'swr'
import { HoraireBibContext } from './HoraireBibContext'
import { addWeekISODate } from '@/utils/dateTimeUtils'
import { useSmall } from '@/hooks/use-small'
import Week from './Week'

// const fetcher = (...args) => {
//   return fetch(...args).then((res) => res.json())
// }

const fetcher = async (...args) => {
  const res = await fetch(...args)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    try {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    } catch (e) {
      console.error('Could not create error after fetch:', e)
    }
  }

  return res.json()
}

export default function HoraireBibProvider({ children }) {
  const [labels, setLabels] = useState({})
  const [services, setServices] = useState({})
  const [currentWeek, setCurrentWeek] = useState(new Week())
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const isSmall = useSmall('md')
  const { data: horairesData, error: horairesDataError, isLoading: horairesDataIsLoading } = useSWR(`https:///api.bib.umontreal.ca/horaires?debut=${currentWeek}&fin=P7D`, fetcher)
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
    setIsReady((!!horairesData && !!servicesData) || !!listeBibliothequesData)
  }, [horairesData, servicesData, listeBibliothequesData])

  useEffect(() => {
    setIsLoading(!!horairesDataIsLoading || !!serviceIsLoading || !!listeBibliothequesIsLoading)
  }, [horairesDataIsLoading, serviceIsLoading, listeBibliothequesIsLoading])

  useEffect(() => {
    if (horairesDataError) {
      console.error('[fetch] horairesDataError:', horairesDataError)
      setError(horairesDataError)
    }
  }, [horairesDataError])

  useEffect(() => {
    if (serviceError) {
      console.error('[fetch] serviceError:', serviceError)
      setError(serviceError)
    }
  }, [serviceError])

  useEffect(() => {
    if (listeBibliothequesError) {
      console.error('[fetch] listeBibliothequesError', listeBibliothequesError)
      setError(listeBibliothequesError)
    }
  }, [listeBibliothequesError])

  return <HoraireBibContext.Provider value={{ ...horaires, error, isLoading, isReady, ...labels, services, prevBtnProps, nextBtnProps, sortedServices, getHorairesFor }}>{children}</HoraireBibContext.Provider>
}
