import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Door, MapTrifold, Users } from '@phosphor-icons/react'
import LayoutGrid from '@/components/utils/LayoutGrid'
import Bloc from '@/components/bibliotheques/Bloc'
import HoraireAujourdhui from '@/components/bibliotheques/HoraireAujourdhui'
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

export default function FicheBibliotheque({ title, code, espaces, adresse, nousJoindre, ...rest }) {
  const { children, ...props } = rest
  return (
    <Accordion>
      <AccordionSummary expandIcon={<SvgIcon component={PlusIcon} inheritViewBox />}>
        <Header>{title}</Header>
      </AccordionSummary>
      <AccordionDetails>
        <LayoutGrid columns={10}>
          <Grid size={3}>
            <HoraireAujourdhui codeBib="ss" />
            <Bloc title="Espaces" Icon={Door}>
              {espaces}
            </Bloc>
          </Grid>
          <Grid size={4}>
            <Bloc title="Adresse" Icon={MapTrifold}>
              {adresse}
            </Bloc>
            <Bloc title="Nous joindre" Icon={Users}>
              {nousJoindre}
              {children}
            </Bloc>
          </Grid>
          <Grid size={3}>[image]</Grid>
        </LayoutGrid>
      </AccordionDetails>
    </Accordion>
  )
}
