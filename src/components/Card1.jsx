import { styled } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'

import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import isInternalLink from '../utils/internLink.js'

const StyledTitle = styled('div')({
  flexGrow: 1,
  fontSize: '2rem',
  fontWeight: 500,
  lineHeight: 1.2,
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
export default function Card1({ title, IconComponent, moreText, href, ...rest }) {
  if (typeof href !== 'string') {
    throw new Error('The `href`prop must be a string')
  }

  const linkProps = {}
  const linkIsInternal = isInternalLink(href)

  const StyledLinkIcon = styled(linkIsInternal ? ArrowRight : ArrowUpRight)(({ theme }) => ({
    fill: '#ffca40',
    borderRadius: theme.shape.corner.full,
    width: '3.125rem',
    height: '3.125rem',
    backgroundColor: theme.palette.primary.dark,
    padding: '0.8125rem 0.8125rem',
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
      })}
    >
      <CardActionArea
        component="a"
        href={href}
        sx={(theme) => ({
          maxWidth: 345,
          aspectRatio: '0.8446',
          borderRadius: theme.shape.corner.small,
          color: '#FFF',
          display: 'block',
          padding: '1.875rem',
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        })}
        {...linkProps}
      >
        <CardContent
          component={Grid}
          sx={{
            padding: 0,
            flexDirection: 'column',
            height: '100%',
          }}
          container
          spacing="1.8125rem"
        >
          <IconComponent color="#ffffff88" size={55} />
          <StyledTitle component="div">{title}</StyledTitle>
          <Grid
            container
            size="grow"
            spacing="1.8125rem"
            sx={{
              alignItems: 'center',
              flexGrow: 0,
            }}
          >
            <Grid size="grow">
              <StyledMoreText>{moreText}</StyledMoreText>
            </Grid>
            <Grid size="auto">
              <StyledLinkIcon weight="light" />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
