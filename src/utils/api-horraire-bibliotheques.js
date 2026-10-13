import LIEUX from '@/components/CarteHoraires/points-de-service.json'

// Correspondance entre le code de bibliothèque de l'API horaires (« ss »,
// « sciences »…) et la fiche de la page /horaires/. Construite à partir des
// données de cette page plutôt que tenue à la main : l'ancienne table
// envoyait la BLSH vers #hubert-reeves, les Maths-info vers #math-info, etc.
export const biblioMap = Object.fromEntries(LIEUX.filter((l) => l.codeBib).map((l) => [l.codeBib, { titre: l.name, ancre: l.id }]))

export const getBiblioByCode = (code) => biblioMap[code]
export const getBiblioAncre = (code) => biblioMap[code]?.ancre || ''
export const getBiblioTitre = (code) => biblioMap[code]?.titre || ''
