import { useCallback, useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'
import { HORAIRES_API, addDays, mondayOf, parseHoraires } from './horaires'

// Les horaires se chargent par tranches de deux semaines, à partir du lundi
// de la semaine courante. La première tranche suffit au statut « ouvert /
// fermé » (y compris « ouvre lundi » un dimanche soir) ; les suivantes ne
// partent que si quelqu'un navigue vers une semaine plus lointaine. Deux
// semaines pèsent ~95 Ko, contre ~410 Ko pour deux mois d'un coup, et l'API
// ne compresse pas ses réponses (constaté en septembre 2026).
const CHUNK_DAYS = 14
const WEEKS = 8
const MAX_CHUNKS = Math.ceil((WEEKS * 7) / CHUNK_DAYS)

async function fetcher(url) {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error(`API horaires : HTTP ${res.status}`)
    error.status = res.status
    throw error
  }
  return res.json()
}

// `today` vaut null au SSR et au premier rendu client : la requête ne part
// qu'une fois la date de Montréal connue côté client.
export default function useHoraires(today) {
  const monday = today ? mondayOf(today) : null

  const getKey = (index) => (monday && index < MAX_CHUNKS ? `${HORAIRES_API}?debut=${addDays(monday, index * CHUNK_DAYS)}&fin=P${CHUNK_DAYS}D&format=json` : null)
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
  })

  // Toutes les semaines navigables, chargées ou non : la navigation ← → en
  // connaît ainsi la limite dès le départ.
  const dates = useMemo(() => {
    if (!monday) return []
    return Array.from({ length: WEEKS * 7 }, (_, i) => addDays(monday, i))
  }, [monday])

  const horaires = useMemo(() => {
    if (!data?.length) return null
    return parseHoraires({ evenements: data.flatMap((page) => page?.evenements ?? []), labels: data[0]?.labels })
  }, [data])

  const loadedDays = (data?.length ?? 0) * CHUNK_DAYS

  // Demande la tranche qui contient la semaine `offset` (0 = semaine courante).
  const ensureWeek = useCallback(
    (offset) => {
      const needed = Math.min(Math.ceil(((offset + 1) * 7) / CHUNK_DAYS), MAX_CHUNKS)
      if (needed > size) setSize(needed)
    },
    [size, setSize]
  )

  const isWeekLoaded = useCallback((offset) => (offset + 1) * 7 <= loadedDays, [loadedDays])

  return { horaires, dates, error, ensureWeek, isWeekLoaded }
}
