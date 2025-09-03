import { useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Fade from '@mui/material/Fade'

const CardContainer = styled('div')(({ theme, image }) => ({
  position: 'relative',
  width: '23rem',
  height: '25rem',
  overflow: 'hidden',
  marginRight: '20px',
  overflow: 'hidden',
  cursor: 'default',
  borderRadius: theme.shape.corner.medium,
  backgroundImage: `
    linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
    url(${image})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-3px)',
    '& .overlay': {
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) 65%, transparent 100%)'
    }
  },
   // Pour écrans petits : réduction fixe en rem
  [theme.breakpoints.down('sm')]: {
    width: '18rem',
    height: '20rem',
  },

  // Pour écrans très petits : encore plus petit
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

const DescriptionContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxHeight: '65%',
  marginTop: theme.spacing(2),
  overflow: 'hidden'
}))

const ScrollableDescription = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.common.white,
  maxHeight: '100%',
  overflowY: 'auto',
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

export default function ImageHoverCard({ title, Image, children }) {
  const [isHovered, setIsHovered] = useState(false)
  const theme = useTheme()

  if (!Image) throw new Error('The `Image` prop is missing')

  return (
    <CardContainer
      image={Image}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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