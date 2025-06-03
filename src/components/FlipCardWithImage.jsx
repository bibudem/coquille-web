import { useState } from 'react'
import { styled, useTheme } from '@mui/material'


const cardSize = {
  width: '23rem',
  height: '25rem',
}

const CardContainer = styled('div')(({ theme, image }) => ({
  position: 'relative',
  width: '23rem',
  height: '25rem',
  cursor: 'default',
  overflow: 'hidden',
  borderRadius: theme.shape.corner.medium,
  backgroundImage: `
    linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
    url(${image})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}))


const Overlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: theme.spacing(3), 
  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
  color: theme.palette.common.white,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  zIndex: 2,
  overflow: 'hidden',
  cursor: 'default',
}))

const StyledTitle = styled('div')(({ theme }) => ({
  fontSize: '1.75rem',         
  fontWeight: theme.typography.fontWeightMedium,  
  lineHeight: theme.typography.h2.lineHeight,
  marginTop: '-15px',
  marginBottom: '20px',                
  padding: theme.spacing(0.375, 0.75), 
  display: 'inline-block',
  color: theme.palette.common.white,
}))

const Description = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  maxHeight: '75%',
  overflowY: 'auto',
  padding: theme.spacing(0.375, 0.75), 
}))

export default function FlipCardWithImage({ title, Image, children }) {
  const [isHovered, setIsHovered] = useState(false)

  if (!Image) throw new Error('The `Image` prop is missing')

  return (
    <CardContainer
      image={Image}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Overlay style={{ transform: isHovered ? 'translateY(0%)' : 'translateY(65%)' }}>
        <StyledTitle>{title}</StyledTitle>
        <Description>{children}</Description>
      </Overlay>
    </CardContainer>
  )
}
