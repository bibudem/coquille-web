import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Typography } from '@mui/material'
import PlusIcon from '@/components/bibliotheques/plus.svg'

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

export default function FicheBibliotheque({ title, code, ...rest }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<SvgIcon component={PlusIcon} inheritViewBox />}>
        <Header>{title}</Header>
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
  )
}
