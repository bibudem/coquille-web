import { useEffect, useRef, useState } from 'react'
import { Box, CircularProgress, Dialog, IconButton, InputBase, Paper, Stack, SvgIcon, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import { HouseIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'

import Link from '@/components/Link'
import SofiaSVG from '@/icons/sofia.svg'
import ArrowRightCircleSVG from '@/icons/arrow-right-circle.svg'
import { useSearchIndex } from '@/hooks/use-search-index'

const DEBOUNCE_MS = 200

// Clés de requête dédiées à cette modale (préfixées `s`) pour ne pas entrer
// en collision avec un `?q=` propre à la page visitée (ex. RepertoirePersonnel).
const PARAM_OPEN = 'search'
const PARAM_QUERY = 'sq'
const PARAM_SCOPE = 'sscope'

// ---------------------------------------------------------------------------
// Données des portées de recherche : "site" cherche en direct dans l'index
// MiniSearch (useSearchIndex) ; les trois autres redirigent, à la soumission
// du formulaire, vers la vraie page de résultats de ces sites externes (URLs
// confirmées en inspectant leurs formulaires, pas devinées).
//
// Chaque entrée a soit un `Icon` Phosphor, soit un `dotColor` (jamais les
// deux) pour le switch, et un `color` (clé de palette) qui teinte cette
// sélection et la carte de description. Sofia n'a ni l'un ni l'autre : son
// icône est rendue à part (voir ScopeIcon), le composant partagé SofiaIcon
// (@/components/CustomIcons) ayant un bug qui ignore ses props.
// ---------------------------------------------------------------------------
const SEARCH_SCOPES = [
  {
    key: 'site',
    label: 'Site principal',
    Icon: HouseIcon,
    color: 'bleuFonce',
    description:
      "Le site principal des bibliothèques : point de départ pour découvrir nos services et réserver les espaces de travail. Il regroupe l'information en volets pratiques, selon votre occupation à l'Université : études, enseignement, recherche.",
  },
  {
    key: 'sofia',
    label: 'Sofia',
    color: 'bleuPrincipal',
    description:
      "L'outil de recherche des bibliothèques universitaires québécoises, Sofia, permet de rechercher des livres, articles, partitions et autres médias, physiques ou numériques, dans toutes les collections et bases de données de l'Université de Montréal. Une fonction permet d'étendre la recherche à toutes les bibliothèques universitaires québécoises, voire aux bibliothèques dans le monde.",
  },
  {
    key: 'outils',
    label: 'Boîte à outils',
    dotColor: 'rougeOrange.main',
    color: 'rougeOrange',
    description:
      "Un ensemble de guides et ressources pour trouver et évaluer l'information pertinente pour les études et la recherche, dont notre guide sur l'intelligence artificielle générative et les guides de citation.",
  },
  {
    key: 'studio',
    label: 'Studio-bib',
    dotColor: 'jaune.main',
    color: 'jaune',
    description:
      'Le site pour obtenir du soutien informatique de base (accès au courriel, au wifi, au proxy/VPN) comme des procédures pour utiliser les technologies de création numérique, comme les imprimantes 3D ou la réalité virtuelle.',
  },
]

// ---------------------------------------------------------------------------
// Redirection externe et synchronisation de l'état avec l'URL
// ---------------------------------------------------------------------------
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

// Lit l'état courant de la modale depuis l'URL de la page visitée : c'est la
// source de vérité au chargement (permet un lien profond directement vers une
// recherche) et lors d'un retour arrière.
function readSearchState() {
  if (typeof window === 'undefined') return { open: false, q: '', scope: 'site' }
  const params = new URLSearchParams(window.location.search)
  const scope = params.get(PARAM_SCOPE)
  return {
    open: params.get(PARAM_OPEN) === '1',
    q: params.get(PARAM_QUERY) ?? '',
    scope: SEARCH_SCOPES.some(s => s.key === scope) ? scope : 'site',
  }
}

// Utilisé par TopAppBar/TopAppBarSm pour initialiser `searchOpen` avant même
// le premier rendu (lien profond partagé, ou retour arrière atterrissant
// directement sur cet état) — évite un flash fermé→ouvert au montage.
export function isSearchOverlayOpenInUrl() {
  return readSearchState().open
}

// ---------------------------------------------------------------------------
// Composants de présentation
// ---------------------------------------------------------------------------
const SearchPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  borderRadius: theme.shape.corner.full,
  border: `1px solid ${theme.palette.divider}`,
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
  },
}))

// Segmented control du switch de portée : dimensionné généreusement (plus
// grand que le ToggleButton par défaut de MUI) pour se voir comme le point
// d'entrée principal de la modale, sélection à couleur fixe (bleuFonce) pour
// toutes les options. Rayon du conteneur modéré plutôt que `corner.full` :
// une fois les boutons empilés sur plusieurs lignes (mobile), un rayon
// "pilule" donnait un effet de bulle grise plutôt qu'un fond discret.
const ScopeSwitch = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%', // aligné avec la largeur du champ de recherche plus bas
  padding: 6,
  gap: 6,
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.corner.medium,
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: `${theme.shape.corner.full} !important`,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.9375rem',
    color: theme.palette.text.secondary,
    padding: '0.75rem 1.375rem',
    gap: '0.5rem',
    transition: theme.transitions.create(['background-color', 'color']),
    // En dessous de `sm`, grille de 2 colonnes plutôt qu'une pile d'une
    // option par ligne : boutons plus compacts et espace vertical repris.
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 calc(50% - 3px)',
      padding: '0.625rem 0.75rem',
      fontSize: '0.8125rem',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.bleuFonce.main,
      color: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.bleuFonce.main,
      },
    },
  },
}))

// Icône (ou pastille de couleur) d'une option du switch de portée.
function ScopeIcon({ scope, size = 16 }) {
  if (scope.key === 'sofia') {
    // Rendu direct du SVG source : le composant SofiaIcon partagé ignore ses
    // props de taille (bug préexistant), donc on passe par SvgIcon nous-mêmes.
    return <SvgIcon component={SofiaSVG} inheritViewBox aria-hidden sx={{ fontSize: size }} />
  }
  if (scope.dotColor) {
    const dotSize = Math.round(size * 0.625)
    return <Box aria-hidden component="span" sx={{ width: dotSize, height: dotSize, borderRadius: '50%', backgroundColor: scope.dotColor, flexShrink: 0 }} />
  }
  if (scope.Icon) {
    return <scope.Icon size={size} aria-hidden="true" />
  }
  return null
}

// Étiquette + switch de portée.
function ScopeSelector({ scope, onScopeChange }) {
  return (
    <Box sx={{ pb: 1 }}>
      <Typography id="search-scope-label" variant="overline" sx={{ display: 'block', color: 'text.secondary', mb: 1 }}>
        Rechercher dans
      </Typography>

      <ScopeSwitch
        value={scope}
        exclusive
        onChange={(event, value) => value && onScopeChange(value)}
        aria-labelledby="search-scope-label"
        aria-describedby="search-scope-description"
        sx={{ mb: 1.5, flexWrap: 'wrap' }}
      >
        {SEARCH_SCOPES.map(scopeOption => (
          <ToggleButton key={scopeOption.key} value={scopeOption.key}>
            <ScopeIcon scope={scopeOption} size={20} />
            {scopeOption.label}
          </ToggleButton>
        ))}
      </ScopeSwitch>
    </Box>
  )
}

// Décrit la portée sélectionnée, avec l'accent de couleur qui lui est propre
// (bordure gauche + fond teinté). Lié au switch via aria-describedby (voir
// ScopeSelector) pour que les lecteurs d'écran l'annoncent avec le contrôle.
function ScopeDescriptionCard({ scope }) {
  return (
    <Box
      sx={theme => ({
        p: 2.5,
        mb: 3,
        borderRadius: theme.shape.corner.small,
        backgroundColor: alpha(theme.palette[scope.color].main, 0.08),
        borderLeft: `4px solid ${theme.palette[scope.color].main}`,
      })}
    >
      <Typography id="search-scope-description" variant="body1" sx={{ color: 'text.primary' }}>
        {scope.description}
      </Typography>
    </Box>
  )
}

// Une ligne de résultat (titre + extrait + flèche). Pas de gestion de
// fermeture ici : cliquer navigue vers une autre page, qui démonte cette
// modale (montée dans TopAppBar/TopAppBarSm) au même titre que le reste de
// la page courante — inutile de fermer nous-mêmes, et appeler history.back()
// en même temps qu'un pushState de navigation entrerait en conflit avec lui.
// La flèche reprend la même pastille que les autres listes du site (voir
// ListeNouvelles.jsx), importée directement plutôt que via le composant
// partagé CustomIcons dont le prop-passing est cassé. `viewBox` explicite car
// le SVG source n'en déclare pas — sans lui, le cercle s'étirait en ovale.
// Purement décorative (aria-hidden) : le lien porte déjà tout le contenu
// accessible.
function SearchResultItem({ item }) {
  return (
    <Link
      to={item.url}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 1.5 },
        py: 1.25,
        outlineOffset: 2,
        '&:hover .search-result-arrow, &:focus-visible .search-result-arrow': {
          transform: 'translateX(3px)',
        },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" component="span" sx={{ display: 'block', fontWeight: 600 }}>
          {item.title}
        </Typography>
        {item.excerpt && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }} noWrap>
            {item.excerpt}
          </Typography>
        )}
      </Box>
      <SvgIcon
        component={ArrowRightCircleSVG}
        viewBox="0 0 50 51"
        aria-hidden
        className="search-result-arrow"
        sx={{
          flexShrink: 0,
          fontSize: { xs: 28, sm: 32 },
          color: 'bleuPrincipal.main',
          transition: theme => theme.transitions.create('transform'),
        }}
      />
    </Link>
  )
}

/**
 * Fenêtre de recherche du site, en popup superposé au contenu de la page
 * visitée (flouté derrière), monté dans TopAppBar/TopAppBarSm et ouvert
 * depuis SearchButton.
 *
 * L'ouverture pousse une seule entrée d'historique (`?search=1`, plus
 * `sq=`/`sscope=` mis à jour par remplacement pendant la frappe) : Échap, le
 * bouton de fermeture ou le clic sur le fond appellent tous handleClose, qui
 * fait un retour arrière pour retirer cette entrée — le popup se referme et
 * l'URL de la page visitée redevient ce qu'elle était avant l'ouverture. Un
 * lien profond direct vers `?search=1&sq=...` ouvre aussi la modale au
 * chargement (voir `open` initialisé depuis readSearchState dans les
 * composants TopAppBar/TopAppBarSm).
 */
export default function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [scope, setScope] = useState('site')
  // A-t-on nous-mêmes poussé l'entrée d'historique à l'ouverture ? Si la
  // modale s'est plutôt ouverte via un lien profond (l'URL contenait déjà
  // ?search=1 au montage), fermer ne doit pas faire un retour arrière vers
  // une page potentiellement hors du site.
  const pushedHistoryRef = useRef(false)

  const { search, isLoading } = useSearchIndex(open)

  useEffect(() => {
    if (!open) return

    const current = readSearchState()
    if (current.open) {
      // Lien profond : l'URL reflète déjà l'ouverture, on restaure son état
      // sans pousser de nouvelle entrée.
      setQuery(current.q)
      setDebouncedQuery(current.q)
      setScope(current.scope)
      pushedHistoryRef.current = false
    } else {
      setQuery('')
      setDebouncedQuery('')
      setScope('site')
      const params = new URLSearchParams(window.location.search)
      params.set(PARAM_OPEN, '1')
      window.history.pushState({ searchOverlay: true }, '', `${window.location.pathname}?${params}`)
      pushedHistoryRef.current = true
    }

    const id = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(id)
  }, [open])

  // Un retour arrière (ou un lien profond suivi d'un « suivant ») fait
  // apparaître/disparaître ?search= sur l'URL : on suit cet état plutôt que
  // de gérer l'historique nous-mêmes dans le sens navigateur → modale.
  useEffect(() => {
    function handlePopState() {
      const state = readSearchState()
      if (state.open) {
        setQuery(state.q)
        setDebouncedQuery(state.q)
        setScope(state.scope)
      } else if (open) {
        onClose()
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [open, onClose])

  // Attend une pause dans la frappe avant de lancer la recherche, pour éviter
  // de ré-interroger MiniSearch à chaque caractère tapé.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [query])

  // Reflète la recherche courante dans l'URL par remplacement (pas de
  // nouvelle entrée par frappe） : une seule entrée d'historique couvre toute
  // la session d'ouverture de la modale, pour qu'un seul retour arrière la
  // referme entièrement plutôt que de rejouer chaque recherche tapée.
  useEffect(() => {
    if (!open) return
    const params = new URLSearchParams(window.location.search)
    params.set(PARAM_OPEN, '1')
    if (debouncedQuery) params.set(PARAM_QUERY, debouncedQuery)
    else params.delete(PARAM_QUERY)
    if (scope !== 'site') params.set(PARAM_SCOPE, scope)
    else params.delete(PARAM_SCOPE)
    window.history.replaceState(null, '', `${window.location.pathname}?${params}`)
  }, [open, debouncedQuery, scope])

  const isSiteScope = scope === 'site'
  const currentScope = SEARCH_SCOPES.find(s => s.key === scope)
  const groups = isSiteScope ? search(debouncedQuery) : []
  const hasResults = groups.length > 0
  const resultCount = groups.reduce((total, group) => total + group.items.length, 0)

  // Message annoncé aux lecteurs d'écran (région live cachée ci-dessous) : la
  // liste de résultats elle-même n'est pas live pour éviter que chaque
  // titre/extrait soit relu en boucle à chaque frappe.
  let statusMessage = ''
  if (isSiteScope && isLoading) {
    statusMessage = "Chargement de l'index de recherche…"
  } else if (isSiteScope && debouncedQuery && hasResults) {
    statusMessage = `${resultCount} résultat${resultCount > 1 ? 's' : ''} trouvé${resultCount > 1 ? 's' : ''} pour « ${debouncedQuery} »`
  } else if (isSiteScope && debouncedQuery && !hasResults) {
    statusMessage = `Aucun résultat pour « ${debouncedQuery} »`
  }

  function handleClose() {
    if (pushedHistoryRef.current) {
      window.history.back()
    } else {
      const params = new URLSearchParams(window.location.search)
      params.delete(PARAM_OPEN)
      params.delete(PARAM_QUERY)
      params.delete(PARAM_SCOPE)
      const qs = params.toString()
      window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`)
      onClose()
    }
  }

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
      onClose={handleClose}
      aria-label="Recherche dans le site"
      maxWidth="md"
      fullWidth
      scroll="paper"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(15, 17, 20, 0.8)',
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
      {/* Le bouton de fermeture a sa propre ligne (plutôt que de partager
          celle du switch) pour que le switch garde toute la largeur du popup,
          alignée avec le champ de recherche plus bas. */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleClose} aria-label="Fermer la recherche">
          <XIcon size={22} />
        </IconButton>
      </Box>

      <ScopeSelector scope={scope} onScopeChange={setScope} />

      <ScopeDescriptionCard scope={currentScope} />

      <SearchPaper component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, color: 'text.secondary' }}>
          <MagnifyingGlassIcon size={22} />
        </Box>
        <InputBase
          inputRef={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={isSiteScope ? 'Rechercher dans le site des bibliothèques' : `Rechercher dans ${currentScope.label}, puis appuyez sur Entrée`}
          fullWidth
          inputProps={{ 'aria-label': 'Rechercher' }}
          sx={{ px: 2, py: 1 }}
        />
        {/* Toujours monté (plutôt que rendu conditionnellement) pour que
            l'apparition/disparition se fasse par fondu et sans décaler le
            reste du champ ; tabIndex -1 quand invisible pour ne pas capter
            le focus clavier. */}
        <IconButton
          onClick={() => {
            setQuery('')
            inputRef.current?.focus()
          }}
          aria-label="Effacer la recherche"
          size="small"
          tabIndex={query ? 0 : -1}
          sx={{
            mr: 0.75,
            alignSelf: 'center',
            color: 'text.secondary',
            opacity: query ? 1 : 0,
            pointerEvents: query ? 'auto' : 'none',
            transition: theme => theme.transitions.create('opacity'),
            '&:hover': { color: 'text.primary' },
          }}
        >
          <XIcon size={16} />
        </IconButton>
      </SearchPaper>

      {/* Annonce les changements de résultats/chargement aux lecteurs d'écran,
          sans dupliquer visuellement les messages déjà affichés plus bas. */}
      <Box role="status" aria-live="polite" sx={visuallyHidden}>
        {statusMessage}
      </Box>

      {isSiteScope && (
        <Box sx={{ mt: 3, overflowY: 'auto' }}>
          {isLoading && (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ color: 'text.secondary' }}>
              <CircularProgress size={20} />
              <Typography>Chargement de l'index de recherche…</Typography>
            </Stack>
          )}

          {!isLoading && !debouncedQuery && <Typography sx={{ color: 'text.secondary' }}>Commencez à taper pour voir apparaître des résultats.</Typography>}

          {!isLoading && debouncedQuery && !hasResults && <Typography sx={{ color: 'text.secondary' }}>Aucun résultat pour « {debouncedQuery} »</Typography>}

          {!isLoading &&
            groups.map(({ section, items }) => (
              <Box key={section} sx={{ mb: 3 }}>
                <Typography component="h3" variant="overline" sx={{ color: 'text.secondary' }}>
                  {section}
                </Typography>
                <Stack spacing={0.5} divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />} sx={{ mt: 1 }}>
                  {items.map(item => (
                    <SearchResultItem key={item.url} item={item} />
                  ))}
                </Stack>
              </Box>
            ))}
        </Box>
      )}
    </Dialog>
  )
}
