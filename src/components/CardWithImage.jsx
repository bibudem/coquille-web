import { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import ConditionalWrapper from '@/components/ConditionalWrapper'
import isInternalLink from '../utils/internLink.js'

const StyledTitle = styled('div')({
  flexGrow: 1,
  fontSize: '1.75rem',
  fontWeight: 500,
  lineHeight: 1.2,
  width: '100%',
})

/**
 * CardWithImage component that renders a card with a title, icon, link text, and link.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {React.ComponentType} props.Image - The icon component to be displayed.
 * @param {string} props.href - The URL of the link.
 * @param {any} props.rest - Any additional props to be passed to the component.
 * @returns {React.ReactElement} - The CardWithImage component.
 */
export default function CardWithImage({ title, Image, href, ...rest }) {
  const { sx, ...props } = rest

  if (typeof Image === 'undefined') {
    throw new Error('The `Image` prop is missing')
  }

  const linkProps = {}
  const theme = useTheme()
  const [linkIsInternal, setLinkIsInternal] = useState(null)

  useEffect(() => {
    if (href) {
      setLinkIsInternal(isInternalLink(href))
    }
  }, [href])

  if (!linkIsInternal) {
    linkProps.rel = 'noopener'
  }

  return (
    <Card
      sx={(theme) => ({
        borderRadius: theme.shape.corner.small,
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%) no-repeat, url('${Image}') no-repeat center center`,
        backgroundSize: 'cover',
        color: '#111',
        boxShadow: 'none',
        height: '100%',
        minHeight: '100%',
        maxWidth: '20.125rem',
        width: '20.125rem',
        ...sx,
      })}
      {...props}
    >
      <ConditionalWrapper
        condition={typeof href === 'string'}
        wrapper={(children) => (
          <CardActionArea
            component="a"
            href={href}
            sx={{
              width: '100%',
              height: '100%',
              display: 'block',
              padding: '30px',
            }}
            {...linkProps}
          >
            {children}
          </CardActionArea>
        )}
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
          <Grid
            container
            sx={{
              alignItems: 'flex-end',
              height: '100%',
            }}
          >
            <Grid>
              <StyledTitle> {title} </StyledTitle>
            </Grid>
          </Grid>
        </CardContent>
      </ConditionalWrapper>
    </Card>
  )
}
