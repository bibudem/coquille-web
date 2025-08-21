import { useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Fade from '@mui/material/Fade'

const CardContainer = styled('div')(({ theme, image }) => ({
  position: 'relative',
  width: '23rem',
  height: '25rem',
  overflow: 'hidden',
  marginRight: '20px',
  cursor: 'default',
  borderRadius: theme.shape.corner.medium,
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',

  '&:hover': {
    transform: 'translateY(-3px)',
  },

  // Voile sombre global (au hover/focus)
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.3s ease',
    zIndex: 1,
    pointerEvents: 'none',
  },
  '&:hover::before, &:focus::before': {
    backgroundColor: 'rgba(7, 31, 56, 0.7)',
  },

  // Dégradé en bas pour renforcer le contraste du titre
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
    transition: 'background 0.3s ease',
    zIndex: 2,
    pointerEvents: 'none',
  },
  '&:hover::after, &:focus::after': {
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
  },

  [theme.breakpoints.down('sm')]: {
    width: '18rem',
    height: '20rem',
  },

  [theme.breakpoints.down('xs')]: {
    width: '14rem',
    height: '16rem',
  },
}))

const Overlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '100%',
  padding: theme.spacing(3),
  background: 'transparent', // aucun dégradé ici
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  cursor: 'default',
  zIndex: 3, // au-dessus du dégradé
}))

const TitleContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 4,
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  '&.hovered': {
    bottom: 'auto',
    top: theme.spacing(3),
    transform: 'translateY(0) scale(0.95)',
  },
  '&:not(.hovered)': {
    transform: 'translateY(10px)',
  },
}))

const StyledTitle = styled('h3')(({ theme }) => ({
  color: theme.palette.common.white,
  margin: 0,
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
}))

const DescriptionContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxHeight: '65%',
  marginTop: theme.spacing(2),
  overflow: 'hidden',
}))

const ScrollableDescription = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.common.white,
  maxHeight: '100%',
  overflowY: 'auto',
  paddingRight: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.6)',
    },
  },
}))

export default function ImageHoverCard({ title, Image, children }) {
  const [isHovered, setIsHovered] = useState(false)
  const theme = useTheme()

  if (!Image) throw new Error('The `Image` prop is missing')

  return (
    <CardContainer
      image={Image}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      role="region"
      aria-label={title}
      tabIndex={0}
    >
      <TitleContainer className={isHovered ? 'hovered' : ''}>
        <StyledTitle>{title}</StyledTitle>
      </TitleContainer>

      <Overlay className="overlay">
        <Fade in={isHovered} timeout={500}>
          <DescriptionContainer>
            <ScrollableDescription>
              {children}
            </ScrollableDescription>
          </DescriptionContainer>
        </Fade>
      </Overlay>
    </CardContainer>
  )
}