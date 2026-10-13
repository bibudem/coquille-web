import { useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { useInView } from 'react-intersection-observer'
import { hasStudioSpace, haversine } from './horaires'

// La vue par défaut reste centrée sur Montréal : Saint-Hyacinthe (~50 km)
// garde son marqueur mais n'entre pas dans le cadrage automatique, pour ne
// pas imposer un dézoom énorme.
const MTL_REF = { lat: 45.5045407, lng: -73.6138466 } // BLSH
const FOCUS_MAX_KM = 30
const RADIUS = 8

function isFocused(lieu) {
  return haversine(MTL_REF.lat, MTL_REF.lng, lieu.lat, lieu.lng) <= FOCUS_MAX_KM
}

// Les lieux d'un même pavillon (la BLSH et les Livres rares, au pavillon
// Samuel-Bronfman) partagent un seul marqueur, dont la bulle les liste tous :
// deux marqueurs presque superposés seraient impossibles à distinguer.
function groupByBuilding(lieux) {
  const groups = new Map()
  for (const lieu of lieux) {
    const key = lieu.pavillon ?? lieu.id
    if (!groups.has(key)) groups.set(key, { key, pavillon: lieu.pavillon, lat: lieu.lat, lng: lieu.lng, lieux: [] })
    groups.get(key).lieux.push(lieu)
  }
  return [...groups.values()]
}

function fitTo(map, lieux, extra = []) {
  const focused = lieux.filter(isFocused)
  const points = (focused.length ? focused : lieux).map((l) => [l.lat, l.lng]).concat(extra)
  if (points.length) map.fitBounds(points, { padding: [24, 24], maxZoom: 16 })
}

// La feuille de style de Leaflet vient de jsDelivr, comme les composants
// bibudem/ui chargés par HtmlHead. Importée par webpack, elle finirait dans
// le styles.css que Gatsby intègre à chaque page du site (~14 Ko de plus
// partout) au lieu de la seule page /horaires. La version suit celle du
// paquet npm installé.
function loadLeafletCss(version) {
  const id = 'bib-leaflet-css'
  const existing = document.getElementById(id)
  if (existing) return existing.dataset.loaded ? Promise.resolve() : new Promise((resolve) => existing.addEventListener('load', resolve, { once: true }))
  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = `https://cdn.jsdelivr.net/npm/leaflet@${version}/dist/leaflet.css`
    link.crossOrigin = 'anonymous'
    link.addEventListener('load', () => {
      link.dataset.loaded = 'true'
      resolve()
    })
    // En cas d'échec, la carte s'affiche quand même, sans ses styles.
    link.addEventListener('error', resolve)
    document.head.append(link)
  })
}

// Leaflet touche à `window` dès son import : on le charge dans un effet,
// jamais au SSR, et seulement quand la carte approche de l'écran (Leaflet,
// sa feuille de style et les tuiles ne sont pas téléchargés sinon). Les
// marqueurs sont des cercles vectoriels, ce qui évite les images d'icônes de
// Leaflet que webpack ne sait pas résoudre.
export default function CarteLeaflet({ lieux, visibleIds, filter, userPos, focus, onSelect }) {
  const theme = useTheme()
  const containerRef = useRef(null)
  // On n'observe la carte qu'une fois la page entièrement chargée : avant
  // l'arrivée de la photo du SuperHero et des polices, la page est plus
  // courte et la carte passerait un instant dans la zone visible.
  const [pageLoaded, setPageLoaded] = useState(false)
  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageLoaded(true)
      return undefined
    }
    const onLoad = () => setPageLoaded(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [])
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, skip: !pageLoaded })
  const setContainer = (node) => {
    containerRef.current = node
    inViewRef(node)
  }
  const groups = useMemo(() => groupByBuilding(lieux), [lieux])
  const groupOf = useMemo(() => Object.fromEntries(groups.flatMap((g) => g.lieux.map((l) => [l.id, g]))), [groups])
  const mapRef = useRef(null)
  // Passe à true une fois Leaflet chargé : les effets suivants attendent la carte.
  const [ready, setReady] = useState(false)
  const markersRef = useRef({})
  const userMarkerRef = useRef(null)
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  const { palette } = theme
  // Contour bleu foncé sur tous les marqueurs : le vert, le jaune, le violet
  // et l'orange n'atteignent pas 3:1 sur le gris des tuiles (WCAG 1.4.11).
  const stroke = palette.bleuFonce.main
  // Couleur d'un marqueur d'après les lieux visibles de son pavillon.
  const colorFor = (shown) => {
    if (filter === 'studios' && shown.some(hasStudioSpace)) return { fill: palette.jaune.main, stroke }
    const zone = shown[0]?.zone
    if (zone === 'conservation') return { fill: palette.vertPale.main, stroke }
    if (zone === 'points-service') return { fill: palette.violetFonce.main, stroke }
    return { fill: palette.bleuPrincipal.main, stroke }
  }
  const colorForRef = useRef(colorFor)
  colorForRef.current = colorFor

  // Contenu de la bulle, construit en DOM : de vrais boutons, reliés au
  // gestionnaire React, plutôt qu'un onclick dans une chaîne HTML. Un seul
  // lieu : son nom et « Voir la fiche ». Plusieurs : le pavillon, puis un
  // bouton par lieu visible.
  const popupFor = (map, group, shown) => {
    const content = document.createElement('div')
    const title = document.createElement('strong')
    const button = (label, lieu) => {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'bib-carte-popup-link'
      b.textContent = label
      b.addEventListener('click', () => {
        map.closePopup()
        onSelectRef.current(lieu.id)
      })
      return b
    }
    if (shown.length === 1) {
      title.textContent = shown[0].name
      content.append(title, document.createElement('br'), button('Voir la fiche', shown[0]))
    } else {
      title.textContent = group.pavillon
      const list = document.createElement('ul')
      list.className = 'bib-carte-popup-liste'
      shown.forEach((lieu) => {
        const item = document.createElement('li')
        item.append(button(lieu.name, lieu))
        list.append(item)
      })
      content.append(title, list)
    }
    return content
  }
  const popupForRef = useRef(popupFor)
  popupForRef.current = popupFor

  // Création de la carte, une seule fois, quand elle approche de l'écran.
  useEffect(() => {
    if (!inView) return undefined
    let cancelled = false
    let map

    async function init() {
      const { default: L } = await import('leaflet')
      await loadLeafletCss(L.version)
      if (cancelled || !containerRef.current) return

      map = L.map(containerRef.current, { scrollWheelZoom: false, zoomControl: false })
      L.control.zoom({ position: 'topright', zoomInTitle: 'Zoom avant', zoomOutTitle: 'Zoom arrière' }).addTo(map)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        attribution: 'Tuiles &copy; Esri',
      }).addTo(map)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
      }).addTo(map)

      groups.forEach((group) => {
        const { fill, stroke } = colorForRef.current(group.lieux)
        const marker = L.circleMarker([group.lat, group.lng], { radius: RADIUS, color: stroke, weight: 2, fillColor: fill, fillOpacity: 1 }).addTo(map)
        marker.bindPopup(popupForRef.current(map, group, group.lieux))
        marker.on('mouseover', () => marker.setRadius(RADIUS + 3))
        marker.on('mouseout', () => marker.setRadius(RADIUS))
        markersRef.current[group.key] = marker
      })

      fitTo(map, lieux)
      mapRef.current = map
      setReady(true)
      // Le conteneur peut avoir changé de taille pendant le chargement.
      setTimeout(() => !cancelled && map.invalidateSize(), 100)
    }
    init()

    return () => {
      cancelled = true
      map?.remove()
      mapRef.current = null
      markersRef.current = {}
      userMarkerRef.current = null
    }
    // La liste des lieux est statique : la carte n'est créée qu'une fois.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  // Filtre : affiche, masque et recolore les marqueurs, puis recadre.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const visible = []
    groups.forEach((group) => {
      const marker = markersRef.current[group.key]
      if (!marker) return
      const shown = group.lieux.filter((l) => visibleIds.has(l.id))
      if (shown.length && !map.hasLayer(marker)) marker.addTo(map)
      if (!shown.length && map.hasLayer(marker)) map.removeLayer(marker)
      if (!shown.length) return
      const { fill, stroke } = colorForRef.current(shown)
      marker.setStyle({ fillColor: fill, color: stroke })
      marker.setPopupContent(popupForRef.current(map, group, shown))
      visible.push(group)
    })
    fitTo(map, visible, userPos ? [[userPos.lat, userPos.lng]] : [])
  }, [ready, groups, visibleIds, filter, userPos])

  // Position de la personne.
  useEffect(() => {
    const map = mapRef.current
    if (!map || !userPos) return
    import('leaflet').then(({ default: L }) => {
      userMarkerRef.current?.remove()
      userMarkerRef.current = L.circleMarker([userPos.lat, userPos.lng], {
        radius: RADIUS + 1,
        color: palette.bleuFonce.main,
        weight: 3,
        fillColor: palette.rougeOrange.main,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup('Votre position')
    })
  }, [ready, userPos, palette.rougeOrange.main, palette.bleuFonce.main])

  // « Voir sur la carte » depuis une fiche.
  useEffect(() => {
    const map = mapRef.current
    const marker = focus && markersRef.current[groupOf[focus.id]?.key]
    if (!map || !marker) return
    map.setView(marker.getLatLng(), Math.max(map.getZoom(), 15))
    marker.openPopup()
  }, [ready, focus, groupOf])

  return (
    <Box
      ref={setContainer}
      role="region"
      aria-label="Carte des bibliothèques. La liste qui suit donne les mêmes renseignements."
      sx={(theme) => ({
        height: { xs: 400, md: 560 },
        width: '100%',
        borderRadius: theme.shape.corner.small,
        overflow: 'hidden',
        backgroundColor: 'bleu100.main',
        // La carte reste sous l'en-tête collant et le menu du site.
        zIndex: 0,
        position: 'relative',
        '& .leaflet-container': { fontFamily: 'inherit' },
        '& .leaflet-popup-content-wrapper, & .leaflet-popup-tip': { borderRadius: theme.shape.corner['extra-small'] },
        '& .leaflet-popup-content': { fontFamily: theme.typography.fontFamily, fontSize: '0.875rem', color: 'text.primary' },
        '& .bib-carte-popup-liste': { listStyle: 'none', p: 0, m: 0, mt: 0.5, display: 'grid', gap: 0.5 },
        '& .bib-carte-popup-link': {
          all: 'unset',
          cursor: 'pointer',
          marginTop: '4px',
          color: 'bleuPrincipal.main',
          fontWeight: 600,
          '&:hover': { textDecoration: 'underline' },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'bleuPrincipal.main', outlineOffset: '2px' },
        },
        // Liens du crédit de la carte soulignés : la couleur seule ne suffit
        // pas à les distinguer du texte (WCAG 1.4.1).
        '& .leaflet-control-attribution a': { textDecoration: 'underline' },
        '& .leaflet-control-zoom a': {
          color: 'bleuPrincipal.main',
          borderRadius: theme.shape.corner['extra-small'],
        },
      })}
    />
  )
}
