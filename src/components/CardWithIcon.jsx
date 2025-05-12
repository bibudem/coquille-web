import { useEffect, useRef, useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'

import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import Div from '@/components/utils/Div'
import { isInternalLink } from '@/utils/link'
import { getContrastColor } from '../../plugins/gatsby-plugin-bib-theme/tokens/tokens.js'

const HOVER_WIDTH_FACTOR = 1.1

const sizes = {
  small: {
    width: 290,
    height: 332,
  },
  large: {
    width: 335,
    height: 400,
  },
}

const Row = styled(Grid)({
  width: '100%',
})

const StyledTitle = styled('div')({
  '--_lh': '1.2',
  lineHeight: 'calc(var(--_lh) * 1em)',
  fontSize: '1.7778rem',
  fontWeight: 500,
  paddingBlockStart: '1.6667rem',
})

const StyledMoreText = styled('div')({
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.6,
})

/**
 * Composant CardWithIcon qui affiche une carte interactive avec des effets au survol et un dimensionnement dynamique
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Le texte du titre affiché dans la carte
 * @param {React.ComponentType} props.Icon - Le composant d'icône affiché en haut
 * @param {('primary'|'bleuPrincipal'|'vertFonce'|'rose300')} [props.color='bleuPrincipal'] - Le thème de couleur de la carte
 * @param {string} props.moreText - Le texte affiché au-dessus de l'icône de flèche
 * @param {string} props.href - L'URL pour le lien de la carte (interne ou externe)
 * @param {boolean} [props.small=false] - Indique s'il faut utiliser les dimensions réduites de la carte
 * @throws {Error} Lorsque la propriété href n'est pas une chaîne de caractères
 * @returns {React.ReactElement} Un composant Card MUI stylisé
 */

export default function CardWithIcon({ title, Icon, color = 'bleuPrincipal', moreText, href, small = false, ...rest }) {
  const { sx, ...props } = rest
  const linkProps = {}
  const theme = useTheme()
  const [isSmall, setIsSmall] = useState(small)
  const [cardSize, setCardSize] = useState(isSmall ? sizes.small : sizes.large)
  const titleRef = useRef(null)
  const moreTextRef = useRef(null)

  const colorMap = {
    primary: {
      bg: theme.palette.primary.main,
      hoverBg: theme.palette.primary.dark,
      iconColor: '#ffffff88',
      linkIconColor: '#fff',
    },
    bleuPrincipal: {
      bg: theme.palette.bleuPrincipal.main,
      hoverBg: theme.palette.bleuPrincipal.dark,
      iconColor: '#ffffff88',
      linkIconColor: '#fff',
    },
    vertFonce: {
      bg: theme.palette.vertFonce.main,
      hoverBg: theme.palette.vertFonce.dark,
      iconColor: '#ffffff88',
      linkIconColor: '#fff',
    },
    rose300: {
      bg: theme.palette.rose300.main,
      hoverBg: theme.palette.rose500.main,
      iconColor: '#f04e2488',
      linkIconColor: theme.palette.rougeOrange.main,
    },
  }

  if (typeof title === 'undefined') {
    throw new Error('The `title` prop is required and must be a string')
  }

  if (typeof href !== 'string') {
    throw new Error('The `href` prop must be a string')
  }

  const [_color, _setColor] = useState(colorMap.bleuPrincipal)

  useEffect(() => {
    if (Reflect.has(colorMap, color)) {
      _setColor(colorMap[color])
    }
  }, [])

  useEffect(() => {
    setIsSmall(small)
  }, [small])

  useEffect(() => {
    setCardSize(isSmall ? sizes.small : sizes.large)
  }, [isSmall])

  const linkIsInternal = isInternalLink(href)

  const StyledLinkIcon = styled(linkIsInternal ? ArrowRight : ArrowUpRight)(({ theme }) => ({
    fill: _color.linkIconColor,
    borderRadius: theme.shape.corner.full,
    width: '3.125rem',
    height: '3.125rem',
    backgroundColor: _color.hoverBg,
    padding: '0.8125rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }))

  if (!linkIsInternal) {
    linkProps.rel = 'noopener'
  }

  useEffect(() => {
    if (titleRef) {
      titleRef.current.style.maxWidth = `${titleRef.current.offsetWidth}px`
    }
  }, [titleRef])

  useEffect(() => {
    if (moreTextRef) {
      moreTextRef.current.style.maxWidth = `${moreTextRef.current.offsetWidth}px`
    }
  }, [moreTextRef])

  return (
    <Card
      sx={(theme) => ({
        borderRadius: theme.shape.corner.small,
        boxShadow: 'none',
        width: cardSize.width,
        height: cardSize.height,
        transition: `width ${theme.transitions.duration.md3.medium1}ms ${theme.transitions.easing.md3.emphasized}`,
        '&:hover': {
          width: cardSize.width * HOVER_WIDTH_FACTOR,
        },
        ...sx,
      })}
      {...props}
    >
      <CardActionArea
        component="a"
        href={href}
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          borderRadius: theme.shape.corner.small,
          color: getContrastColor(_color.bg, '#fff', '#111'),
          display: 'flex',
          padding: '1.6667rem',
          backgroundColor: _color.bg,
          '&:hover': {
            backgroundColor: _color.hoverBg,
          },
          '.MuiCardActionArea-focusHighlight': {
            transitionDuration: theme.transitions.duration.md3.medium1,
            transitionEasing: theme.transitions.easing.md3.emphasized,
          },
        })}
        {...linkProps}
      >
        <CardContent
          component={Div}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 0,

            height: '100%',
            width: '100%',
          }}
          container
        >
          <Row
            sx={{
              height: '55px',
              '> svg': {
                display: 'flex',
              },
            }}
          >
            <Icon color={_color.iconColor} size={55} />
          </Row>
          <Row sx={{ flexGrow: 1 }}>
            <StyledTitle ref={titleRef}>{title}</StyledTitle>
          </Row>
          <Row sx={{ height: '55px' }}>
            <Grid
              container
              size="auto"
              spacing="1rem"
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Grid size="grow">
                <StyledMoreText ref={moreTextRef}>{moreText}</StyledMoreText>
              </Grid>
              <Grid size="auto">
                <StyledLinkIcon weight="light" />
              </Grid>
            </Grid>
          </Row>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
