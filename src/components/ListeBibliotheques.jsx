import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { ClockCountdown } from '@phosphor-icons/react'
import GridOffset from '@/components/utils/GridOffset'
import LayoutGrid from '@/components/utils/LayoutGrid'
import Div from '@/components/utils/Div'
import PlusIcon from './ListeBibliotheques/plus.svg'

function Header({ children }) {
  return (
    <Typography
      component="h3"
      sx={{
        fontSize: '1.2222rem',
        fontWeight: 700,
        lineHeight: 1.2,
      }}
    >
      {children}
    </Typography>
  )
}

function Header1({ Icon, children }) {
  return (
    <Div
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        marginBottom: '16px',
      })}
    >
      <Icon size={24} color="currentColor" />
      <Typography
        component="h4"
        sx={{
          fontSize: '1.6667rem',
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {children}
      </Typography>
    </Div>
  )
}

export default function ListeBibliotheques({}) {
  return (
    <GridOffset offset={1}>
      <Grid>
        <h1>Liste des bibliothèques</h1>
        <Accordion>
          <AccordionSummary expandIcon={<SvgIcon component={PlusIcon} inheritViewBox />}>
            <Header>Lettres et sciences humaines</Header>
          </AccordionSummary>
          <AccordionDetails>
            <LayoutGrid columns={10}>
              <Grid size={3}>
                <Header1 Icon={ClockCountdown}>Ajourd'hui</Header1>
              </Grid>
              <Grid size={4}>b</Grid>
              <Grid size={3}>c</Grid>
            </LayoutGrid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </GridOffset>
  )
}
