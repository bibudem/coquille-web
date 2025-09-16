"use client"

import { useState, useEffect, forwardRef } from 'react';
import { 
  Box, Grid, Typography, List, ListItem, ListItemText, Button, 
  useTheme, useMediaQuery, Drawer, IconButton, SwipeableDrawer,
  Hidden, Chip, Card, CardContent, CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from '@/components/Link';
import Studiobib from '@/images/burger/studiobib.png'
import BoiteOutils from '@/images/burger/boite-outils.png'
import AutresResources from '@/images/burger/autres-resources.png'
import { appBarHeight } from '../AppBar/TopAppBar'
import pages from '../AppBar/menu'
import { 
  X, 
  List as ListIcon, 
  Books,
  DoorOpen,
  FolderOpen,
  ClockCountdown,
  AddressBook,
  Info,
  House,
  CaretRight
} from '@phosphor-icons/react';

// Style pour les liens dans les cartes avec effet hover
const StyledLink = styled(Link)(({ theme }) => ({
  color: '#c8cbcfff',
  textDecoration: 'none',
  fontSize: '0.85rem',
  fontWeight: '300',
  display: 'block',
  padding: '0.25rem 0',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: 'white',
    textDecoration: 'none',
  },
}));

// Composant Drawer personnalisé avec effet amélioré
function CustomDrawer({ open, onClose, children, isMobile }) {
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      anchor="right"
      variant="temporary"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#222930',
          color: '#fff',
          padding: '1rem',
          top: 0,
          height: '100%',
          width: '85%',
          maxWidth: '90vw',
          borderTopLeftRadius: '16px',
          borderBottomLeftRadius: '16px',
          boxShadow: '-4px 0px 20px rgba(0, 0, 0, 0.3)',
          overflowY: 'auto',
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
}

// --- Données pour alimenter les cartes ---
const cards = [
  {
    icon: Studiobib,
    title: 'Studio·bib',
    links: [
      { label: 'Accès hors campus', href: '#' },
      { label: 'Soutien informatique', href: '#' },
      { label: 'Technologies créatives', href: '#' },
      { label: 'Productions médias', href: '#' },
    ],
    cta: { label: 'Aller plus loin', href: '#' },
    footerColor: '#FFCA40',
    bgColor: '#2a3440',
  },
  {
    icon: BoiteOutils,
    title: 'Boîte à outils',
    links: [
      { label: 'Base de données A-Z', href: '#' },
      { label: 'Guides disciplinaires', href: '#' },
      { label: 'Comment citer', href: '#' },
      { label: 'Droit d\'auteur', href: '#' },
    ],
    cta: { label: 'Découvrir tous les outils', href: '#' },
    footerColor: '#F04E24',
    bgColor: '#2a3440',
  },
  {
    icon: AutresResources,
    title: 'Ressources',
    links: [
      { label: 'Outil de recherche Sofia', href: '#' },
      { label: 'Papyrus – dépôt institutionnel', href: '#' },
      { label: 'GéoIndex – Données géospatiales', href: '#' },
      { label: 'Calypso – Objets numériques', href: '#' },
    ],
    cta: { label: 'Toutes les ressources', href: '#' },
    footerColor: '#52B782',
    bgColor: '#2a3440',
  },
];

// --- Boutons latéraux avec icônes ---
const quickLinks = [
  { label: 'Obtenir un document', href: '/obtenir/', icon: Books },
  { label: 'Réserver une salle', href: '/reserver', icon: DoorOpen },
  { label: 'Mon dossier', href: 'https://umontreal.account.worldcat.org/account', icon: FolderOpen },
  { label: 'Horaires', href: '/horaires', icon: ClockCountdown },
  { label: 'Nous joindre', href: '/nous-joindre/', icon: AddressBook },
  { label: 'À propos', href: '/a-propos/', icon: Info },
];


// Composant pour l'affichage compact sur mobile
function MobileQuickLinks() {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1,
        justifyContent: 'left'
      }}>
        
        {quickLinks.map((btn, i) => {
          const IconComponent = btn.icon;
          return (
            <Chip
              key={i}
              icon={<IconComponent size={16} />}
              label={btn.label}
              component="a"
              href={btn.href}
              clickable
              sx={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#c8cbcfff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.4)',
                },
                '& .MuiChip-icon': {
                  color: 'inherit',
                  marginLeft: '8px'
                }
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default function MenuSection({ onMenuToggle }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    const newState = !menuOpen
    setMenuOpen(newState)
    onMenuToggle?.(newState)
  }
  
  const closeMenu = () => {
    setMenuOpen(false)
    onMenuToggle?.(false)
  }

  return (
    <>
      {/* Section principale du menu */}
      <Box sx={{ padding: { xs: '0', md: '0' } }}>
        <Grid container spacing={2}>
          
          {/* Section des boutons - En premier sur mobile */}
          <Grid item xs={12} md={3} sx={{ 
            order: { xs: 1, md: 2 } // Ordre modifié pour mobile
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
                  {/* Bouton Accueil et Pages - Visible uniquement sur mobile/tablette */}
                  <Hidden mdUp>
                    {/* Bouton Accueil */}
                    <Button
                      fullWidth
                      href="/"
                      variant="outlined"
                      startIcon={<House size={20} />}
                      sx={{
                        justifyContent: 'flex-start',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        borderColor: 'rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        textTransform: 'none',
                        padding: '0.75rem 1rem',
                        transition: 'all 0.2s ease',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderColor: 'rgba(255,255,255,0.4)',
                        },
                      }}
                    >
                      Accueil
                    </Button>
                    {/* Boutons des pages */}
                    {pages.map((page, i) => (
                      <Button
                        key={i}
                        fullWidth
                        href={page.url}
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
                          fontSize: '0.95rem',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderColor: 'rgba(255,255,255,0.4)',
                          },
                        }}
                      >
                        {page.label}
                      </Button>
                    ))}
                  </Hidden>

                  {quickLinks.map((btn, i) => {
                    const IconComponent = btn.icon;
                    return (
                      <Button
                        key={i}
                        fullWidth
                        href={btn.href}
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
                          fontSize: '0.95rem',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderColor: 'rgba(255,255,255,0.4)',
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
          <Grid item xs={12} md={9} sx={{ 
            order: { xs: 2, md: 1 } // Ordre modifié pour mobile
          }}>
            <Grid container spacing={2} alignItems="stretch">
              {cards.map((card, i) => (
                <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: 'flex' }}>
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
                        transition: 'all 0.3s ease',
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
                                <StyledLink href={link.href}>
                                  → {link.label}
                                </StyledLink>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>

                    <CardActions sx={{ p: 0 }}>
                      {/* Footer CTA */}
                      <Box sx={{ 
                        fontWeight: 500, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        color: card.footerColor,
                        pt: 1
                      }}>
                        <StyledLink 
                          href={card.cta.href} 
                          sx={{
                            color: 'inherit',
                            fontSize: '0.9rem',
                            '&:hover': {
                              color: 'inherit',
                              textDecoration: 'underline',
                            }
                          }}
                        >
                          {card.cta.label} →
                        </StyledLink>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}