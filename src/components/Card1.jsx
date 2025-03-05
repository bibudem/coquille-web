import { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'

import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import isInternalLink from '../utils/internLink.js'
import { getContrastColor } from '../../plugins/gatsby-plugin-bib-theme/tokens.js'

const HOVER_WIDTH_FACTOR = 1.15

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
  // maxHeight: 'calc(var(--_lh) * 3em)',
  // overflow: 'hidden',
  fontSize: '2rem',
  fontWeight: 500,
})

const StyledMoreText = styled('div')({
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: 1.5,
})

/**
 * Card1 component that renders a card with a title, icon, link text, and link.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {React.ComponentType} props.IconComponent - The icon component to be displayed.
 * @param {string} props.moreText - The text to be displayed for the link.
 * @param {string} props.href - The URL of the link.
 * @param {any} props.rest - Any additional props to be passed to the component.
 * @returns {React.ReactElement} - The Card1 component.
 */
export default function Card1({ title, IconComponent, color = 'bleuPrincipal', moreText, href, small = false, ...rest }) {
  const { sx, ...props } = rest
  const linkProps = {}
  const theme = useTheme()
  const [isSmall, setIsSmall] = useState(small)
  const [cardSize, setCardSize] = useState(isSmall ? sizes.small : sizes.large)

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

  if (typeof href !== 'string') {
    throw new Error('The `href`prop must be a string')
  }

  const [_color, _setColor] = useState(colorMap.bleuPrincipal)

  useEffect(() => {
    if (Reflect.has(colorMap, color)) {
      _setColor(colorMap[color])
    }
  }, [color, colorMap])

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

  return (
    <Card
      sx={(theme) => ({
        borderRadius: theme.shape.corner.small,
        boxShadow: 'none',
        width: cardSize.width,
        height: cardSize.height,
        transition: 'width 1.2s ease-in-out',
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
          overflow: 'hidden',
          outline: '1px dotted red',
          // aspectRatio: isSmall ? 0.8735 : 0.8446,
          borderRadius: theme.shape.corner.small,
          color: getContrastColor(_color.bg, '#fff', '#111'),
          display: 'flex',
          padding: '1.875rem',
          backgroundColor: _color.bg,
          '&:hover': {
            backgroundColor: _color.hoverBg,
          },
        })}
        {...linkProps}
      >
        <CardContent
          component={Grid}
          sx={{
            padding: 0,
            flexDirection: 'row',
            alignContent: 'flex-start',
            height: '100%',
            width: '100%',
          }}
          container
          spacing="1.8125rem"
        >
          <Row
            sx={{
              outline: '1px dotted red',
              '> svg': {
                display: 'flex',
              },
            }}
          >
            <IconComponent color={_color.iconColor} size={55} />
          </Row>
          <Row sx={{ outline: '1px dotted green', flexGrow: 1 }}>
            <StyledTitle>{title}</StyledTitle>
          </Row>
          <Row sx={{ outline: '1px dotted yellow' }}>
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
                <StyledMoreText>{moreText}</StyledMoreText>
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
