import { useState } from 'react'
import { styled, Typography, useTheme } from '@mui/material'

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
  backgroundPosition: 'top',
  border: '#E5F0F8 1px solid',
  boxShadow: '0 1px 5px #E5F0F8',
  transition: 'all 0.4s cubic-bezier(.17,.67,.5,1.03)',

  '&:hover, &.hovered': {
    boxShadow: '0 1px 5px #686a6d49',
    transform: 'translateY(-2px)',
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '18rem',
    height: '22rem',
    margin: '0 10px 15px 0',
  },
  
  [theme.breakpoints.down('xs')]: {
    width: '100%',
    height: '20rem',
    margin: '0 0 15px 0',
  },
}))

const Thumb = styled('div')(({ theme, image }) => ({
  width: '100%',
  height: '260px',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
  
  [theme.breakpoints.down('xs')]: {
    height: '180px',
  },
}))

const Infos = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '260px',
  left: 0,
  padding: '14px 24px',
  background: '#fff',
  transition: 'transform 0.4s 0.15s cubic-bezier(.17,.67,.5,1.03)',
  display: 'flex',
  flexDirection: 'column',
  
  '&.hovered': {
    transform: 'translateY(-250px)',
  },
  
  [theme.breakpoints.down('sm')]: {
    top: '200px',
    
    '&.hovered': {
      transform: 'translateY(-200px)',
    },
  },
  
  [theme.breakpoints.down('xs')]: {
    top: '180px',
    padding: '12px 16px',
    
    '&.hovered': {
      transform: 'translateY(-180px)',
    },
  },
}))

const Subtitle = styled('h6')(({ theme }) => ({
  color: '#0057AC',
  opacity: 0,
  transition: 'opacity 0.5s 0.25s cubic-bezier(.17,.67,.5,1.03)',
  
  '&.visible': {
    opacity: 1,
  }
}))


const DescriptionContainer = styled('div')(({ theme }) => ({
  flex: 1,
  width: '100%',
  maxHeight: '50%',
  marginTop: '5px',
  marginBottom: '5px',
  overflow: 'hidden',
  
  [theme.breakpoints.down('xs')]: {
    maxHeight: '50%',
    marginBottom: '8px',
  },
}))

const ScrollableDescription = styled('div')(({ theme }) => ({
  color: 'rgba(21, 37, 54, 0.8)',
  maxHeight: '100%',
  overflowY: 'auto',
  paddingRight: '8px',
  opacity: 0,
  transition: 'opacity 0.5s 0.25s cubic-bezier(.17,.67,.5,1.03)',
  
  '&.visible': {
    opacity: 1,
  },
  
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '6px',
    
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
  },
  
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
}))

export default function ImageHoverCard({ title, subtitle, seats, details, Image, children }) {
  const [isHovered, setIsHovered] = useState(false)
  const theme = useTheme()

  if (!Image) throw new Error('The `Image` prop is missing')

  return (
    <CardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      role="article"
      aria-label={`Card: ${title}`}
      tabIndex={0}
    >
      <Thumb image={Image} aria-hidden="true" />
      
      <Infos className={isHovered ? 'hovered' : ''}>
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
        
        {subtitle && (
          <Subtitle 
            component="p" 
            variant="body2" 
            className={isHovered ? 'visible' : ''}
          >
            {subtitle}
          </Subtitle>
        )}
          
        <DescriptionContainer>
          <ScrollableDescription 
            className={isHovered ? 'visible' : ''}
            aria-label="Description"
          >
            {children}
          </ScrollableDescription>
        </DescriptionContainer>
      </Infos>
    </CardContainer>
  )
}