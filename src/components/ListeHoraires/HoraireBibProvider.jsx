import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import useSWR, { preload } from 'swr'
import { HoraireBibContext } from './HoraireBibContext'
import { addWeekISODate } from '@/utils/dateTimeUtils'
import { useSmall } from '@/hooks/use-small'
import Week from './Week'

const fetcher = async (...args) => {
  const res = await fetch(...args)
  if (!res.ok) {
    try {
      const error = new Error('An error occurred while fetching the data.')
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

  // Correction: on s'assure d'obtenir le string ISO YYYY-MM-DD pour l'API
  const weekStart = currentWeek && typeof currentWeek.toDate === 'function'
    ? currentWeek.toDate().toISOString().slice(0, 10)
    : String(currentWeek)

  const { data: horairesData, error: horairesDataError, isLoading: horairesDataIsLoading } = useSWR(
    `https:///api.bib.umontreal.ca/horaires?debut=${weekStart}&fin=P7D`,
    fetcher
  )
  const { data: servicesData, error: serviceError, isLoading: serviceIsLoading } = useSWR(
    `https:///api.bib.umontreal.ca/horaires/services`, fetcher)
  const { data: listeBibliothequesData, error: listeBibliothequesError, isLoading: listeBibliothequesIsLoading } = useSWR(
    `https:///api.bib.umontreal.ca/horaires/liste`, fetcher)

  // Utilise useRef pour persister le cache de semaines.
  const fetchedWeeksRef = useRef(new Set())

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
    }
  }

  function getHorairesFor(codeBib) {
    if (!horaires || !horaires.horaires) return { isNotAvailable: true }
    return horaires.horaires[codeBib] ?? { isNotAvailable: true }
  }

  const sortedServices = useMemo(() => {
    if (servicesData) {
      return Object.values(servicesData).sort((service1, service2) => service1.order - service2.order)
    }
    return []
  }, [servicesData])


  const horaires = useMemo(() => {
    if (!servicesData || !horairesData || !listeBibliothequesData) {
      // Ne loggue qu'en développement si besoin
      // console.log('[%s] Données incomplètes', currentWeek)
      return { horaires: {}, labels: {}, setCurrentWeek }
    }

    function parseData(horairesData) {
      const result = {}
      horairesData.evenements?.forEach((horaire) => {
        const { bibliotheque: codeBib, service } = horaire
        if (!Reflect.has(result, codeBib)) result[codeBib] = {}
        if (!Reflect.has(result[codeBib], service)) result[codeBib][service] = []
        result[codeBib][service].push(horaire)
      })
      Object.keys(listeBibliothequesData).forEach((codeBib) => {
        if (!Reflect.has(result, codeBib)) {
          result[codeBib] = { isNotAvailable: true }
        }
      })
      return result
    }

    const labels = horairesData.labels || {}
    return {
      horaires: parseData(horairesData),
      labels,
      setCurrentWeek,
    }
  }, [horairesData, servicesData, listeBibliothequesData])

  useEffect(() => {
    if (servicesData) setServices(servicesData)
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

  // Correction: utilise le cache ref, pas un nouveau Set ! 
  useEffect(() => {
    if (currentWeek) {
      const nextWeek = addWeekISODate(currentWeek, 1)
    // Si c'est un objet Date :
    const nextWeekIso = nextWeek instanceof Date
      ? nextWeek.toISOString().slice(0, 10)
      : String(nextWeek)

    if (!fetchedWeeksRef.current.has(nextWeekIso)) {
      fetchedWeeksRef.current.add(nextWeekIso)
      preload(`https:///api.bib.umontreal.ca/horaires?debut=${nextWeekIso}&fin=P7D`, fetcher)
    }

    }
  }, [currentWeek])

  useEffect(() => {
    setIsReady(!!horairesData && !!servicesData && !!listeBibliothequesData)
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

  // Helper
  const actualWeek = useMemo(() => new Week(), [])
  const isCurrentWeek = useCallback(() => currentWeek.toString() === actualWeek.toString(), [currentWeek, actualWeek])
  const resetToToday = () => setCurrentWeek(new Week())

  // Correction: sécurité si horaires ou labels sont encore vides
  return (
    <HoraireBibContext.Provider
      value={{
        horaires: horaires.horaires,
        labels: horaires.labels,
        setCurrentWeek,
        error,
        isLoading,
        isReady,
        services,
        prevBtnProps,
        nextBtnProps,
        sortedServices,
        getHorairesFor,
        isCurrentWeek,
        resetToToday,
        ...labels,
      }}
    >
      {children}
    </HoraireBibContext.Provider>
  )
}
