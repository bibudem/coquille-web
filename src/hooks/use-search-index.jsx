import { useMemo } from 'react'
import useSWR from 'swr'
import MiniSearch from 'minisearch'

const fetcher = url => fetch(url).then(res => res.json())

/**
 * Charge l'index de recherche du site (le JSON statique généré au build par
 * gatsby-node.mjs) et expose une fonction de recherche groupée par section
 * (Pages, Nouvelles, Bibliothèques, Personnel).
 *
 * Utilisé uniquement par la page dédiée /rechercher/ : le fetch ne se déclenche
 * donc que pour les visiteurs qui l'atteignent, pas au chargement de chaque
 * page du site.
 */
export function useSearchIndex() {
  const { data, isLoading } = useSWR('/search-index.json', fetcher)

  // Reconstruire l'index MiniSearch uniquement quand les données changent
  // (et non à chaque frappe dans le champ de recherche).
  const miniSearch = useMemo(() => {
    if (!data) return null

    const documents = data.map((entry, id) => ({ id, ...entry }))
    const index = new MiniSearch({
      fields: ['title', 'excerpt'],
      storeFields: ['title', 'excerpt', 'url', 'section'],
      searchOptions: {
        prefix: true, // trouve des résultats dès les premières lettres tapées
        fuzzy: 0.2, // tolère les petites fautes de frappe
        boost: { title: 2 }, // un mot trouvé dans le titre compte plus que dans l'extrait
      },
    })
    index.addAll(documents)
    return index
  }, [data])

  function search(query) {
    if (!miniSearch || !query?.trim()) return []

    const results = miniSearch.search(query)

    // Regroupe les résultats par section pour l'affichage dans la page /rechercher/
    const grouped = new Map()
    results.forEach(({ title, excerpt, url, section }) => {
      if (!grouped.has(section)) grouped.set(section, [])
      grouped.get(section).push({ title, excerpt, url })
    })

    return Array.from(grouped, ([section, items]) => ({ section, items }))
  }

  return { search, isLoading }
}
