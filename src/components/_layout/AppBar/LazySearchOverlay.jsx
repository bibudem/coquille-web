import { lazy, Suspense, useEffect, useState } from 'react'

// La modale de recherche (SearchOverlay, avec MiniSearch, SWR et plusieurs
// composants MUI) n'est utile qu'une fois ouverte : elle est chargée à la
// demande plutôt que d'alourdir le JavaScript commun à toutes les pages.
const loadSearchOverlay = () => import('./SearchOverlay')
const SearchOverlay = lazy(loadSearchOverlay)

// Précharge le code de la modale (ex. au survol ou au focus du bouton de
// recherche) pour qu'elle s'ouvre sans délai perceptible au clic.
export function preloadSearchOverlay() {
  loadSearchOverlay()
}

export default function LazySearchOverlay({ open, onClose }) {
  // Une fois ouverte, la modale reste montée : sa fermeture (animation,
  // retour dans l'historique) est gérée par SearchOverlay lui-même.
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  if (!mounted) return null

  return (
    <Suspense fallback={null}>
      <SearchOverlay open={open} onClose={onClose} />
    </Suspense>
  )
}
