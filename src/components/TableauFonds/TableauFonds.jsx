import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import visuallyHidden from '@mui/utils/visuallyHidden'

import { FONDS, PERIODES } from './fondsCollections'

/*
 * Répertoire des fonds et collections de la Bibliothèque des livres rares,
 * repris de bibudem-bibweb (TableauFonds.astro).
 *
 * Tout le tableau est rendu au build (SSR) : sans JavaScript, on lit les
 * 38 fonds d'un trait. Après l'hydratation, on peut filtrer par période et
 * par catégorie (nombre de résultats annoncé par role="status") et trier par
 * nom ou par catégorie (boutons dans les en-têtes, aria-sort).
 *
 * Les liens « Consulter » sont nommés d'après leur fonds : sinon ils seraient
 * tous identiques pour un lecteur d'écran.
 */

const categories = [...new Set(FONDS.flatMap((f) => (f.categorie ? [f.categorie] : [])))].sort((a, b) => a.localeCompare(b, 'fr'))
const periodes = PERIODES.filter((p) => FONDS.some((f) => f.periodes.includes(p)))

const annonce = (n) => (n === 0 ? 'Aucun fonds ne correspond à ces critères.' : `${n} ${n > 1 ? 'fonds et collections' : 'fonds ou collection'}`)

const Table = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.corner?.small ?? 12,
  overflow: 'hidden',
  fontSize: '1rem',
  lineHeight: 1.5,
  '& caption': visuallyHidden,
  '& thead th': {
    padding: '0.75rem 1rem',
    textAlign: 'start',
    verticalAlign: 'bottom',
    backgroundColor: theme.palette.bleu200.main,
    color: theme.palette.bleu600.main,
    fontWeight: 600,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    whiteSpace: 'nowrap',
  },
  '& tbody th, & tbody td': {
    padding: '0.75rem 1rem',
    textAlign: 'start',
    verticalAlign: 'top',
    fontWeight: 400,
  },
  '& tbody tr:not(:last-child) > *': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  // Sur petit écran, le tableau défile horizontalement plutôt que de déborder
  [theme.breakpoints.down('md')]: {
    display: 'block',
    overflowX: 'auto',
  },
}))

const BoutonTri = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.375rem',
  minHeight: '2.75rem',
  padding: 0,
  border: 0,
  background: 'none',
  color: 'inherit',
  font: 'inherit',
  fontWeight: 'inherit',
  textAlign: 'start',
  cursor: 'pointer',
  '&:hover': { textDecoration: 'underline' },
})

// Deux triangles au repos, un seul dans le sens du tri
const fleches = {
  aucun: 'M5 0l5 6H0zM5 14L0 8h10z',
  ascending: 'M5 0l5 6H0z',
  descending: 'M5 14L0 8h10z',
}

function Fleche({ sens }) {
  return (
    <Box component="svg" viewBox="0 0 10 14" aria-hidden="true" sx={{ width: '0.625rem', height: '0.875rem', fill: 'currentColor', opacity: sens ? 1 : 0.6 }}>
      <path d={fleches[sens ?? 'aucun']} />
    </Box>
  )
}

function Vide({ libelle }) {
  return (
    <>
      <span aria-hidden="true">—</span>
      <Box component="span" sx={visuallyHidden}>
        {libelle}
      </Box>
    </>
  )
}

export default function TableauFonds() {
  const [periode, setPeriode] = useState('')
  const [categorie, setCategorie] = useState('')
  // Premier clic : ordre croissant ; deuxième : décroissant ; troisième :
  // ordre d'origine (celui de la plateforme, par catégorie)
  const [tri, setTri] = useState(null)

  const lignes = useMemo(() => {
    const filtrees = FONDS.filter((f) => (!periode || f.periodes.includes(periode)) && (!categorie || f.categorie === categorie))
    if (!tri) return filtrees
    return [...filtrees].sort((a, b) => tri.sens * (a[tri.cle] ?? '').localeCompare(b[tri.cle] ?? '', 'fr'))
  }, [periode, categorie, tri])

  const trier = (cle) => setTri((t) => (t?.cle !== cle ? { cle, sens: 1 } : t.sens === 1 ? { cle, sens: -1 } : null))
  const ariaSort = (cle) => (tri?.cle === cle ? (tri.sens === 1 ? 'ascending' : 'descending') : undefined)

  return (
    <Box sx={{ my: 3 }}>
      <Box
        component="form"
        aria-label="Filtrer les fonds et collections"
        onSubmit={(e) => e.preventDefault()}
        sx={{ display: 'grid', gap: 2, mb: 2, maxWidth: { sm: '40rem' }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' } }}
      >
        <TextField id="fonds-periode" select label="Période" value={periode} onChange={(e) => setPeriode(e.target.value)} slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}>
          <option value="">Toutes les périodes</option>
          {periodes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </TextField>
        <TextField id="fonds-categorie" select label="Catégorie" value={categorie} onChange={(e) => setCategorie(e.target.value)} slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}>
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </TextField>
      </Box>

      <Typography role="status" sx={{ mb: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
        {annonce(lignes.length)}
      </Typography>

      {lignes.length > 0 && (
        <Table>
          <caption>Fonds et collections de la Bibliothèque des livres rares et collections spéciales</caption>
          <thead>
            <tr>
              <th scope="col" aria-sort={ariaSort('nom')}>
                <BoutonTri type="button" onClick={() => trier('nom')}>
                  Fonds ou collection
                  <Fleche sens={ariaSort('nom')} />
                </BoutonTri>
              </th>
              <th scope="col" aria-sort={ariaSort('categorie')}>
                <BoutonTri type="button" onClick={() => trier('categorie')}>
                  Catégorie
                  <Fleche sens={ariaSort('categorie')} />
                </BoutonTri>
              </th>
              <th scope="col">Périodes couvertes</th>
              <th scope="col">Sofia</th>
              <th scope="col">Numérisations</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((f) => (
              <tr key={f.nom}>
                <th scope="row">
                  <Box component="span" sx={{ display: 'block', fontWeight: 500 }}>
                    {f.nom}
                  </Box>
                  <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    {f.genre}
                  </Box>
                </th>
                <td>{f.categorie ?? <Vide libelle="Aucune" />}</td>
                <td>
                  <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', m: 0, p: 0, listStyle: 'none' }}>
                    {f.periodes.map((p) => (
                      <Box
                        component="li"
                        key={p}
                        sx={{ px: 1, py: '0.125rem', borderRadius: '999px', backgroundColor: 'bleu100.main', fontSize: '0.8125rem', whiteSpace: 'nowrap', '@media (forced-colors: active)': { border: '1px solid CanvasText' } }}
                      >
                        {p}
                      </Box>
                    ))}
                  </Box>
                </td>
                <td>
                  {f.sofia ? (
                    <a href={f.sofia}>
                      Consulter
                      <Box component="span" sx={visuallyHidden}>
                        {' '}
                        {f.nom} dans Sofia
                      </Box>
                    </a>
                  ) : (
                    <Vide libelle="Aucun lien" />
                  )}
                </td>
                <td>
                  {f.numerisations ? (
                    <a href={f.numerisations}>
                      Consulter
                      <Box component="span" sx={visuallyHidden}>
                        {' '}
                        les numérisations de {f.nom}
                      </Box>
                    </a>
                  ) : (
                    <Vide libelle="Aucune numérisation" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Box>
  )
}
