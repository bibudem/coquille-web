import { CardMedia, styled, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import { useIsExternal } from '@/hooks/use-is-external'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'

const Title = styled('div')({
  flexGrow: 1,
  fontFamily: 'Lora',
  fontSize: '1.875rem',
  fontWeight: 400,
  lineHeight: 1.2,
})

/**
 * CardWithImage component that renders a card with a banner image, title, icon, and link.
 * @param {Object} props - The component props
 * @param {string} props.title - The title text displayed in the card
 * @param {string} props.Image - The image URL to be displayed as banner
 * @param {string} props.href - The URL the card links to
 * @param {string} [props.moreText='En savoir plus'] - Optional text for the "learn more" link
 * @param {Object} [props.sx] - Optional MUI system styles to apply to the card
 * @throws {Error} When required props title, Image or href are missing
 * @returns {React.ReactElement} A clickable card component with image, title and link
 */
export default function CardWithImage({ title, Image, href, moreText = 'En savoir plus', ...rest }) {
  if (typeof title === 'undefined') {
    throw new Error('The `title` prop is missing')
  }

  if (typeof Image === 'undefined') {
    throw new Error('The `Image` prop is missing')
  }

  if (typeof href === 'undefined') {
    throw new Error('The `href` prop is missing')
  }

  const { sx, ...props } = rest

  const theme = useTheme()
  const { linkProps, linkIcon } = useIsExternal(href, {
    icons: {
      external: <ArrowRightCircleIcon color={theme.palette.bleuPrincipal.main} fontSize={50} />,
      internal: <ArrowUpRightCircleIcon color={theme.palette.bleuPrincipal.main} fontSize={50} />,
    },
  })

  return (
    <Card
      sx={(theme) => ({
        borderRadius: theme.shape.corner.small,
        boxShadow: 'none',
        width: 330,
        height: 417,
        ...sx,
      })}
      {...props}
    >
      <CardActionArea
        component="a"
        href={href}
        {...linkProps}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          '&:hover .bib-comp-card-with-image--more-text': {
            color: theme.palette.bleuPrincipal.main,
          },
        }}
      >
        <CardMedia
          image={Image}
          sx={{
            width: 330,
            height: 220,
          }}
        />
        <CardContent
          sx={{
            backgroundColor: theme.palette.background.paper,
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
          }}
        >
          <Title>{title}</Title>
          <Grid
            container
            sx={{
              flexGrow: 0,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Grid
              size="grow"
              className="bib-comp-card-with-image--more-text"
              sx={{
                fontSize: '1rem',
              }}
            >
              {moreText}
            </Grid>
            <Grid size="auto" sx={{ display: 'flex' }}>
              {linkIcon}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
