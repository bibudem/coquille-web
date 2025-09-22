"use client"

import { 
  Box, Grid, Typography, List, ListItem, ListItemText, Button, 
  useTheme, useMediaQuery, Card, CardContent, CardActions, Collapse
} from '@mui/material';
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Link from '@/components/Link';
import Studiobib from '@/images/burger/studiobib.png'
import BoiteOutils from '@/images/burger/boite-outils.png'
import AutresResources from '@/images/burger/autres-resources.png'
import pages from '../AppBar/menu'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { 
  Books,
  DoorOpen,
  FolderOpen,
  ClockCountdown,
  AddressBook,
  Info,
  House,
  ArrowRight
} from '@phosphor-icons/react';

// Style pour les liens dans les cartes avec effet hover
const StyledLink = styled(Link)(({ theme }) => ({
  color: "#c8cbcfff",
  textDecoration: 'none',
  fontSize: '1.125rem',
  fontWeight: '300',
  display: 'block',
  padding: '0.25rem 0',
  transition: 'all 0.2s ease',
  "&:hover": {
    color: "white"
  },
}));

// Composant de lien sécurisé pour gérer internes/externes
const SecureLink = ({ href, children, ...props }) => {
  // Vérifie si c'est une URL externe
  const isExternal = href?.startsWith('http') || href?.startsWith('//');
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

// Style appliqué au SecureLink
const StyledSecureLink = styled(SecureLink)(({ theme }) => ({
  color: "#c8cbcfff",
  textDecoration: 'none',
  fontSize: '1.125rem',
  fontWeight: '300',
  display: 'block',
  padding: '0.25rem 0',
  transition: 'all 0.2s ease',
  "&:hover": {
    color: "white"
  },
}));

// --- Données pour alimenter les cartes ---
const cards = [
  {
    icon: Studiobib,
    title: 'Studio·bib',
    links: [
      { label: 'Accès hors campus', href: 'https://studio.bib.umontreal.ca/informatique/hors-campus/' },
      { label: 'Soutien informatique', href: 'https://studio.bib.umontreal.ca/informatique/' },
      { label: 'Technologies créatives', href: 'https://studio.bib.umontreal.ca/creatives/' },
      { label: 'Productions médias', href: 'https://studio.bib.umontreal.ca/medias/' },
    ],
    cta: { label: 'Aller plus loin', href: 'https://studio.bib.umontreal.ca/' },
    footerColor: '#FFCA40',
    bgColor: '#2a3440',
  },
  {
    icon: BoiteOutils,
    title: 'Boîte à outils',
    links: [
      { label: 'Base de données A-Z', href: 'https://boite-outils.bib.umontreal.ca/az.php' },
      { label: 'Guides disciplinaires', href: 'https://boite-outils.bib.umontreal.ca/srch.php?q=Guides+disciplinaires' },
      { label: 'Comment citer', href: 'https://boite-outils.bib.umontreal.ca/citer' },
      { label: 'Droit d\'auteur', href: 'https://boite-outils.bib.umontreal.ca/recherche/droit-auteur' },
    ],
    cta: { label: 'Découvrir tous les outils', href: 'https://boite-outils.bib.umontreal.ca/' },
    footerColor: '#F04E24',
    bgColor: '#2a3440',
  },
  {
    icon: AutresResources,
    title: 'Ressources',
    links: [
      { label: 'Outil de recherche Sofia', href: 'https://umontreal.on.worldcat.org/discovery?lang=fr' },
      { label: 'Papyrus – dépôt institutionnel', href: 'https://umontreal.scholaris.ca/' },
      { label: 'GéoIndex – Données géospatiales', href: 'https://geoapp.bibl.ulaval.ca/' },
      { label: 'Calypso – Objets numériques', href: 'https://calypso.bib.umontreal.ca/' },
    ],
    //cta: { label: 'Toutes les ressources', href: '#' },
    footerColor: '#52B782',
    bgColor: '#2a3440',
  },
];

// --- Boutons latéraux avec icônes ---
const quickLinks = [
  { label: 'Obtenir un document', href: '/obtenir/', icon: Books },
  { label: 'Réserver une salle', href: 'https://calendrier.bib.umontreal.ca/r', icon: DoorOpen },
  { label: 'Mon dossier', href: 'https://umontreal.account.worldcat.org/account', icon: FolderOpen },
  { label: 'Horaires', href: '/horaires', icon: ClockCountdown },
  { label: 'Nous joindre', href: '/nous-joindre/', icon: AddressBook },
  { label: 'À propos', href: '/a-propos/', icon: Info },
];

function MobileQuickLinks() {
  const [open, setOpen] = useState(false);

  const buttonSx = {
    justifyContent: "space-between",
    backgroundColor: "transparent",
    color: "#c8cbcfff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    textTransform: "none",
    padding: "0.75rem 1rem",
    transition: "all 0.3s ease",
    fontSize: "1rem",
    width: "100%",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      borderColor: "rgba(255,255,255,0.4)",
      color: "white"
    },
  };

  const typographyLinkSx = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    color: "#c8cbcfff",
    textDecoration: "none",
    padding: "0.75rem 1rem",
    transition: "all 0.3s ease",
    fontSize: "1.25rem", // Taille pour variant="h6"
    fontWeight: 500,
    width: "100%",
    "&:hover": {
      color: "white",
      textDecoration: "none"
    },
  };

  const collapseLinkSx = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    color: "#c8cbcfff",
    borderRadius: "8px",
    textDecoration: "none!important",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "white"
    },
  };

  return (
    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Accueil */}
      <Link
        to="/"
        sx={typographyLinkSx}
      >
        <Box component="span">Accueil</Box>
      </Link>

      {/* Liens rapides toggle */}
      <Button
        onClick={() => setOpen(!open)}
        variant="outlined"
        sx={{
          ...buttonSx,
          ...(open && {
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor: "rgba(255,255,255,0.4)",
          }),
        }}
        endIcon={
          <ExpandMoreIcon
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        }
      >
        Liens rapides
      </Button>

      {/* Contenu toggle avec liens simples */}
      <Collapse in={open}>
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Pages */}
          {pages.map((page, i) => (
            <Link key={`page-${i}`} to={page.url} sx={collapseLinkSx}>
              {page.label} <ArrowRight size={16} />
            </Link>
          ))}

          {/* QuickLinks */}
          {quickLinks.map((btn, i) => {
            const IconComponent = btn.icon;
            const isExternal = btn.href?.startsWith('http');
            
            return (
              <Link
                key={`quick-${i}`}
                component={isExternal ? 'a' : Link}
                {...(isExternal ? {
                  href: btn.href,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {
                  to: btn.href
                })}
                sx={collapseLinkSx}
              >
                {btn.label} <IconComponent size={20} />
              </Link>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}

export default function MenuSection({  }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))

  // Ordre des cartes pour mobile (inversé)
  const mobileCardOrder = [2, 1, 0]; // Ressources, Boîte à outils, Studio·bib
  const desktopCardOrder = [0, 1, 2]; // Ordre original

  return (
    <>
      {/* Section principale du menu */}
      <Box sx={{ padding: { xs: '0', md: '0' } }}>
        <Grid container spacing={2}>
          
          {/* Section des boutons - En premier sur mobile */}
          <Grid item xs={12} lg={3} sx={{ 
            order: { xs: 1, lg: 2 } // Ordre modifié pour mobile
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%',
              justifyContent: { md: 'flex-start' },
              gap: 1
            }}>
              {/* Affichage compact pour mobile */}
              {isSmallScreen ? (
                <MobileQuickLinks />
              ) : (
                <>
                  {quickLinks.map((btn, i) => {
                    const IconComponent = btn.icon;
                    const isExternal = btn.href?.startsWith('http');
                    
                    return (
                      <Button
                        key={i}
                        fullWidth
                        component={isExternal ? 'a' : Link}
                        {...(isExternal ? {
                          href: btn.href,
                          target: "_blank",
                          rel: "noopener noreferrer"
                        } : {
                          to: btn.href
                        })}
                        startIcon={<IconComponent size={20} />}
                        variant="outlined"
                        sx={{
                          justifyContent: 'flex-start',
                          backgroundColor: 'transparent',
                          color: '#c8cbcfff',
                          borderColor: 'rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          textTransform: 'none',
                          padding: '0.75rem 1rem',
                          transition: 'all 0.2s ease',
                          fontSize: '1rem',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderColor: 'rgba(255,255,255,0.4)',
                            color: "white"
                          },
                        }}
                      >
                        {btn.label}
                      </Button>
                    );
                  })}
                </>
              )}
            </Box>
          </Grid>

          {/* Section des cartes - En second sur mobile */}
          <Grid item xs={12} lg={9} sx={{ 
            order: { xs: 2, lg: 1 } // Ordre modifié pour mobile
          }}>
            <Grid container spacing={2} alignItems="stretch">
              {(isSmallScreen ? mobileCardOrder : desktopCardOrder).map((cardIndex, i) => {
                const card = cards[cardIndex];
                return (
                  <Grid item xs={12} sm={4} md={4} key={i} sx={{ display: 'flex' }}>
                    <Card
                      sx={{
                        backgroundColor: '#2a3440',
                        borderRadius: '8px',
                        padding: '2rem',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '5px',
                          backgroundColor: card.footerColor,
                          borderRadius: '0 0 8px 8px',
                        },
                        '&:hover': {
                          boxShadow: `0 5px 0 0 ${card.footerColor}`,
                          transition: 'all 0.3s ease'
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 0, pb: '16px !important' }}>
                        {/* Icone + titre */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box
                            component="img"
                            src={card.icon}
                            alt={card.title}
                            sx={{ width: 80, height: 80 }}
                          />
                          <Typography variant="h6">{card.title}</Typography>
                        </Box>

                        {/* Liste des liens */}
                        <List dense sx={{ mb: 1 }}>
                          {card.links.map((link, idx) => (
                            <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                              <ListItemText
                                primary={
                                  <StyledSecureLink href={link.href}>
                                    → {link.label}
                                  </StyledSecureLink>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>

                      <CardActions sx={{ p: 0 }}>
                        {/* Footer CTA */}
                        {card.cta?.href && card.cta?.label && (
                          <Box sx={{ 
                            fontWeight: 500, 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            color: card.footerColor,
                            pt: 1
                          }}>
                            <StyledSecureLink 
                              href={card.cta.href} 
                              sx={{
                                color: 'inherit',
                                fontSize: '1rem',
                                '&:hover': {
                                  color: 'inherit',
                                  textDecoration: 'underline',
                                }
                              }}
                            >
                              {card.cta.label} →
                            </StyledSecureLink>
                          </Box>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}