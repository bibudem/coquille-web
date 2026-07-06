import { useEffect, useRef, useState } from 'react'
import { Box, CircularProgress, Dialog, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import Link from '@/components/Link'
import { useSearchIndex } from '@/hooks/use-search-index'

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

const DEBOUNCE_MS = 200

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
  // `open` sert aussi de signal à useSearchIndex : l'index n'est chargé qu'à
  // la première ouverture de la modale, pas au chargement de la page.
  const { search, isLoading } = useSearchIndex(open)

  useEffect(() => {
    if (!open) {
      // Réinitialise le champ pour ne pas ré-afficher une ancienne recherche
      // la prochaine fois que la modale s'ouvre.
      setQuery('')
      setDebouncedQuery('')
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

  const groups = search(debouncedQuery)
  const hasResults = groups.length > 0

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
      <Stack direction="row" spacing={2} alignItems="center">
        <SearchPaper component="form" onSubmit={e => e.preventDefault()}>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, color: 'text.secondary' }}>
            <MagnifyingGlassIcon size={22} />
          </Box>
          <InputBase
            inputRef={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher dans le site des bibliothèques"
            fullWidth
            inputProps={{ 'aria-label': 'Rechercher dans le site des bibliothèques' }}
            sx={{ px: 2, py: 1 }}
          />
        </SearchPaper>
        <IconButton onClick={onClose} aria-label="Fermer la recherche">
          <XIcon size={22} />
        </IconButton>
      </Stack>

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
    </Dialog>
  )
}
