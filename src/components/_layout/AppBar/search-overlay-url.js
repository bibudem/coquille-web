// Paramètre d'URL qui signale la modale de recherche ouverte (`?search=1`).
// Isolé dans ce petit module pour que TopAppBar/TopAppBarSm puissent le lire
// au premier rendu sans importer SearchOverlay, qui est chargé à la demande
// (voir LazySearchOverlay).
export const PARAM_OPEN = 'search'

// Utilisé par TopAppBar/TopAppBarSm pour initialiser `searchOpen` avant même
// le premier rendu (lien profond partagé, ou retour arrière atterrissant
// directement sur cet état) — évite un flash fermé→ouvert au montage.
export function isSearchOverlayOpenInUrl() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get(PARAM_OPEN) === '1'
}
