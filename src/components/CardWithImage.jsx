import { CardMedia, Typography, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import { useIsExternal } from '@/hooks/use-is-external'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'

export default function CardWithImage({ title, Image, href, moreText = 'En savoir plus', ...rest }) {
  if (typeof title === 'undefined') throw new Error('The `title` prop is missing')
  if (typeof Image === 'undefined') throw new Error('The `Image` prop is missing')
  if (typeof href === 'undefined') throw new Error('The `href` prop is missing')

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
        height: 500, 
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      })}
      {...props}
    >
      <CardActionArea
        component="a"
        href={href}
        {...linkProps}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          '&:hover .bib-comp-card-with-image--more-text': {
            color: theme.palette.bleuPrincipal.main,
          },
        }}
      >
        <CardMedia
          component="img"
          src={Image}
          alt={title}
          sx={{
            width: '100%',
            height: 220,
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <CardContent
          sx={{
            backgroundColor: theme.palette.background.paper,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            padding: '1rem',
            overflow: 'hidden', // ✅ empêche de dépasser du Card fixe
          }}
        >
          <Typography
            component="h4"
            variant="h4"
            sx={{
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'clip', // ✅ pas de "..."
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '3', // ✅ limite le titre à 3 lignes max
            }}
          >
            {title}
          </Typography>
          <Grid
            container
            sx={{
              alignItems: 'center',
              width: '100%',
              marginTop: 'auto',
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