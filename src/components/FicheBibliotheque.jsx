import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { styled, SvgIcon } from '@mui/material'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid2'
import { Door, MapTrifold, Users } from '@phosphor-icons/react'
import Bloc from '@/components/FicheBibliotheque/Bloc'
import HoraireAujourdhui from '@/components/FicheBibliotheque/HoraireAujourdhui'
import { useSmall } from '@/hooks/use-small'
import PlusIcon from '@/components/FicheBibliotheque/plus.svg'

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  color: theme.palette.bleuFonce.main,
  '&::before': {
    display: 'none',
  },
  '& .MuiAlert-root, & .MuiAlert-message': {
    fontSize: '13px',
    color: 'inherit',
  },
}))

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<SvgIcon component={PlusIcon} inheritViewBox />} {...props} />)(({ theme }) => ({
  alignItems: 'flex-start',
  border: 'unset',
  paddingLeft: 0,
  paddingRight: 0,
  borderBottom: `1px solid ${theme.palette.bleuPrincipal.main}`,
  transition: `color ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  '.MuiAccordionSummary-content': {
    margin: '0',
    fontSize: '1.2222rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  '&.Mui-expanded': {
    color: theme.palette.bleuPrincipal.main,
  },
}))

const AccordionDetails = styled((props) => <MuiAccordionDetails {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.bleu100.main,
  padding: '20px',
  [theme.breakpoints.up('md')]: {
    padding: 0,
  },
  borderRadius: `0 0 ${theme.shape.corner.small} ${theme.shape.corner.small}`,
}))

function Col({ children }) {
  return (
    <Grid container gap="2rem" direction="column">
      {children}
    </Grid>
  )
}

/**
 * @description Composant FicheBibliotheque affichant les informations d'une bibliothèque.
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.title - Le titre de la bibliothèque.
 * @param {string} props.id - L'ID de l'accordéon.
 * @param {string} props.codeBib - Le code de la bibliothèque.
 * @param {React.ReactNode} props.blocHoraires - Le bloc affichant les horaires.
 * @param {React.ReactNode} props.blocEspaces - Le bloc affichant les espaces.
 * @param {React.ReactNode} props.blocAdresse - Le bloc affichant l'adresse.
 * @param {React.ReactNode} props.blocNousJoindre - Le bloc affichant les informations de contact.
 * @param {React.ReactNode} props.children - Les enfants du composant, pour du contenu additionnel.
 * @param {object} props.rest - Les autres propriétés du composant.
 * @returns {JSX.Element} Un accordéon contenant les informations de la bibliothèque.
 */
export default function FicheBibliotheque({ title, id, codeBib, blocHoraires, blocEspaces, blocAdresse, blocNousJoindre, ...rest }) {
  const { children, ...props } = rest
  const isSmall = useSmall('md')
  const imageData = useStaticQuery(graphql`
    query FicheBibliothequeImageQuery {
      allFile(filter: { sourceInstanceName: { eq: "bibliotheques" }, relativePath: { glob: "images/*" } }) {
        nodes {
          name
          relativePath
          childrenImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, height: 600, quality: 80, breakpoints: 400)
          }
        }
      }
    }
  `)

  const image = imageData.allFile.nodes.find((node) => node.name === codeBib)?.childrenImageSharp[0].gatsbyImageData

  return (
    <Accordion className="bib-comp-fiche-bibliotheque">
      <AccordionSummary id={id}>{title}</AccordionSummary>
      <AccordionDetails>
        <Grid container columns={10} columnSpacing="2rem">
          <Grid size={{ xs: 10, sm: 5, md: 3 }} sx={{ padding: '1.3333rem 0 1.3333rem 1.3333rem' }}>
            <Col>
              <HoraireAujourdhui codeBib={codeBib}>{blocHoraires}</HoraireAujourdhui>
              {blocEspaces && (
                <Bloc title="Espaces" Icon={Door}>
                  {blocEspaces}
                </Bloc>
              )}
            </Col>
          </Grid>
          <Grid size={{ xs: 10, sm: 5, md: 4 }} sx={{ padding: '1.3333rem 0 1.3333rem 1.3333rem' }}>
            <Col>
              <Bloc title="Adresse" Icon={MapTrifold}>
                {blocAdresse}
              </Bloc>
              <Bloc title="Nous joindre" Icon={Users}>
                {blocNousJoindre}
              </Bloc>
              {children && <Bloc>{children}</Bloc>}
            </Col>
          </Grid>
          {!isSmall && (
            <Grid size={{ md: 3 }} sx={{ position: 'relative' }}>
              <GatsbyImage
                image={image}
                style={{
                  borderRadius: '0rem 0rem 0.75rem 0rem',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                alt=""
              />
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
