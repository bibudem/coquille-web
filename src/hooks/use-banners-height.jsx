import { useEffect, useState } from 'react'

/**
 * Mesure en direct la hauteur cumulée des bannières d'avis (<udem-urgence>,
 * <bib-avis>) qui précèdent le hero dans le DOM. Ce sont des web components
 * externes dont le contenu se charge de façon asynchrone : leur hauteur
 * réelle n'est donc connue qu'au runtime, dans le navigateur, et peut changer
 * après le premier rendu (apparition/disparition d'un avis).
 *
 * @param {string[]} selectors - sélecteurs CSS des bannières à mesurer, dans
 *   l'ordre où elles précèdent le hero pour le template concerné (certains
 *   templates affichent <bib-avis> après le hero plutôt qu'avant, auquel cas
 *   il ne faut pas l'inclure ici).
 */
export function useBannersHeight(selectors) {
  const [height, setHeight] = useState(0)
  const key = selectors.join(',')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const elements = key
      .split(',')
      .map(selector => document.querySelector(selector))
      .filter(Boolean)

    if (elements.length === 0) return

    const measure = () => {
      const total = elements.reduce((sum, el) => sum + el.getBoundingClientRect().height, 0)
      setHeight(total)
    }

    measure()

    const observer = new ResizeObserver(measure)
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [key])

  return height
}
