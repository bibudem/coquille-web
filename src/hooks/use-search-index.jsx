import { useMemo } from 'react'
import useSWR from 'swr'
import MiniSearch from 'minisearch'

const fetcher = url => fetch(url).then(res => res.json())

/**
 * Charge paresseusement l'index de recherche du site (le JSON statique généré
 * au build par gatsby-node.mjs) et expose une fonction de recherche groupée
 * par section (Pages, Nouvelles, Bibliothèques, Personnel).
 *
 * @param {boolean} enabled - ne déclenche le fetch que lorsque true (ex: seulement
 *   quand l'overlay de recherche est ouvert), pour ne pas alourdir le chargement
 *   initial de chaque page du site avec un index qui ne sera peut-être jamais utilisé.
 */
export function useSearchIndex(enabled) {
  // useSWR met le résultat en cache par clé : une fois chargé, rouvrir l'overlay
  // ne refait pas de requête réseau tant que la page n'est pas rechargée.
  const { data, isLoading } = useSWR(enabled ? '/search-index.json' : null, fetcher)

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

    // Regroupe les résultats par section pour l'affichage dans SearchOverlay.jsx
    const grouped = new Map()
    results.forEach(({ title, excerpt, url, section }) => {
      if (!grouped.has(section)) grouped.set(section, [])
      grouped.get(section).push({ title, excerpt, url })
    })

    return Array.from(grouped, ([section, items]) => ({ section, items }))
  }

  return { search, isLoading: enabled && isLoading }
}
