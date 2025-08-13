import * as React from "react"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useLocation } from "gatsby"
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material"
import notFoundImage from "@/images/404/im_um_404.png"
import TopAppBar from '@/components/_layout/AppBar/TopAppBar'
import TopAppBarSm from '@/components/_layout/AppBar/TopAppBarSm'
import { QuickLinks, QuickLinksSm } from '@/components/_layout/QuickLinks'
import Footer from '@/components/_layout/Footer/Footer'

const NotFoundPage = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Barre de navigation responsive */}
      {isSmallScreen ? (
        <>
          <TopAppBarSm location={location} />
          <QuickLinksSm />
        </>
      ) : (
        <>
          <TopAppBar location={location} />
          <QuickLinks />
        </>
      )}

      {/* Contenu principal de la page 404 */}
      <Box
        component="main"
        role="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: { xs: 4, md: 12 },
          backgroundColor: "background.default"
        }}
      >
        <Box
          component="img"
          src={notFoundImage}
          alt="Page non trouvée"
          sx={{
            maxWidth: { xs: '80vw', md: '50vw' },
            mb: 4
          }}
        />
        
        <Typography 
          variant="h2" 
          sx={{ 
            mb: 3,
            color: "bleuFonce.main",
          }}
        >
          Désolés... nous n'avons pas trouvé ce que vous demandez.
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 6,
            maxWidth: 600,
            fontSize: { xs: '1rem', md: '1.125rem' }
          }}
        >
          Cette page n'existe plus ou a été déplacée
        </Typography>
        
        <Button
          component={Link}
          to="/"
          variant="contained"
          endIcon={<ArrowForwardIcon size={20} />}
        >
          Retour à la page d'accueil
        </Button>
      </Box>

      {/* Pied de page */}
      <Footer />
    </Box>
  )
}

export default NotFoundPage

export const Head = () => <title>Page non trouvée</title>