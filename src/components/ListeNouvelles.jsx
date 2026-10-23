import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import visuallyHidden from '@mui/utils/visuallyHidden'
import ElementNouvelle from '@/components/Nouvelles/ElementNouvelle'
import useNouvelles, { TYPE_NOUVELLE, TYPE_PRESSE } from '@/components/Nouvelles/useNouvelles'

// La valeur du filtre se retrouve dans l'URL (?type=revue-de-presse) : on
// peut ainsi partager un lien vers la revue de presse seule.
const FILTRES = [
  { valeur: 'tout', libelle: 'Tout', type: null },
  { valeur: 'nouvelles', libelle: 'Nouvelles', type: TYPE_NOUVELLE },
  { valeur: 'revue-de-presse', libelle: 'Revue de presse', type: TYPE_PRESSE },
]

// Regroupe les éléments par année ; ils sont déjà triés par date décroissante.
function parAnnee(liste) {
  return liste.reduce((groupes, item) => {
    const dernier = groupes.at(-1)
    if (dernier?.annee === item.annee) {
      dernier.items.push(item)
    } else {
      groupes.push({ annee: item.annee, items: [item] })
    }
    return groupes
  }, [])
}

/**
 * Page Nouvelles : nos communications et la revue de presse, regroupées par
 * année, avec un filtre pour n'afficher que l'une ou l'autre.
 */
export default function ListeNouvelles({ id = 'liste-nouvelles' }) {
  const nouvelles = useNouvelles()
  const [filtre, setFiltre] = useState('tout')

  // Lecture de l'URL après l'hydratation seulement : le HTML du SSR affiche
  // toujours « Tout », comme le premier rendu côté client.
  useEffect(() => {
    const valeur = new URLSearchParams(window.location.search).get('type')
    if (FILTRES.some((f) => f.valeur === valeur)) setFiltre(valeur)
  }, [])

  function changerFiltre(_, valeur) {
    // Un groupe exclusif renvoie null quand on reclique le filtre actif.
    if (!valeur) return
    setFiltre(valeur)
    const url = new URL(window.location.href)
    if (valeur === 'tout') url.searchParams.delete('type')
    else url.searchParams.set('type', valeur)
    window.history.replaceState(window.history.state, '', url)
  }

  const typeActif = FILTRES.find((f) => f.valeur === filtre)?.type
  const visibles = useMemo(() => (typeActif ? nouvelles.filter((item) => item.type === typeActif) : nouvelles), [nouvelles, typeActif])
  const groupes = parAnnee(visibles)
  const compte = (type) => (type ? nouvelles.filter((item) => item.type === type).length : nouvelles.length)

  return (
    <Box id={id}>
      <ToggleButtonGroup
        value={filtre}
        exclusive
        onChange={changerFiltre}
        aria-label="Filtrer les nouvelles"
        sx={{ flexWrap: 'wrap', gap: '.5rem', marginBottom: '2.5rem' }}
      >
        {FILTRES.map(({ valeur, libelle, type }) => (
          <ToggleButton
            key={valeur}
            value={valeur}
            sx={(theme) => ({
              // Pastilles séparées plutôt qu'un bloc de boutons collés
              '&&': {
                border: `1px solid ${theme.palette.bleu200.main}`,
                borderRadius: '999px',
                margin: 0,
              },
              paddingInline: '1.25rem',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              color: theme.palette.bleuFonce.main,
              '&.Mui-selected, &.Mui-selected:hover': {
                backgroundColor: theme.palette.bleuFonce.main,
                borderColor: theme.palette.bleuFonce.main,
                color: theme.palette.common.white,
              },
            })}
          >
            {libelle}
            <Box component="span" sx={{ marginLeft: '.5em', opacity: 0.7 }}>
              {compte(type)}
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box sx={visuallyHidden} role="status" aria-live="polite">
        {visibles.length} {visibles.length > 1 ? 'éléments affichés' : 'élément affiché'}
      </Box>

      {groupes.length ? (
        groupes.map(({ annee, items }) => (
          <Box component="section" key={annee} aria-labelledby={`${id}-${annee}`} sx={{ marginBottom: '3rem' }}>
            <Typography component="h2" variant="h3" id={`${id}-${annee}`} sx={{ marginBottom: '.5rem' }}>
              {annee}
            </Typography>
            <Box component="ul" sx={{ margin: 0, padding: 0 }}>
              {items.map((item) => (
                <ElementNouvelle key={item.id} item={item} titleVariant="subtitle1" />
              ))}
            </Box>
          </Box>
        ))
      ) : (
        <Typography>Aucune nouvelle pour le moment.</Typography>
      )}
    </Box>
  )
}
