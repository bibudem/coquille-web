import { useEffect, useRef, useState } from 'react'
import { Box, CircularProgress, IconButton, InputBase, Paper, Stack, SvgIcon, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material'
import { alpha, styled, useTheme } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import { HouseIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'

import Link from '@/components/Link'
import SofiaSVG from '@/icons/sofia.svg'
import ArrowRightCircleSVG from '@/icons/arrow-right-circle.svg'
import { useSearchIndex } from '@/hooks/use-search-index'
import TopAppBar from '@/components/_layout/AppBar/TopAppBar'
import TopAppBarSm from '@/components/_layout/AppBar/TopAppBarSm'
import { QuickLinks, QuickLinksSm } from '@/components/_layout/QuickLinks'
import Footer from '@/components/_layout/Footer/Footer'
import SuperHero from '@/components/_layout/SuperHero/SuperHeroLvl2'
import Breadcrumbs from '@/components/_layout/Breadcrumbs/Breadcrumbs'
import LayoutContainer from '@/components/utils/LayoutContainer'

const BREADCRUMB_CRUMBS = [
  { pathname: '/', crumbLabel: 'Accueil' },
  { pathname: '/rechercher/', crumbLabel: 'Recherche' },
]

const DEBOUNCE_MS = 200

// ---------------------------------------------------------------------------
// Portées de recherche proposées par le switch : "site" cherche en direct
// dans l'index MiniSearch (useSearchIndex) ; les trois autres redirigent, à
// la soumission du formulaire, vers la vraie page de résultats de ces sites
// externes (URLs confirmées en inspectant leurs formulaires, pas devinées).
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

// Lit la recherche courante (`q`, `scope`) depuis l'URL : c'est la source de
// vérité au chargement et lors d'un retour arrière, pour que la page restaure
// exactement la recherche visitée plutôt qu'un état vide.
function readSearchParams() {
  if (typeof window === 'undefined') return { q: '', scope: 'site' }
  const params = new URLSearchParams(window.location.search)
  const scope = params.get('scope')
  return {
    q: params.get('q') ?? '',
    scope: SEARCH_SCOPES.some(s => s.key === scope) ? scope : 'site',
  }
}

const SearchPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  borderRadius: theme.shape.corner.full,
  border: `1px solid ${theme.palette.divider}`,
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
  },
}))

// Segmented control pour le switch de portée, dimensionné généreusement
// (plus grand que le ToggleButton par défaut de MUI) pour se voir comme le
// point d'entrée principal de la page. Sélection à couleur fixe (bleuFonce)
// pour toutes les options plutôt que la couleur propre à chaque portée : plus
// cohérent visuellement d'un bouton à l'autre.
const ScopeSwitch = styled(ToggleButtonGroup)(({ theme }) => ({
  padding: 6,
  gap: 6,
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.corner.full,
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

// Une ligne de résultat (titre + extrait + flèche). La flèche reprend la
// même pastille que les autres listes du site (voir ListeNouvelles.jsx),
// importée directement plutôt que via le composant partagé CustomIcons dont
// le prop-passing est cassé. `viewBox` explicite car le SVG source n'en
// déclare pas — sans lui, le cercle s'étirait en ovale. Purement décorative
// (aria-hidden) : le lien porte déjà tout le contenu accessible.
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
        // Survol ET focus clavier animent la flèche, pour le même indice
        // visuel de clic quel que soit le mode de navigation.
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
 * Page dédiée de recherche du site (/rechercher/), avec un champ de saisie et
 * des résultats en direct groupés par section, fournis par useSearchIndex.
 * Remplace l'ancienne modale SearchOverlay : la recherche courante vit dans
 * l'URL (`?q=`/`&scope=`) plutôt que dans un état local perdu à la fermeture,
 * ce qui permet au bouton Précédent du navigateur de rejouer les recherches
 * précédentes (voir l'effet qui appelle history.pushState ci-dessous).
 */
export default function RecherchePage({ location }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const inputRef = useRef(null)

  const [{ q: initialQuery, scope: initialScope }] = useState(readSearchParams)
  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [scope, setScope] = useState(initialScope)

  const { search, isLoading } = useSearchIndex()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Restaure la recherche affichée quand l'utilisateur navigue avec
  // Précédent/Suivant (l'historique est alimenté par l'effet plus bas).
  useEffect(() => {
    function handlePopState() {
      const restored = readSearchParams()
      setQuery(restored.q)
      setDebouncedQuery(restored.q)
      setScope(restored.scope)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Attend une pause dans la frappe avant de lancer la recherche, pour éviter
  // de ré-interroger MiniSearch à chaque caractère tapé.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [query])

  // Reflète la recherche courante dans l'URL une fois la frappe stabilisée :
  // une entrée d'historique par recherche distincte (le bouton Précédent peut
  // ainsi les rejouer), mais un simple remplacement quand le champ est vide
  // pour ne pas polluer l'historique avec des états transitoires.
  useEffect(() => {
    const current = readSearchParams()
    if (debouncedQuery === current.q && scope === current.scope) return

    const params = new URLSearchParams()
    if (debouncedQuery) params.set('q', debouncedQuery)
    if (scope !== 'site') params.set('scope', scope)
    const newUrl = `${window.location.pathname}${params.size ? `?${params}` : ''}`

    if (debouncedQuery.trim()) {
      window.history.pushState(null, '', newUrl)
    } else {
      window.history.replaceState(null, '', newUrl)
    }
  }, [debouncedQuery, scope])

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

  function handleSubmit(event) {
    event.preventDefault()
    const externalUrl = buildExternalSearchUrl(scope, query)
    if (externalUrl && query.trim()) {
      window.location.href = externalUrl
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isSmallScreen ? (
        <>
          <TopAppBarSm />
          <QuickLinksSm />
        </>
      ) : (
        <>
          <TopAppBar />
          <QuickLinks />
        </>
      )}

      {/* Hero et fil d'Ariane masqués sur mobile : la bannière d'image perd son
          intérêt visuel une fois réduite à une bande grise, et le fil d'Ariane
          prend une place disproportionnée sur un petit écran pour ce qu'il
          apporte ici. */}
      {!isSmallScreen && <SuperHero title="Recherche" imageName="default" />}

      <Box sx={{ flex: 1, pt: { xs: '40px', md: '28px' } }}>
        <LayoutContainer>
          {!isSmallScreen && <Breadcrumbs crumbs={BREADCRUMB_CRUMBS} location={location} />}

          <Box component="main" role="main" sx={{ maxWidth: 960, mx: 'auto', pb: { xs: 4, md: 8 } }}>
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
              <Box sx={{ mt: 3 }}>
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
          </Box>
        </LayoutContainer>
      </Box>

      <Footer />
    </Box>
  )
}

export const Head = () => (
  <>
    <title>Recherche - Les bibliothèques</title>
    {/* Page de résultats dynamiques : pas de contenu propre à indexer par les moteurs externes */}
    <meta name="robots" content="noindex, nofollow" />
  </>
)
