import { useStaticQuery, graphql } from 'gatsby'
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import Button from '@/components/Button'
import Link from '@/components/Link'
import { isInternalLink } from '@/utils/link'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'
import React, { useMemo } from 'react'

function getPath(path, slug) {
  try {
    if (!path) return '/nouvelles'
    if (slug) {
      const pathParts = path.split('/').slice(0, -1)
      return `/nouvelles/${pathParts.join('/')}/${slug}`.replace(/\/+/g, '/')
    }
    return `/nouvelles/${path.replace(/\.mdx$/i, '')}`.replace(/\/+/g, '/')
  } catch (error) {
    console.error('Error generating path:', error)
    return '/nouvelles'
  }
}

function formatDate(dateString) {
  if (!dateString) return ''

  try {
    // Si la date est déjà formatée en français (venant de GraphQL)
    if (typeof dateString === 'string' && dateString.match(/\d{1,2} \p{L}+ \d{4}/u)) {
      return dateString
    }

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''

    return date.toLocaleDateString('fr', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

const Header = React.memo(({ id, children }) => (
  <Typography
    component="h3"
    id={id}
    sx={{
      fontSize: '32px',
      fontWeight: 500,
      lineHeight: 1.2,
    }}
  >
    {children}
  </Typography>
))

const Title = React.memo(({ children }) => (
  <Box
    sx={(theme) => ({
      fontFamily: 'Lora',
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.3,
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
        lineHeight: 1.2,
      },
    })}
  >
    {children}
  </Box>
))

const Upper = React.memo(({ children }) => (
  <Box
    sx={(theme) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '.5em',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '.00875rem',
      color: theme.palette.rougeOrange.main,
    })}
  >
    {children}
  </Box>
))

const Lower = React.memo(({ children, url, type }) => (
  <Box
    sx={{
      display: 'flex',
      flexGrow: 1,
      alignItems: 'flex-end',
      fontSize: '1rem',
      lineHeight: 1,
      color: 'var(--_lower-color)',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '.5em',
        fontSize: '.875rem',
        fontWeight: 400,
        letterSpacing: '0.00875rem',
        width: '100%',
      }}
    >
      {children}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        {type === 'interne' && url && isInternalLink(url) ? (
          <ArrowRightCircleIcon color="var(--_lower-icon-color)" fontSize={50} />
        ) : (
          <ArrowUpRightCircleIcon color="var(--_lower-icon-color)" fontSize={50} />
        )}
      </Box>
    </Box>
  </Box>
))

const NewsCard = React.memo(({ news }) => (
  <Card
    sx={(theme) => ({
      boxShadow: 'none',
      borderRadius: theme.shape.corner.small,
      backgroundColor: theme.palette.rose300.main,
    })}
  >
    <CardActionArea
      component={Link}
      to={news.url}
      target={news.type === 'externe' ? '_blank' : undefined}
      rel={news.type === 'externe' ? 'noopener noreferrer' : undefined}
      sx={(theme) => ({
        '.MuiCardActionArea-focusHighlight': {
          transitionDuration: `${theme.transitions.duration.md3.medium1}ms`,
          transitionTimingFunction: theme.transitions.easing.md3.emphasized,
        },
        rect: {
          transition: `opacity ${theme.transitions.duration.md3.medium1}ms ${theme.transitions.easing.md3.emphasized}`,
        },
        ':hover': {
          textDecoration: 'none',
          rect: {
            opacity: 0,
            transition: `opacity ${theme.transitions.duration.md3.medium1}ms ${theme.transitions.easing.md3.emphasized}`,
          },
        },
      })}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.94rem',
          height: '19.0625rem',
          padding: '1.88rem',
        }}
      >
        <Upper>{news.date || 'Date inconnue'}</Upper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
            flexGrow: 1,
          }}
        >
          <Title>{news.title || 'Sans titre'}</Title>
          <Lower url={news.url} type={news.type}>
            {news.source || 'Source inconnue'}
          </Lower>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
))

export default function ListeNouvellesAccueil({ 
  title = 'Nouvelles', 
  moreLink = '/nouvelles/', 
  moreText = 'Toutes nos nouvelles', 
  id 
}) {
  // Validation des props
  const isValid = useMemo(() => {
    try {
      if (typeof title !== 'string') throw new Error('title must be a string')
      if (typeof moreText !== 'string') throw new Error('moreText must be a string')
      if (typeof moreLink !== 'string') throw new Error('moreLink must be a string')
      new URL(moreLink, 'https://bib.umontreal.ca')
      return true
    } catch (error) {
      console.error('Invalid props:', error)
      return false
    }
  }, [title, moreText, moreLink])

  // Requête GraphQL
  const { localNews, udemNews } = useStaticQuery(graphql`
    query ListeNouvellesCombineesQuery {
      localNews: allFile(
        filter: { 
          sourceInstanceName: { eq: "nouvelles" }, 
          extension: { eq: "mdx" } 
        }, 
        sort: { 
          childMdx: { 
            frontmatter: { 
              date: DESC 
            } 
          } 
        }
      ) {
        nodes {
          id
          relativePath
          childMdx {
            frontmatter {
              date(formatString: "LL", locale: "fr")
              newsUrl
              slug
              source
              title
              type
            }
          }
        }
      }
      
      udemNews: allUdemNews(sort: { fields: pubDate, order: DESC }) {
        nodes {
          id
          title
          link
          pubDate
          formattedDate
        }
      }
    }
  `)

  // Transformation et combinaison des données
  const combinedNews = useMemo(() => {
    try {
      const local = localNews.nodes.map(node => {
        const frontmatter = node.childMdx?.frontmatter || {}
        return {
          id: node.id,
          date: formatDate(frontmatter.date),
          url: frontmatter.type === 'interne' 
            ? getPath(node.relativePath, frontmatter.slug)
            : frontmatter.newsUrl || '#',
          source: frontmatter.source || 'Bibliothèque',
          title: frontmatter.title || 'Sans titre',
          type: frontmatter.type || 'interne'
        }
      })

      const udem = udemNews.nodes.map(node => ({
        id: node.id,
        date: node.formattedDate || formatDate(node.pubDate),
        url: node.link || '#',
        source: 'UdeM Nouvelles',
        title: node.title || 'Sans titre',
        type: 'externe'
      }))

      return [...local, ...udem]
        .filter(news => news.date && news.title)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2)
    } catch (error) {
      console.error('Error processing news data:', error)
      return []
    }
  }, [localNews, udemNews])

  if (!isValid) {
    return (
      <Box sx={{ p: 2, backgroundColor: 'error.light', color: 'error.contrastText' }}>
        Configuration invalide - Veuillez vérifier les paramètres
      </Box>
    )
  }

  if (combinedNews.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        Aucune nouvelle disponible pour le moment
      </Box>
    )
  }

  return (
    <Box
      component="section"
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        '--_lower-icon-color': theme.palette.rougeOrange.main,
      })}
    >
      <Header id={id}>{title}</Header>

      {combinedNews.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button primary href={moreLink}>
          {moreText}
        </Button>
      </Box>
    </Box>
  )
}