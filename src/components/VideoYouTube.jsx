import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { PlayIcon } from '@phosphor-icons/react/dist/csr/Play'

/**
 * Vidéo YouTube en 16:9, reprise du bloc « video » de bibudem-bibweb.
 *
 * Rien ne vient de YouTube avant le clic (ni lecteur, ni vignette, ni
 * témoin) : la page reste légère et ne transmet rien à Google sans geste de
 * la personne. Le bouton est d'abord un lien vers la vidéo sur YouTube (il
 * fonctionne sans JavaScript) ; au clic, on le remplace par le lecteur
 * youtube-nocookie, qui démarre et reçoit le focus. Lien et lecteur portent
 * le titre de la vidéo (WCAG 4.1.2).
 *
 * @param {Object} props
 * @param {string} props.id - Identifiant de la vidéo YouTube.
 * @param {string} props.titre - Titre de la vidéo.
 */
export default function VideoYouTube({ id, titre }) {
  const [lecture, setLecture] = useState(false)
  const lecteur = useRef(null)

  useEffect(() => {
    if (lecture) lecteur.current?.focus()
  }, [lecture])

  return (
    <Box sx={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', borderRadius: (theme) => theme.shape.corner?.small ?? '12px', backgroundColor: 'bleuFonce.main' }}>
      {lecture ? (
        <Box
          component="iframe"
          ref={lecteur}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={titre}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <Box
          component="a"
          href={`https://www.youtube.com/watch?v=${id}`}
          onClick={(e) => {
            e.preventDefault()
            setLecture(true)
          }}
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            p: 3,
            color: 'common.white',
            textAlign: 'center',
            textDecoration: 'none',
            '&:hover .pastille, &:focus-visible .pastille': { transform: 'scale(1.08)' },
          }}
        >
          <Box
            className="pastille"
            aria-hidden="true"
            sx={{ display: 'grid', placeItems: 'center', width: '5rem', height: '5rem', borderRadius: '50%', backgroundColor: 'common.white', color: 'bleuFonce.main', transition: 'transform 200ms ease-out', '@media (prefers-reduced-motion: reduce)': { transition: 'none' } }}
          >
            <PlayIcon size="2.5rem" weight="fill" />
          </Box>
          <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box component="span" sx={{ fontWeight: 600, fontSize: '1.25rem' }}>
              Lire la vidéo
            </Box>
            <Box component="span">{titre}</Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
