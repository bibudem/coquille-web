import { useEffect, useRef, useState } from 'react'
import { Box, CircularProgress, Dialog, IconButton, InputBase, Paper, Stack, SvgIcon, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { HouseIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import Link from '@/components/Link'
import SofiaSVG from '@/icons/sofia.svg'
import { useSearchIndex } from '@/hooks/use-search-index'

const DEBOUNCE_MS = 200

const SearchPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  flexGrow: 1,
  borderRadius: theme.shape.corner.full,
  border: `1px solid ${theme.palette.divider}`,
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
  },
}))

// Segmented control pour le switch de portée : fond neutre, pastille active
// remplie de la couleur d'accent (au lieu du style outline par défaut de MUI),
// pour que l'option choisie soit immédiatement reconnaissable.
const ScopeSwitch = styled(ToggleButtonGroup)(({ theme }) => ({
  padding: 4,
  gap: 4,
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.corner.full,
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: `${theme.shape.corner.full} !important`,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
    padding: '0.375rem 0.875rem',
    gap: '0.375rem',
    transition: theme.transitions.create(['background-color', 'color']),
    '&.Mui-selected': {
      backgroundColor: theme.palette.bleuFonce.main,
      color: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.bleuFonce.main,
      },
    },
  },
}))

// ---------------------------------------------------------------------------
// Portées de recherche proposées par le switch.
//
// "site" fait une recherche en direct dans l'index MiniSearch (useSearchIndex).
// Les trois autres redirigent, à la soumission du formulaire, vers la vraie
// page de résultats de ces sites externes — les URLs ci-dessous ont été
// confirmées en inspectant leurs formulaires de recherche respectifs, ce ne
// sont pas des URLs devinées.
//
// Chaque entrée n'a soit un `Icon` (icône Phosphor), soit un `dotColor`
// (pastille de couleur unie) — jamais les deux. Sofia n'a ni l'un ni l'autre :
// son icône est rendue à part dans le JSX (voir plus bas), car le composant
// partagé SofiaIcon (@/components/CustomIcons) a un bug qui ignore ses props.
// ---------------------------------------------------------------------------
const SEARCH_SCOPES = [
  { key: 'site', label: 'Ce site', Icon: HouseIcon },
  { key: 'sofia', label: 'Sofia' },
  { key: 'outils', label: 'Boîte à outils', dotColor: 'rougeOrange.main' },
  { key: 'studio', label: 'Studio-bib', dotColor: 'jaune.main' },
]

const SOFIA_SEARCH_URL = 'https://umontreal.on.worldcat.org/search?clusterResults=true&baseScope=wz:11098&lang=fr&stickyFacetsChecked=on&changedFacet=database&database=Xwc&overrideStickyFacetDefault=true&queryString=kw:'
const OUTILS_SEARCH_URL = 'https://boite-outils.bib.umontreal.ca/srch.php?q='
const STUDIO_SEARCH_URL = 'https://studio.bib.umontreal.ca/search/?q='

function buildExternalSearchUrl(scope, query) {
  const encoded = encodeURIComponent(query)
  if (scope === 'sofia') return `${SOFIA_SEARCH_URL}${encoded}`
  if (scope === 'outils') return `${OUTILS_SEARCH_URL}${encoded}`
  if (scope === 'studio') return `${STUDIO_SEARCH_URL}${encoded}`
  return null
}

// Icône (ou pastille) affichée dans une pastille du switch de portée.
function ScopeIcon({ scope }) {
  if (scope.key === 'sofia') {
    // Rendu direct du SVG source : le composant SofiaIcon partagé ignore ses
    // props de taille (bug préexistant), donc on passe par SvgIcon nous-mêmes.
    return <SvgIcon component={SofiaSVG} inheritViewBox sx={{ fontSize: 16 }} />
  }
  if (scope.dotColor) {
    return <Box component="span" sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: scope.dotColor, flexShrink: 0 }} />
  }
  if (scope.Icon) {
    return <scope.Icon size={16} />
  }
  return null
}

/**
 * Fenêtre de recherche du site : une modale centrée (pas plein écran) avec un
 * champ de saisie et des résultats en direct, groupés par section, fournis
 * par le hook useSearchIndex. Ouverte depuis SearchButton dans TopAppBar.jsx
 * et TopAppBarSm.jsx.
 */
export default function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [scope, setScope] = useState('site')
  // `open` sert aussi de signal à useSearchIndex : l'index n'est chargé qu'à
  // la première ouverture de la modale, pas au chargement de la page.
  const { search, isLoading } = useSearchIndex(open)

  useEffect(() => {
    if (!open) {
      // Réinitialise le champ et la portée pour ne pas ré-afficher une
      // ancienne recherche la prochaine fois que la modale s'ouvre.
      setQuery('')
      setDebouncedQuery('')
      setScope('site')
      return
    }
    // Léger délai pour laisser la modale terminer son animation d'ouverture
    // avant de donner le focus au champ.
    const id = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(id)
  }, [open])

  // Attend une pause dans la frappe avant de lancer la recherche, pour éviter
  // de ré-interroger MiniSearch à chaque caractère tapé.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [query])

  const isSiteScope = scope === 'site'
  const scopeLabel = SEARCH_SCOPES.find(s => s.key === scope)?.label
  const groups = isSiteScope ? search(debouncedQuery) : []
  const hasResults = groups.length > 0

  function handleSubmit(event) {
    event.preventDefault()
    const externalUrl = buildExternalSearchUrl(scope, query)
    if (externalUrl && query.trim()) {
      window.location.href = externalUrl
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-label="Recherche dans le site"
      maxWidth="sm"
      fullWidth
      scroll="paper"
      slotProps={{
        // Fond flouté plutôt qu'un simple assombrissement : garde le reste du
        // site visible en arrière-plan sans distraire de la recherche.
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(15, 17, 20, 0.4)',
          },
        },
        paper: {
          sx: {
            borderRadius: 3,
            m: 2,
            p: 3,
            minHeight: '60vh',
            maxHeight: '80vh',
          },
        },
      }}
    >
      {/* Switch de portée : où envoyer la recherche */}
      <ScopeSwitch value={scope} exclusive onChange={(event, value) => value && setScope(value)} aria-label="Rechercher dans" sx={{ mb: 2, flexWrap: 'wrap' }}>
        {SEARCH_SCOPES.map(scopeOption => (
          <ToggleButton key={scopeOption.key} value={scopeOption.key}>
            <ScopeIcon scope={scopeOption} />
            {scopeOption.label}
          </ToggleButton>
        ))}
      </ScopeSwitch>

      <Stack direction="row" spacing={2} alignItems="center">
        <SearchPaper component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, color: 'text.secondary' }}>
            <MagnifyingGlassIcon size={22} />
          </Box>
          <InputBase
            inputRef={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={isSiteScope ? 'Rechercher dans le site des bibliothèques' : `Rechercher dans ${scopeLabel}`}
            fullWidth
            inputProps={{ 'aria-label': 'Rechercher' }}
            sx={{ px: 2, py: 1 }}
          />
        </SearchPaper>
        <IconButton onClick={onClose} aria-label="Fermer la recherche">
          <XIcon size={22} />
        </IconButton>
      </Stack>

      {/* Portées externes : pas de résultats en direct, juste un indice avant la redirection */}
      {!isSiteScope && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
          Appuyez sur Entrée pour lancer la recherche dans {scopeLabel}.
        </Typography>
      )}

      {isSiteScope && (
        <Box sx={{ mt: 3, overflowY: 'auto' }}>
          {isLoading && (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ color: 'text.secondary' }}>
              <CircularProgress size={20} />
              <Typography>Chargement de l'index de recherche…</Typography>
            </Stack>
          )}

          {!isLoading && debouncedQuery && !hasResults && <Typography sx={{ color: 'text.secondary' }}>Aucun résultat pour « {debouncedQuery} »</Typography>}

          {!isLoading &&
            groups.map(({ section, items }) => (
              <Box key={section} sx={{ mb: 3 }}>
                <Typography component="h3" variant="overline" sx={{ color: 'text.secondary' }}>
                  {section}
                </Typography>
                <Stack spacing={0.5} divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />} sx={{ mt: 1 }}>
                  {items.map(item => (
                    <Link key={item.url} to={item.url} onClick={onClose} sx={{ display: 'block', py: 1.25 }}>
                      <Typography variant="subtitle1" component="span" sx={{ display: 'block', fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                      {item.excerpt && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }} noWrap>
                          {item.excerpt}
                        </Typography>
                      )}
                    </Link>
                  ))}
                </Stack>
              </Box>
            ))}
        </Box>
      )}
    </Dialog>
  )
}
