import { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'

import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import isInternalLink from '../utils/internLink.js'
import { getContrastColor } from '../../plugins/gatsby-plugin-bib-theme/tokens.js'

const StyledTitle = styled('div')({
  flexGrow: 1,
  fontSize: '1.75rem',
  fontWeight: 500,
  lineHeight: 1.2,
  width: '100%',
})

/**
 * Card1 component that renders a card with a title, icon, link text, and link.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {React.ComponentType} props.Icon - The icon component to be displayed.
 * @param {string} props.href - The URL of the link.
 * @param {any} props.rest - Any additional props to be passed to the component.
 * @returns {React.ReactElement} - The Card1 component.
 */
export default function Card2({ title, Icon, href, ...rest }) {
  const { sx, ...props } = rest
  const linkProps = {}
  const theme = useTheme()
  const [linkIsInternal, setLinkIsInternal] = useState(null)

  const _color = {
    bg: theme.palette.bleuPrincipal.main,
    hoverBg: theme.palette.bleuPrincipal.dark,
    iconColor: '#ffffff88',
    linkIconColor: '#fff',
  }

  if (typeof href !== 'string') {
    throw new Error('The `href`prop must be a string')
  }

  useEffect(() => {
    if (href) {
      setLinkIsInternal(isInternalLink(href))
    }
  }, [href])

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
        color: getContrastColor(_color.bg, '#fff', '#111'),
        boxShadow: 'none',
        height: '100%',
        minHeight: '100%',
        maxWidth: '20.125rem',
        width: '20.125rem',
        ...sx,
      })}
      {...props}
    >
      <CardActionArea
        component="a"
        href={href}
        sx={{
          width: '100%',
          height: '100%',
          display: 'block',
          padding: '30px',
          backgroundColor: _color.bg,
          '&:hover': {
            backgroundColor: _color.hoverBg,
          },
        }}
        {...linkProps}
      >
        <CardContent
          component={Grid}
          sx={{
            padding: 0,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            flexShrink: 0,
            height: '100%',
          }}
          container
          spacing="1.5rem"
        >
          <Grid size="12">
            <Icon color={_color.iconColor} size={55} />
          </Grid>
          <Grid size="12">
            <StyledTitle component="div">{title}</StyledTitle>
          </Grid>
          <Grid container sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', flexGrow: 1 }}>
            <StyledLinkIcon weight="light" />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
