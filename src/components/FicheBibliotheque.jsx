import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { styled, SvgIcon, Typography } from '@mui/material'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid2'
import { Door, MapTrifold, Users } from '@phosphor-icons/react'
import LayoutGrid from '@/components/utils/LayoutGrid'
import Bloc from '@/components/FicheBibliotheque/Bloc'
import HoraireAujourdhui from '@/components/FicheBibliotheque/HoraireAujourdhui'
import PlusIcon from '@/components/FicheBibliotheque/plus.svg'

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  '&::before': {
    display: 'none',
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
  padding: '3.125rem',
  borderRadius: `0 0 ${theme.shape.corner.small} ${theme.shape.corner.small}`,
}))

function Col({ children }) {
  return (
    <Grid container gap="2rem" direction="column">
      {children}
    </Grid>
  )
}

export default function FicheBibliotheque({ title, codeBib, espaces, adresse, nousJoindre, ...rest }) {
  const { children, ...props } = rest
  const imageData = useStaticQuery(graphql`
    query FicheBibliothequeImageQuery {
      allFile(filter: { sourceInstanceName: { eq: "bibliotheques" }, relativePath: { glob: "images/*" } }) {
        nodes {
          name
          relativePath
          childrenImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 365, quality: 80, breakpoints: 365)
          }
        }
      }
    }
  `)

  const image = imageData.allFile.nodes.find((node) => node.name === codeBib)?.childrenImageSharp[0].gatsbyImageData

  return (
    <Accordion>
      <AccordionSummary>{title}</AccordionSummary>
      <AccordionDetails>
        <LayoutGrid columns={10}>
          <Grid size={3}>
            <Col>
              <HoraireAujourdhui codeBib={codeBib} />
              <Bloc title="Espaces" Icon={Door}>
                {espaces}
              </Bloc>
            </Col>
          </Grid>
          <Grid size={4}>
            <Col>
              <Bloc title="Adresse" Icon={MapTrifold}>
                {adresse}
              </Bloc>
              <Bloc title="Nous joindre" Icon={Users}>
                {nousJoindre}
              </Bloc>
              {children && <Bloc>{children}</Bloc>}
            </Col>
          </Grid>
          <Grid size={3}>
            <GatsbyImage image={image} style={{ borderRadius: '0rem 0rem 0.75rem 0rem' }} alt="" />
          </Grid>
        </LayoutGrid>
      </AccordionDetails>
    </Accordion>
  )
}
