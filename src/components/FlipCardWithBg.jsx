import { useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const bgColors = ['bleuPrincipal', 'rose300', 'vertFonce']

const ElegantCard = styled(Card)(({ theme, bgcolor }) => ({
  position: 'relative',
  width: '23rem',
  height: '25rem',
  overflow: 'hidden',
  marginRight: '20px',
  cursor: 'default',
  borderRadius: theme.shape.corner.medium,
  backgroundColor: bgcolor,
  color: theme.palette.common.white,
  boxShadow: 'none',
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  '&:hover, &:focus-within': {
    transform: 'translateY(-3px)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
  // Pour écrans petits : réduction fixe en rem
  [theme.breakpoints.down('sm')]: {
    width: '18rem',
    height: '20.5rem',
  },

  // Pour écrans très petits : encore plus petit
  [theme.breakpoints.down('xs')]: {
    width: '14rem',
    height: '16.5rem',
  }
}))

const CardContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  outline: 'none',
})

const TitleContainer = styled('h4')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(8),
  zIndex: 3,
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  opacity: 1,
  transform: 'translateY(0)',
  '&.hovered': {
    top: '0',
    bottom: 'auto',
    transform: 'translateY(0)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
}))

const StyledTitle = styled('h4')(({ theme }) => ({
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 4,
  '& svg': {
    width: 50,
    height: 50,
    transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& svg': {
      transition: 'none',
    },
  },
}))

const DescriptionContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(3),
  maxHeight: '52%',
  overflowY: 'auto',
  fontSize: '1rem',
  fontWeight: '350',
  zIndex: 2,
  opacity: 0,
  transform: 'translateY(10px)',
  transition: `all ${theme.transitions.duration.md3.medium3}ms ${theme.transitions.easing.md3.emphasized}`,
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
}))

export default function ElegantHoverCard({ title, Icon, bg = 'bleuPrincipal', children, ...rest }) {
  const [hovered, setHovered] = useState(false)
  const theme = useTheme()

  if (!title) throw new Error('The `title` prop is missing')
  if (!Icon) throw new Error('The `Icon` prop is missing')
  if (!bgColors.includes(bg)) throw new Error(`Invalid bg value. Accepted: ${bgColors.join(', ')}`)

  const bgColor = theme.palette[bg]?.main || theme.palette.primary.main
  const isRose = bg === 'rose300'
  const textColor = isRose ? theme.palette.common.black : theme.palette.common.white
  const iconColor = isRose ? 'rgb(240, 78, 36)' : theme.palette.common.white

  const handleFocus = () => setHovered(true)
  const handleBlur = () => setHovered(false)

  return (
    <ElegantCard
      bgcolor={bgColor}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="region"
      aria-label={`Carte : ${title}`}
      {...rest}
    >
      <CardContainer
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <IconWrapper>
          <Grid
            sx={{
              svg: {
                fill: isRose ? theme.palette.rougeOrange?.main || iconColor : iconColor,
                fillOpacity: 0.5,
                width: 45,
                fontSize: 45,
                height: 'auto',
              },
            }}
          >
            <Icon />
          </Grid>
        </IconWrapper>

        <TitleContainer className={hovered ? 'hovered' : ''}>
          <StyledTitle sx={{ color: textColor }}>{title}</StyledTitle>
        </TitleContainer>

        <DescriptionContainer className={hovered ? 'visible' : ''} sx={{ color: textColor }}>
          {children}
        </DescriptionContainer>
      </CardContainer>
    </ElegantCard>
  )
}
