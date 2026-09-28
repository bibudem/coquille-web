// Logique des horaires de la page /horaires : fonctions pures, sans React.
//
// Toutes les dates sont manipulées sous forme de chaînes « AAAA-MM-JJ » et
// toutes les heures en minutes depuis minuit, dans le fuseau de Montréal.
// On évite ainsi les objets Date locaux : l'heure du navigateur n'est pas
// forcément celle de Montréal, et `toISOString()` (UTC) décale la date d'un
// jour chaque soir.

export const HORAIRES_API = 'https://api.bib.umontreal.ca/horaires'

const TIME_ZONE = 'America/Montreal'
const CLOSING_SOON_MIN = 30

const montrealFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

// Date et heure courantes à Montréal, quel que soit le fuseau du navigateur.
export function montrealNow(date = new Date()) {
  const parts = Object.fromEntries(montrealFormatter.formatToParts(date).map(({ type, value }) => [type, value]))
  return {
    dateStr: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  }
}

// Les calculs de jours passent par UTC, où il n'y a pas de changement d'heure :
// ajouter 24 h tombe toujours sur le jour suivant.
function toUtcDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

export function addDays(dateStr, days) {
  const date = toUtcDate(dateStr)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

export function mondayOf(dateStr) {
  const day = toUtcDate(dateStr).getUTCDay() // 0 = dimanche
  return addDays(dateStr, day === 0 ? -6 : 1 - day)
}

export function formatDate(dateStr, options) {
  return toUtcDate(dateStr).toLocaleDateString('fr-CA', { ...options, timeZone: 'UTC' })
}

// Format québécois : « 9 h », « 21 h 30 ».
export function formatTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`
}

export function formatRanges(ranges) {
  if (!ranges || ranges.length === 0) return 'Fermé'
  return ranges.map(([start, end]) => `${formatTime(start)} à ${formatTime(end)}`).join(', ')
}

function timeToMinutes(hhmm) {
  if (!hhmm) return null
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// Les quatre champs de l'API ne sont pas deux plages indépendantes :
// debut1 → [pause : fin1 → debut2] → fin2. Une plage continue n'a que
// debut1 et fin2, fin1 et debut2 restant vides.
function rangesFromEvent(evt) {
  if (!evt.debut1) return []
  if (evt.fin1 && evt.debut2) {
    return [
      [timeToMinutes(evt.debut1), timeToMinutes(evt.fin1)],
      [timeToMinutes(evt.debut2), timeToMinutes(evt.fin2)],
    ]
  }
  return [[timeToMinutes(evt.debut1), timeToMinutes(evt.fin2)]]
}

// Le filtre `bib` de l'API renvoie une erreur 422 pour tous les codes valides
// (constaté en septembre 2026) : on récupère donc tout le réseau et on
// regroupe ici par bibliothèque, puis par service.
export function parseHoraires(data) {
  const byBib = {}
  for (const evt of data?.evenements ?? []) {
    // L'API encode minuit heure locale : le préfixe est déjà la bonne date.
    const dateStr = evt.date.slice(0, 10)
    byBib[evt.bibliotheque] ??= {}
    byBib[evt.bibliotheque][evt.service] ??= {}
    byBib[evt.bibliotheque][evt.service][dateStr] = rangesFromEvent(evt)
  }
  return {
    byBib,
    serviceLabels: data?.labels?.services ?? {},
  }
}

// Statut principal d'un lieu, d'après l'horaire « regulier » (ouverture du
// bâtiment). `dates` est la liste ordonnée des jours couverts par la requête.
export function statusFor(lieu, horaires, now, dates) {
  // Brossard, Jardin botanique et Place Dupuis ne sont pas dans l'API :
  // on le dit plutôt que d'afficher un « Fermé » qu'on ne peut pas vérifier.
  if (!lieu.codeBib) return { state: 'unknown', text: 'Horaire non publié en ligne, vérifiez sur place' }
  if (!horaires) return { state: 'unknown', text: 'Horaire indisponible pour le moment' }

  const byDate = horaires.byBib[lieu.codeBib]?.regulier ?? {}
  const today = byDate[now.dateStr] ?? []

  for (const [start, end] of today) {
    if (now.minutes >= start && now.minutes < end) {
      if (end - now.minutes <= CLOSING_SOON_MIN) {
        return { state: 'closing-soon', text: `Ferme bientôt, à ${formatTime(end)}` }
      }
      return { state: 'open', text: `Ouvert jusqu'à ${formatTime(end)}` }
    }
  }
  for (const [start] of today) {
    if (now.minutes < start) return { state: 'closed', text: `Fermé, ouvre à ${formatTime(start)}` }
  }

  const upcoming = dates.filter((d) => d > now.dateStr)
  for (let i = 0; i < upcoming.length; i++) {
    const ranges = byDate[upcoming[i]] ?? []
    if (ranges.length) {
      const day = i === 0 ? 'demain' : formatDate(upcoming[i], { weekday: 'long' })
      return { state: 'closed', text: `Fermé, ouvre ${day} à ${formatTime(ranges[0][0])}` }
    }
  }
  return { state: 'closed', text: 'Fermé' }
}

// Services secondaires du jour (référence, soutien informatique…), affichés
// à côté du statut principal.
export function otherServicesToday(lieu, horaires, now) {
  const services = horaires?.byBib[lieu.codeBib] ?? {}
  return Object.keys(services)
    .filter((key) => key !== 'regulier')
    .map((key) => {
      const ranges = services[key][now.dateStr] ?? []
      const current = ranges.find(([start, end]) => now.minutes >= start && now.minutes < end)
      const label = horaires.serviceLabels[key] ?? key
      return `${label} : ${current ? `jusqu'à ${formatTime(current[1])}` : 'fermé'}`
    })
}

// Distance à vol d'oiseau, en kilomètres.
export function haversine(lat1, lng1, lat2, lng2) {
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1).replace('.', ',')} km`
}

export function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// Texte dans lequel la recherche fouille : nom, adresse, pavillon, alias
// (BLSH, « sciences »…), espaces et types de salles. On peut ainsi trouver
// une bibliothèque par « studio vidéo » ou « cabine ».
function searchText(lieu) {
  return normalize(
    [lieu.name, lieu.addr, lieu.pavillon, ...(lieu.aliases ?? []), ...(lieu.spaces ?? []).map((s) => s.label), ...(lieu.reservations ?? []).map((r) => r.label)]
      .filter(Boolean)
      .join(' | ')
  )
}

// `query` est déjà normalisée (sans accents, en minuscules).
export function matchesQuery(lieu, query) {
  return !query || searchText(lieu).includes(query)
}

// Un lieu peut appartenir à plusieurs filtres : la zone est exclusive, mais
// « Studios et ateliers » chevauche « Bibliothèques ». On le déduit des
// espaces plutôt que d'une liste à maintenir à part.
export function hasStudioSpace(lieu) {
  return Boolean(lieu.spaces?.some(({ label }) => /atelier|studio/i.test(label)))
}

export function matchesFilter(lieu, filter) {
  if (filter === 'all') return true
  if (filter === 'studios') return hasStudioSpace(lieu)
  return lieu.zone === filter
}

// Lien tel: à partir du premier numéro de la chaîne ; « poste XXXX » devient
// une pause de numérotation (« ,XXXX »).
export function telHref(phone) {
  const m = phone.match(/(\d{3})[\s-](\d{3})-(\d{4})(?:,\s*poste\s*(\d+))?/)
  if (!m) return null
  const base = `+1${m[1]}${m[2]}${m[3]}`
  return m[4] ? `tel:${base},${m[4]}` : `tel:${base}`
}

// Ouvre l'application de cartes de l'appareil. `platform` est détecté côté
// client seulement (voir CarteHoraires.jsx) ; le SSR produit le lien Google.
export function directionsUrl(lieu, platform) {
  const { lat, lng, name } = lieu
  if (platform === 'ios') return `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(name)}`
  if (platform === 'android') return `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(name)})`
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}
