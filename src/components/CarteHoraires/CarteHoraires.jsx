import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ClockIcon } from '@phosphor-icons/react/dist/csr/Clock'
import { CrosshairIcon } from '@phosphor-icons/react/dist/csr/Crosshair'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import LayoutContainer from '@/components/utils/LayoutContainer'
import Link from '@/components/Link'
import CarteLeaflet from './CarteLeaflet'
import FicheLieu from './FicheLieu'
import useHoraires from './useHoraires'
import { formatDistance, haversine, matchesFilter, matchesQuery, montrealNow, normalize, otherServicesToday, statusFor } from './horaires'
import DonneesStructurees from './DonneesStructurees'
import LIEUX from './points-de-service.json'

// Le Prêt entre bibliothèques est un service, pas un lieu : il n'a ni
// adresse ni marqueur, et il est présenté à part, sous la liste des lieux.
const LIEUX_PHYSIQUES = LIEUX.filter((l) => l.zone !== 'service')
const SERVICES = LIEUX.filter((l) => l.zone === 'service')

// La pastille reprend la couleur des marqueurs de la carte (voir
// CarteLeaflet.jsx) : les filtres servent aussi de légende.
const FILTERS = [
  ['all', `Tous les lieux (${LIEUX_PHYSIQUES.length})`],
  ['library', 'Bibliothèques', 'bleuPrincipal.main'],
  ['conservation', 'Centres de conservation', 'vertPale.main'],
  ['studios', 'Studios et ateliers', 'jaune.main'],
  ['points-service', 'Points de service', 'violetFonce.main'],
]

function Pastille({ color }) {
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: color, border: '2px solid', borderColor: 'bleuFonce.main', flex: '0 0 auto' }}
    />
  )
}

// Tri alphabétique sur le nom propre : « Bibliothèque de droit » se range à D,
// « Bibliothèque Hubert-Reeves » à H, comme dans l'ancienne liste.
const PREFIXE = /^(bibliothèque|point de service|service du)\s+(de la |de l'|des |du |de |d'|l')?/i
const sortKey = (lieu) => lieu.name.replace(PREFIXE, '')

// Les bibliothèques d'abord ; les centres de conservation, les points de
// service et le Prêt entre bibliothèques (un service, pas un lieu) en fin
// de liste.
const ZONE_ORDER = { conservation: 1, 'points-service': 2, service: 3 }
const zoneRank = (lieu) => ZONE_ORDER[lieu.zone] ?? 0
const compareLieux = (a, b) => zoneRank(a) - zoneRank(b) || sortKey(a).localeCompare(sortKey(b), 'fr', { sensitivity: 'base' })

// Suggestions de la recherche : mêmes règles que le filtrage de la liste
// (voir matchesQuery). Rien tant qu'on n'a rien tapé.
const MAX_SUGGESTIONS = 8
function suggestions(options, { inputValue }) {
  const q = normalize(inputValue.trim())
  if (!q) return []
  return options.filter((l) => matchesQuery(l, q)).slice(0, MAX_SUGGESTIONS)
}

const isOpen = (status) => status?.state === 'open' || status?.state === 'closing-soon'

const LIEUX_SUR_CARTE = LIEUX.filter((l) => l.lat != null && l.lng != null)
const HIGHLIGHT_MS = 1600
const CLOCK_MS = 30 * 1000

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function chipSx(active) {
  return {
    fontWeight: 600,
    fontSize: '0.875rem',
    height: 40,
    px: 1,
    '& .MuiChip-icon': { ml: 0.75, mr: -0.25 },
    borderColor: 'bleuPrincipal.main',
    color: active ? 'common.white' : 'bleuPrincipal.main',
    backgroundColor: active ? 'bleuPrincipal.main' : 'common.white',
    '&:hover': { backgroundColor: active ? 'bleuPrincipal.dark' : 'bleu100.main' },
    '&.MuiChip-clickable:hover': { backgroundColor: active ? 'bleuPrincipal.dark' : 'bleu100.main' },
  }
}

const sectionTitle = { fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 600, lineHeight: 1.2, mt: 0, mb: 2 }

export default function CarteHoraires() {
  // L'heure n'existe que côté client : au SSR (et au premier rendu), les
  // fiches sont rendues sans statut, ce qui garde le HTML identique à
  // l'hydratation.
  const [now, setNow] = useState(null)
  const [platform, setPlatform] = useState(null)
  const [userPos, setUserPos] = useState(null)
  const [locateState, setLocateState] = useState({ busy: false, message: '' })
  const [filter, setFilter] = useState('all')
  const [openOnly, setOpenOnly] = useState(false)
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(null)
  const [mapFocus, setMapFocus] = useState(null)
  const mapSectionRef = useRef(null)
  const highlightTimer = useRef(null)

  useEffect(() => {
    const tick = () => setNow(montrealNow())
    tick()
    const id = setInterval(tick, CLOCK_MS)

    const ua = navigator.userAgent || ''
    if (/iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && navigator.maxTouchPoints > 1)) setPlatform('ios')
    else if (/android/i.test(ua)) setPlatform('android')

    return () => {
      clearInterval(id)
      clearTimeout(highlightTimer.current)
    }
  }, [])

  const { horaires, dates, error: hoursError, ensureWeek, isWeekLoaded } = useHoraires(now?.dateStr)

  const distances = useMemo(() => {
    if (!userPos) return {}
    return Object.fromEntries(LIEUX_SUR_CARTE.map((l) => [l.id, haversine(userPos.lat, userPos.lng, l.lat, l.lng)]))
  }, [userPos])

  const statusOf = useCallback(
    (lieu) => {
      if (!now) return null
      if (lieu.codeBib && !horaires && !hoursError) return null
      return statusFor(lieu, horaires, now, dates)
    },
    [now, horaires, hoursError, dates]
  )

  // Le filtre « Ouvert maintenant » n'est utilisable qu'une fois les statuts
  // connus (heure de Montréal et horaires chargés).
  const statusReady = Boolean(now && horaires)
  const keep = useCallback((l) => matchesFilter(l, filter) && (!openOnly || isOpen(statusOf(l))), [filter, openOnly, statusOf])

  const byFilter = useMemo(() => LIEUX_PHYSIQUES.filter(keep), [keep])
  const visibleIds = useMemo(() => new Set(byFilter.map((l) => l.id)), [byFilter])
  const q = normalize(query.trim())

  const list = useMemo(() => {
    const sorted = byFilter.filter((l) => matchesQuery(l, q))
    if (userPos) sorted.sort((a, b) => (distances[a.id] ?? Infinity) - (distances[b.id] ?? Infinity))
    else sorted.sort(compareLieux)
    return sorted
  }, [byFilter, q, userPos, distances])

  // Le service (PEB) suit la recherche et « Ouvert maintenant », mais pas les
  // filtres de lieux : il n'est ni une bibliothèque ni un point de service.
  const services = SERVICES.filter((l) => filter === 'all' && matchesQuery(l, q) && (!openOnly || isOpen(statusOf(l))))

  const byDistance = useMemo(() => {
    if (!userPos) return []
    return byFilter.filter((l) => distances[l.id] != null).sort((a, b) => distances[a.id] - distances[b.id])
  }, [byFilter, userPos, distances])
  const nearest = byDistance.slice(0, 3)

  // Si aucun des trois plus proches n'est ouvert, on signale le lieu ouvert
  // le plus proche.
  const nearestOpen = statusReady && !nearest.some((l) => isOpen(statusOf(l))) ? byDistance.find((l) => isOpen(statusOf(l))) : null

  function locate() {
    if (!navigator.geolocation) {
      setLocateState({ busy: false, message: 'La géolocalisation n’est pas offerte par ce navigateur.' })
      return
    }
    setLocateState({ busy: true, message: 'Localisation en cours…' })
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocateState({ busy: false, message: 'Position obtenue. Les lieux sont triés du plus proche au plus éloigné.' })
      },
      (err) => {
        setLocateState({
          busy: false,
          message: err.code === err.PERMISSION_DENIED ? 'Vous avez refusé l’accès à votre position.' : 'Votre position est indisponible pour le moment.',
        })
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  // Amène une fiche à l'écran, la met en évidence et lui donne le focus :
  // une personne au clavier continue sa lecture à partir de la fiche.
  const goToFiche = useCallback((id) => {
    const card = document.getElementById(id)
    if (!card) return
    card.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' })
    card.focus({ preventScroll: true })
    // On garde history.state : Gatsby y range la clé de la page.
    window.history.replaceState(window.history.state, '', `#${id}`)
    setHighlighted(id)
    clearTimeout(highlightTimer.current)
    highlightTimer.current = setTimeout(() => setHighlighted(null), HIGHLIGHT_MS)
  }, [])

  // Une suggestion choisie : on retire les filtres (le lieu pourrait en être
  // exclu), puis on amène la fiche à l'écran une fois la liste mise à jour.
  function choisirLieu(lieu) {
    setFilter('all')
    setOpenOnly(false)
    setTimeout(() => goToFiche(lieu.id), 0)
  }

  const showOnMap = useCallback((id) => {
    mapSectionRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' })
    // Un nouvel objet à chaque clic : un second clic sur la même fiche recentre la carte.
    setMapFocus({ id })
  }, [])

  const extraOf = (lieu) => (now && horaires && lieu.codeBib ? otherServicesToday(lieu, horaires, now) : null)

  return (
    <LayoutContainer>
      <Box sx={{ pt: { xs: 3, md: 8 }, pb: { xs: 3, md: 5 } }} data-clarity-unmask="true">
        {/* Barre d'outils */}
        <Box
          role="search"
          sx={(theme) => ({
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
            p: { xs: 2, md: 3 },
            mb: 4,
            backgroundColor: 'bleu100.main',
            borderRadius: theme.shape.corner.medium,
          })}
        >
          <Button
            variant="contained"
            onClick={locate}
            disabled={locateState.busy}
            startIcon={<CrosshairIcon aria-hidden="true" />}
            sx={(theme) => ({ mt: 0, borderRadius: theme.shape.corner.full, backgroundColor: 'bleuPrincipal.main', flex: '0 0 auto' })}
          >
            {userPos ? 'Mettre à jour ma position' : 'Me localiser'}
          </Button>
          <Autocomplete
            freeSolo
            options={LIEUX}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
            filterOptions={suggestions}
            inputValue={query}
            onInputChange={(_, value) => setQuery(value)}
            onChange={(_, value) => {
              if (value && typeof value !== 'string') choisirLieu(value)
            }}
            renderOption={({ key, ...props }, option) => (
              <li key={key} {...props}>
                <div>
                  <Typography component="span" sx={{ display: 'block', fontWeight: 600 }}>
                    {option.name}
                  </Typography>
                  {option.addr && (
                    <Typography component="span" variant="body2" sx={{ display: 'block', color: 'text.secondary' }}>
                      {option.addr}
                    </Typography>
                  )}
                </div>
              </li>
            )}
            sx={{ flex: '1 1 260px' }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Rechercher un lieu"
                size="small"
                sx={(theme) => ({
                  '& .MuiOutlinedInput-root': { borderRadius: theme.shape.corner.full, backgroundColor: 'common.white', pl: 1.5 },
                  // Le texte indicatif sert d'étiquette visible : contraste AA
                  // (5,7:1) au lieu du gris pâle par défaut de MUI.
                  '& .MuiInputBase-input::placeholder': { color: 'text.secondary', opacity: 1 },
                })}
                inputProps={{ ...params.inputProps, 'aria-label': 'Rechercher un lieu par nom ou adresse' }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <MagnifyingGlassIcon aria-hidden="true" size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Typography role="status" variant="body2" sx={{ flexBasis: '100%', color: 'text.secondary', minHeight: '1.5em', '&:empty': { display: 'none' } }}>
            {locateState.message}
          </Typography>
          <Typography variant="body2" component="p" sx={{ flexBasis: '100%', color: 'text.secondary', mt: -1 }}>
            Votre position sert uniquement à calculer les distances dans votre navigateur. Elle n’est ni enregistrée ni transmise.
          </Typography>
        </Box>

        {/* Les plus proches */}
        {nearest.length > 0 && (
          <Box component="section" aria-labelledby="plus-proches-titre" sx={{ mb: 5 }}>
            <Typography id="plus-proches-titre" component="h2" sx={sectionTitle}>
              Les plus proches de vous
            </Typography>
            {nearestOpen && (
              <Typography component="p" sx={{ mb: 2 }}>
                Aucun de ces lieux n’est ouvert en ce moment. Le lieu ouvert le plus proche est{' '}
                <Link to={`#${nearestOpen.id}`} onClick={(e) => { e.preventDefault(); goToFiche(nearestOpen.id) }} sx={{ fontWeight: 600 }}>
                  {nearestOpen.name}
                </Link>
                , à {formatDistance(distances[nearestOpen.id])}.
              </Typography>
            )}
            {/* Version compacte de la fiche : même apparence que dans la liste, id préfixé et titres un niveau plus bas. */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
              {nearest.map((lieu) => (
                <FicheLieu
                  key={lieu.id}
                  lieu={lieu}
                  idPrefix="proche-"
                  headingLevel={3}
                  compact
                  status={statusOf(lieu)}
                  distance={distances[lieu.id]}
                  platform={platform}
                  onVoirFiche={goToFiche}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Pas de titre de section : celui du SuperHero (« Horaires et lieux ») suffit. */}
        <Box component="section" aria-label="Liste des lieux">
          <Box role="group" aria-label="Filtrer les lieux" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 3 }}>
            {/* Se combine avec les filtres de type de lieu. */}
            <Chip
              label="Ouvert maintenant"
              icon={<ClockIcon aria-hidden="true" size={18} color="currentColor" />}
              clickable
              disabled={!statusReady}
              onClick={() => setOpenOnly(!openOnly)}
              aria-pressed={openOnly}
              variant={openOnly ? 'filled' : 'outlined'}
              sx={{
                ...chipSx(openOnly),
                borderColor: 'success.dark',
                color: openOnly ? 'common.white' : 'success.dark',
                backgroundColor: openOnly ? 'success.dark' : 'common.white',
                '&.MuiChip-clickable:hover': { backgroundColor: openOnly ? 'success.dark' : 'bleu100.main' },
                '& .MuiChip-icon': { color: 'inherit', ml: 0.75, mr: -0.25 },
              }}
            />
            <Box aria-hidden="true" sx={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'divider', mx: 0.5 }} />
            {FILTERS.map(([key, label, color]) => {
              const active = key === filter
              return (
                <Chip
                  key={key}
                  label={label}
                  icon={color ? <Pastille color={color} /> : undefined}
                  clickable
                  onClick={() => setFilter(key)}
                  aria-pressed={active}
                  variant={active ? 'filled' : 'outlined'}
                  sx={chipSx(active)}
                />
              )
            })}
          </Box>

          <Box ref={mapSectionRef} sx={{ mb: 4, scrollMarginTop: '100px' }}>
            <CarteLeaflet lieux={LIEUX_SUR_CARTE} visibleIds={visibleIds} filter={filter} userPos={userPos} focus={mapFocus} onSelect={goToFiche} />
            {userPos && (
              <Typography variant="body2" component="p" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1.5, color: 'text.secondary' }}>
                <Pastille color="rougeOrange.main" />
                Votre position
              </Typography>
            )}
          </Box>

          <Typography role="status" variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {list.length === 0
              ? q
                ? `Aucun lieu ne correspond à « ${query.trim()} ».`
                : 'Aucun lieu ne correspond à ces filtres.'
              : `${list.length} ${list.length > 1 ? 'lieux affichés' : 'lieu affiché'}`}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(2, minmax(0, 1fr))' }, gap: 2, alignItems: 'start' }}>
            {list.map((lieu) => (
              <FicheLieu
                key={lieu.id}
                lieu={lieu}
                status={statusOf(lieu)}
                extra={extraOf(lieu)}
                distance={distances[lieu.id]}
                horaires={horaires}
                dates={dates}
                today={now?.dateStr}
                hoursError={hoursError}
                ensureWeek={ensureWeek}
                isWeekLoaded={isWeekLoaded}
                platform={platform}
                highlighted={highlighted === lieu.id}
                onShowOnMap={showOnMap}
              />
            ))}
          </Box>
        </Box>

        {services.length > 0 && (
          <Box component="section" aria-labelledby="autre-service-titre" sx={{ mt: 5 }}>
            <Typography id="autre-service-titre" component="h2" sx={sectionTitle}>
              Autre service
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(2, minmax(0, 1fr))' }, gap: 2, alignItems: 'start' }}>
              {services.map((lieu) => (
                <FicheLieu
                  key={lieu.id}
                  lieu={lieu}
                  headingLevel={3}
                  status={statusOf(lieu)}
                  extra={extraOf(lieu)}
                  horaires={horaires}
                  dates={dates}
                  today={now?.dateStr}
                  hoursError={hoursError}
                  ensureWeek={ensureWeek}
                  isWeekLoaded={isWeekLoaded}
                  platform={platform}
                  highlighted={highlighted === lieu.id}
                  onShowOnMap={showOnMap}
                />
              ))}
            </Box>
          </Box>
        )}

        <DonneesStructurees lieux={LIEUX_PHYSIQUES} />
      </Box>
    </LayoutContainer>
  )
}

