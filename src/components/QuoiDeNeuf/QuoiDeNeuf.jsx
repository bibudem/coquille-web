import { Children, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import visuallyHidden from '@mui/utils/visuallyHidden'

/**
 * Section Quoi de neuf (accueil) : trois colonnes à partir de md, des onglets
 * en dessous pour gagner de la hauteur sur mobile.
 *
 * La mise en page (onglets visibles, panneaux masqués) est entièrement en CSS
 * et pensée d'abord pour le mobile : le HTML du SSR est donc déjà le bon, sans
 * saut de mise en page à l'hydratation. Les rôles ARIA des onglets ne sont
 * ajoutés qu'après l'hydratation, et seulement sous md : avant, ou sur grand
 * écran, les colonnes ne sont pas annoncées comme des panneaux d'onglets
 * sans onglets. L'onglet actif se repère donc par data-actif, pas par
 * aria-selected.
 *
 * @param {Object} props
 * @param {{ id: string, label: string }[]} props.onglets - Un onglet par enfant,
 *   dans le même ordre ; `id` est celui du titre (h3) de la colonne.
 */
export default function QuoiDeNeuf({ onglets, children }) {
  const panneaux = Children.toArray(children)
  const [actif, setActif] = useState(0)
  const [enOnglets, setEnOnglets] = useState(false)
  const refsOnglets = useRef([])

  // Les onglets ne servent que sous md (900 px), comme le CSS ci-dessous.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const maj = () => setEnOnglets(!mq.matches)
    maj()
    mq.addEventListener('change', maj)
    return () => mq.removeEventListener('change', maj)
  }, [])

  // Clavier selon le motif Onglets de l'APG (WAI-ARIA) : flèches gauche et
  // droite, Début et Fin ; l'onglet reçoit le focus et s'active aussitôt.
  function auClavier(event) {
    const dernier = panneaux.length - 1
    const cible = { ArrowRight: actif === dernier ? 0 : actif + 1, ArrowLeft: actif === 0 ? dernier : actif - 1, Home: 0, End: dernier }[event.key]
    if (cible === undefined) return
    event.preventDefault()
    setActif(cible)
    refsOnglets.current[cible]?.focus()
  }

  const idOnglet = (i) => `quoi-de-neuf-onglet-${onglets[i].id}`
  const idPanneau = (i) => `quoi-de-neuf-panneau-${onglets[i].id}`

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Box
        role={enOnglets ? 'tablist' : undefined}
        aria-label={enOnglets ? 'Quoi de neuf' : undefined}
        onKeyDown={enOnglets ? auClavier : undefined}
        // Contrôle segmenté sur une ligne en temps normal ; avec le texte agrandi
        // (WCAG 1.4.4) ou plus espacé (1.4.12), les onglets passent à la ligne
        // au lieu de déborder.
        sx={(theme) => ({
          display: { xs: 'flex', md: 'none' },
          flexWrap: 'wrap',
          gap: '.25rem',
          padding: '.25rem',
          marginBottom: '1.5rem',
          border: `1px solid ${theme.palette.bleu200.main}`,
          borderRadius: '1.5rem',
        })}
      >
        {onglets.map(({ label }, i) => (
          <Box
            component="button"
            type="button"
            key={label}
            ref={(el) => (refsOnglets.current[i] = el)}
            role={enOnglets ? 'tab' : undefined}
            id={idOnglet(i)}
            aria-selected={enOnglets ? i === actif : undefined}
            aria-controls={enOnglets ? idPanneau(i) : undefined}
            tabIndex={enOnglets && i !== actif ? -1 : 0}
            data-actif={i === actif}
            onClick={() => setActif(i)}
            sx={(theme) => ({
              flex: '1 1 auto',
              minHeight: '2.75rem',
              paddingInline: '.5rem',
              border: 0,
              borderRadius: '999px',
              backgroundColor: 'transparent',
              color: theme.palette.bleuFonce.main,
              font: 'inherit',
              // Fluide : les trois onglets tiennent sur une ligne jusqu'à 320 px
              fontSize: 'clamp(.8125rem, .45rem + 2vw, .9375rem)',
              fontWeight: 500,
              cursor: 'pointer',
              touchAction: 'manipulation',
              transition: `background-color ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.standard}, color ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.standard}`,
              '&[data-actif="true"]': {
                backgroundColor: theme.palette.bleuFonce.main,
                color: theme.palette.common.white,
              },
              // En couleurs forcées (contrastes élevés de Windows), le fond est
              // remplacé par la couleur système : on marque l'onglet actif par
              // un contour, que le navigateur peint toujours.
              '@media (forced-colors: active)': {
                '&[data-actif="true"]': {
                  outline: '2px solid SelectedItem',
                  outlineOffset: '-2px',
                },
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.bleuPrincipal.main}`,
                outlineOffset: '2px',
              },
            })}
          >
            {label}
          </Box>
        ))}
      </Box>

      <Box
        sx={(theme) => ({
          display: 'grid',
          gap: '3rem',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr',
            // La 3e colonne passe sous les deux autres, sur toute la largeur
            '& > :nth-of-type(3)': { gridColumn: '1 / -1' },
          },
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2.5rem',
            '& > :nth-of-type(3)': { gridColumn: 'auto' },
          },
        })}
      >
        {panneaux.map((panneau, i) => (
          <Box
            key={onglets[i].id}
            id={idPanneau(i)}
            role={enOnglets ? 'tabpanel' : undefined}
            aria-labelledby={enOnglets ? idOnglet(i) : undefined}
            data-actif={i === actif}
            sx={(theme) => ({
              display: 'flex',
              minWidth: 0,
              [theme.breakpoints.down('md')]: {
                '&[data-actif="false"]': { display: 'none' },
                // L'onglet tient lieu de titre visible ; le h3 reste pour la
                // navigation par titres des lecteurs d'écran.
                [`& h3#${onglets[i].id}`]: visuallyHidden,
              },
            })}
          >
            {panneau}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
