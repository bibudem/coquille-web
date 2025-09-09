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
  backgroundImage: `
    linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
    url(${image})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  
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
  
  // Dégradé en bas pour renforcer le contraste du titre
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent)',
    pointerEvents: 'none',
  },
  
  '&:hover::before, &:focus::before': {
    backgroundColor: 'rgba(7, 31, 56, 0.7)',
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '18rem',
    height: '20rem',
  },
  
  [theme.breakpoints.down('xs')]: {
    width: '14rem',
    height: '16rem',
  }
}))

const Overlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '100%',
  padding: theme.spacing(3),
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  cursor: 'default',
  zIndex: 2
  
}))

const TitleContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 3,
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  
  '&.hovered': {
    bottom: 'auto',
    top: theme.spacing(3),
    transform: 'translateY(0) scale(0.95)',
  },
  
  '&:not(.hovered)': {
    transform: 'translateY(10px)'
  }
}))

const StyledTitle = styled('h3')(({ theme }) => ({
  color: theme.palette.common.white,
  margin: 0,
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
}))

const Subtitle = styled('h6')(({ theme }) => ({
  color: '#e5f0f8',
}))

const DescriptionContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxHeight: '75%',
  color: '#e5f0f8',
  marginTop: theme.spacing(2),
  overflow: 'hidden'
}))

const ScrollableDescription = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  maxHeight: '100%',
  overflowY: 'auto',
  zIndex: 1000,
  paddingRight: theme.spacing(1),
  
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: '6px',
    
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.6)'
    }
  }
}))

export default function FlipCardWithImage({ title, subtitle, Image, children }) {
  const [isHovered, setIsHovered] = useState(false)
  const theme = useTheme()

  if (!Image) throw new Error('The `Image` prop is missing')

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <CardContainer
      image={Image}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label={title}
      tabIndex={0}
    >
      <TitleContainer className={isHovered ? 'hovered' : ''}>
        <StyledTitle>{title}</StyledTitle>
      </TitleContainer>

      <Overlay>
        <Fade in={isHovered} timeout={500}>
          <DescriptionContainer>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            <ScrollableDescription>
              {children}
            </ScrollableDescription>
          </DescriptionContainer>
        </Fade>
      </Overlay>
    </CardContainer>
  )
}