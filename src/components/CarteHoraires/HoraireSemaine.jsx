import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { CaretLeftIcon } from '@phosphor-icons/react/dist/csr/CaretLeft'
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight'
import { formatDate, formatRanges } from './horaires'
import { srOnly } from './styles'

// Tableau de la semaine d'un lieu, avec navigation ← → sur huit semaines.
// Les semaines au-delà de la première tranche sont chargées à la demande
// (voir useHoraires.js). Un vrai <table> : un lecteur d'écran associe ainsi
// chaque horaire à son jour et à son service.
export default function HoraireSemaine({ lieu, horaires, dates, today, ensureWeek, isWeekLoaded, error }) {
  const [offset, setOffset] = useState(0)
  const loaded = isWeekLoaded(offset)

  useEffect(() => {
    ensureWeek(offset)
  }, [offset, ensureWeek])
  const maxOffset = Math.max(Math.floor(dates.length / 7) - 1, 0)
  const week = dates.slice(offset * 7, offset * 7 + 7)

  const services = horaires.byBib[lieu.codeBib] ?? {}
  // L'ouverture du bâtiment d'abord, puis les autres services.
  const serviceKeys = Object.keys(services).sort((a, b) => (a === 'regulier' ? -1 : b === 'regulier' ? 1 : 0))
  const label = (key) => horaires.serviceLabels[key] ?? key

  if (serviceKeys.length === 0) {
    return <Typography variant="body2">Aucun horaire publié pour cette période.</Typography>
  }

  const rangeLabel = week.length ? `${formatDate(week[0], { day: 'numeric', month: 'long' })} au ${formatDate(week.at(-1), { day: 'numeric', month: 'long' })}` : ''

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1 }}>
        <IconButton onClick={() => setOffset(offset - 1)} disabled={offset === 0} aria-label="Semaine précédente" size="small" sx={{ color: 'bleuPrincipal.main' }}>
          <CaretLeftIcon aria-hidden="true" />
        </IconButton>
        <Typography variant="body2" component="p" aria-live="polite" sx={{ fontWeight: 600, textAlign: 'center' }}>
          Semaine du {rangeLabel}
        </Typography>
        <IconButton onClick={() => setOffset(offset + 1)} disabled={offset === maxOffset} aria-label="Semaine suivante" size="small" sx={{ color: 'bleuPrincipal.main' }}>
          <CaretRightIcon aria-hidden="true" />
        </IconButton>
      </Box>

      {!loaded ? (
        error ? (
          <Typography variant="body2">L’horaire de cette semaine est indisponible pour le moment. Réessayez plus tard.</Typography>
        ) : (
          <Box role="status">
            <Skeleton variant="rounded" height={260} aria-hidden="true" />
            <Box component="span" sx={srOnly}>
              Chargement de l’horaire de la semaine…
            </Box>
          </Box>
        )
      ) : (
        <>
          {/* Sur un écran étroit, le tableau défile dans sa propre zone plutôt que
              d'élargir la page (WCAG 1.4.10, exception des tableaux de données).
              La zone prend le focus pour qu'on puisse la faire défiler au clavier. */}
          <Box
            role="region"
            aria-label={`Horaire de la semaine, ${lieu.name}`}
            tabIndex={0}
            sx={(theme) => ({
              overflowX: 'auto',
              borderRadius: theme.shape.corner['extra-small'],
              '&:focus-visible': { outline: '2px solid', outlineColor: 'bleuPrincipal.main', outlineOffset: 2 },
            })}
          >
            <Box
              component="table"
              sx={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                '& th, & td': { py: '6px', px: { xs: 0.75, sm: 1 }, textAlign: 'left', verticalAlign: 'top', borderBottom: '1px solid', borderColor: 'divider' },
                // Les plages horaires ne se coupent pas (« 10 h 30 à 17 h » sur une ligne).
                '& td': { whiteSpace: 'nowrap' },
                '& thead th': { fontWeight: 600, backgroundColor: 'bleu100.main' },
                '& thead th:first-of-type': { borderTopLeftRadius: (theme) => theme.shape.corner['extra-small'] },
                '& thead th:last-of-type': { borderTopRightRadius: (theme) => theme.shape.corner['extra-small'] },
                '& tbody th': { fontWeight: 500 },
                // Majuscule au jour seulement : « Lundi 21 sept. », pas « Sept. ».
                '& tbody th::first-letter': { textTransform: 'uppercase' },
                '& tr.is-today': { backgroundColor: 'bleu200.main', fontWeight: 600 },
                '& tr.is-today th': { fontWeight: 600 },
              }}
            >
              <Box component="caption" sx={srOnly}>
                Horaire de la semaine du {rangeLabel}, {lieu.name}
              </Box>
              <thead>
                <tr>
                  <th scope="col">Jour</th>
                  {serviceKeys.map((key) => (
                    <th scope="col" key={key}>
                      {label(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {week.map((dateStr) => {
                  const isToday = dateStr === today
                  return (
                    <tr key={dateStr} className={isToday ? 'is-today' : undefined} aria-current={isToday ? 'date' : undefined}>
                      <th scope="row">
                        {formatDate(dateStr, { weekday: 'long', day: 'numeric', month: 'short' })}
                        {isToday && ' (aujourd’hui)'}
                      </th>
                      {serviceKeys.map((key) => (
                        <td key={key}>{formatRanges(services[key][dateStr])}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </Box>
          </Box>
        </>
      )}
    </div>
  )
}
