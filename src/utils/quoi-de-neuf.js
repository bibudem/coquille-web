// Gabarit commun aux trois colonnes de la section Quoi de neuf (accueil) :
// Événements, Nouvelles et Formations. À partir de md, les colonnes sont
// côte à côte : chaque élément a alors la même hauteur et le même espacement,
// pour que les rangées tombent au même niveau d'une colonne à l'autre, et les
// titres sont coupés à TITLE_LINES lignes pour tenir dans cette hauteur. Sur
// mobile, les colonnes sont empilées : les éléments gardent leur hauteur
// naturelle et le titre s'affiche en entier.
export const ITEM_HEIGHT = { xs: 'auto', md: '8.75rem' }
export const ITEM_GAP = '1rem'
export const ITEM_PADDING_TOP = '1.25rem'
export const ITEM_PADDING_BOTTOM = { xs: '1.25rem', md: 0 }
export const TITLE_LINES = 3

export const clampLines = (lines = TITLE_LINES) => ({
  display: '-webkit-box',
  WebkitLineClamp: { xs: 'none', md: lines },
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})
