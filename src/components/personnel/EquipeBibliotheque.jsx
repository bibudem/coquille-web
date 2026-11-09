import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Box from '@mui/material/Box'

/**
 * Équipe d'une bibliothèque, reprise du bloc « personnel » de bibudem-bibweb
 * (EquipeBibliotheque.astro) : une grille de vignettes (photo, nom, fonction)
 * qui mènent chacune à la fiche de la personne dans le répertoire
 * (/nous-joindre/notre-equipe/ filtré sur son nom par `?q=`).
 *
 * Les données viennent du répertoire du personnel
 * (content/personnel/liste-personnel.xlsx) : les membres sont les personnes
 * dont la colonne « bibliotheque » nomme la bibliothèque. `ordre` place ces
 * personnes en tête, dans cet ordre (l'ordre hiérarchique ne se déduit pas du
 * fichier) ; les autres suivent par ordre alphabétique. Les vignettes se
 * tiennent ainsi à jour avec le tableur.
 *
 * Un seul lien par vignette, sur le nom : son ::after couvre la vignette.
 * La photo est décorative (alt vide), le nom est juste dessous.
 *
 * @param {Object} props
 * @param {string} props.bibliotheque - Nom de la bibliothèque, tel qu'écrit dans la colonne « bibliotheque ».
 * @param {string[]} [props.ordre] - « Prénom Nom » des personnes à placer en tête, dans l'ordre.
 * @param {string} [props.titreNiveau='h3'] - Niveau de titre des noms, pour garder la hiérarchie.
 * @param {number} [props.colonnes] - Nombre de colonnes imposé dès `md` (sinon, remplissage automatique).
 */

const cle = (texte = '') =>
  texte
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

const majuscule = (texte = '') => texte.charAt(0).toUpperCase() + texte.slice(1)

export default function EquipeBibliotheque({ bibliotheque, ordre = [], titreNiveau = 'h3', colonnes }) {
  const data = useStaticQuery(graphql`
    query EquipeBibliothequeQuery {
      allFile(filter: { sourceInstanceName: { eq: "personnel" }, relativeDirectory: { eq: "photos" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 240, height: 240, formats: [WEBP])
          }
        }
      }
      allListePersonnelXlsxSheet1 {
        nodes {
          id
          nom
          prenom
          fonction
          photo
          bibliotheque
        }
      }
    }
  `)

  const photos = data.allFile.nodes
  const parDefaut = photos.find((n) => n.name === '_profile')?.childImageSharp.gatsbyImageData

  const equipe = data.allListePersonnelXlsxSheet1.nodes
    .filter((p) =>
      (p.bibliotheque || '')
        .split(/[;|]/)
        .map(cle)
        .includes(cle(bibliotheque))
    )
    .map((p) => {
      const idPhoto = p.photo?.replace(/\.\w+$/, '')
      return {
        ...p,
        nomComplet: `${p.prenom} ${p.nom}`.trim(),
        image: photos.find((n) => n.name === idPhoto)?.childImageSharp.gatsbyImageData ?? parDefaut,
      }
    })

  const enTete = ordre.map((nom) => equipe.find((p) => cle(p.nomComplet) === cle(nom))).filter(Boolean)
  const autres = equipe.filter((p) => !enTete.includes(p)).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  const membres = [...enTete, ...autres]

  return (
    <Box
      component="ul"
      aria-label={`Équipe : ${bibliotheque}`}
      sx={{
        display: 'grid',
        // Deux par rangée sur un téléphone ; largeur minimale en rem : avec le
        // texte agrandi, une seule colonne plutôt que des noms qui débordent
        // (WCAG 1.4.10)
        gridTemplateColumns: {
          xs: 'repeat(auto-fit, minmax(min(100%, 8rem), 1fr))',
          sm: 'repeat(auto-fill, minmax(10rem, 1fr))',
          ...(colonnes && { md: `repeat(${colonnes}, minmax(0, 1fr))` }),
        },
        gap: { xs: 2, md: 3 },
        m: 0,
        p: 0,
        listStyle: 'none',
      }}
    >
      {membres.map((p) => (
        <Box
          component="li"
          key={p.id}
          sx={(theme) => ({
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            p: { xs: '1.25rem 1rem', md: '1.5rem 1rem' },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.corner?.medium ?? '16px',
            backgroundColor: 'background.paper',
            textAlign: 'center',
            transition: 'border-color 200ms ease, box-shadow 200ms ease',
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: '0 4px 12px rgba(11, 17, 58, 0.12)',
            },
            '&:hover a': { color: 'primary.main', textDecoration: 'underline' },
            // Le focus du lien s'affiche sur toute la vignette
            '&:has(a:focus-visible)': { outline: `3px solid ${theme.palette.primary.main}`, outlineOffset: '2px' },
            '@media (forced-colors: active)': { '&:has(a:focus-visible)': { outlineColor: 'Highlight' } },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          })}
        >
          {p.image && (
            <Box sx={{ width: { xs: '5.5rem', sm: '7.5rem' }, height: { xs: '5.5rem', sm: '7.5rem' }, mb: 0.5, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <GatsbyImage image={p.image} alt="" style={{ width: '100%', height: '100%' }} imgStyle={{ objectFit: 'cover' }} />
            </Box>
          )}
          <Box component={titreNiveau} sx={{ m: 0, maxWidth: '100%', overflowWrap: 'anywhere', fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 }}>
            <Box
              component="a"
              href={`/nous-joindre/notre-equipe/?q=${encodeURIComponent(p.nomComplet)}`}
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                '&:focus-visible': { outline: 'none' },
                // Lien étiré : toute la vignette est cliquable
                '&::after': { content: '""', position: 'absolute', inset: 0, borderRadius: 'inherit' },
              }}
            >
              {p.nomComplet}
            </Box>
          </Box>
          <Box component="p" sx={{ m: 0, maxWidth: '100%', overflowWrap: 'anywhere', color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.4 }}>
            {majuscule(p.fonction?.trim())}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
