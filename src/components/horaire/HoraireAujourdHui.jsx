import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useSWR from 'swr'
import Link from '@/components/Link'

/**
 * @typedef {('am'|'antenne-paramedicale'|'cartotheque'|'marcel-laurin'|'ch'|'conservation'|'cs'|'dr'|'ed'|'gp'|'ki'|'laval'|'mi'|'mu'|'mv'|'pa'|'pb'|'py'|'sa'|'sciences'|'ss'|'youville')} CodeBib
 */

/**
 * @param {Object} props - Propriétés du composant
 * @param {CodeBib} props.bib - Le code de bibliothèque pour laquelle afficher les horaires
 * @param {string} [props.service='https://api.bib.umontreal.ca/horaires'] - L'URL de base du service d'API des horaires
 * @param {boolean} [props.lienHoraires=false] - Indique si un lien vers la page des horaires doit être affiché
 */

export default function HoraireAujourdHui({ bib, service = 'https://api.bib.umontreal.ca/horaires', lienHoraires = false }) {
  const today = new Date()
  const currentDay = today.getDay()

  async function fetcher(bib) {
    const dateDebut = new Date()
    dateDebut.setDate(today.getDate() - currentDay)
    const debut = dateDebut.toISOString().substring(0, 10)

    const res = await fetch(`${service}/${bib}?debut=${debut}&fin=P7D`)
    const data = await res.json()
    const horaires = data.evenements.filter((horaire) => horaire.service === 'regulier')

    return {
      sommaire: horaires[currentDay].sommaire,
      details: horaires.map((horaire) => horaire.sommaire),
    }
  }

  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

  const { data, error, isLoading } = useSWR(bib, fetcher)

  if (error) {
    return <div>failed to load</div>
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <Accordion
      component="span"
      disableGutters
      elevation={0}
      sx={{
        display: 'inline-block',
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ textTransform: 'capitalize' }}>
        Aujourd'hui: {data.sommaire}
      </AccordionSummary>
      <AccordionDetails>
        <table>
          <tbody>
            {data.details.map((horaire, i) => {
              const fontWeight = i === currentDay ? 'bold' : null
              return (
                <tr key={i}>
                  <td style={{ textTransform: 'capitalize', paddingRight: '0.5rem', fontWeight }}>{jours[i]}</td>
                  <td style={{ textTransform: 'capitalize', fontWeight }}>{horaire}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {lienHoraires && (
          <Link to={`/horaires`} sx={{ fontSize: 'smaller', pt: 1.5, display: 'block' }}>
            Consultez tous les horaires &gt;
          </Link>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
