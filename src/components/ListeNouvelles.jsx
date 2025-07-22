import { useStaticQuery, graphql } from 'gatsby'
import { Box, Card, CardActionArea, CardContent, Typography, keyframes, CircularProgress } from '@mui/material'
import Button from '@/components/Button'
import Link from '@/components/Link'
import { isInternalLink } from '@/utils/link'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'
import { useEffect, useState, useMemo, useCallback } from 'react'

// Animation subtile pour l'apparition
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

function getPath(path, slug) {
  if (slug) {
    return `/nouvelles/${path.split('/').slice(0, -1).join('/')}/${slug}`
  }
  return `/nouvelles/${path.replace(/\.mdx$/i, '')}`
}

function Header({ id, children }) {
  return (
    <Typography
      component="h3"
      id={id}
      sx={{
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: 1.2,
        animation: `${fadeIn} 0.5s ease-out`,
      }}
    >
      {children}
    </Typography>
  )
}

function Title({ children }) {
  return (
    <Box
      sx={{
        fontFamily: 'Lora',
        fontSize: '1.75rem',
        fontWeight: 500,
        lineHeight: 1.3,
        animation: `${fadeIn} 0.5s ease-out`,
      }}
    >
      {children}
    </Box>
  )
}

function Upper({ children }) {
  return (
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
        animation: `${fadeIn} 0.5s ease-out`,
      })}
    >
      {children}
    </Box>
  )
}

function Lower({ children, url, type }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'flex-end',
        fontSize: '1rem',
        lineHeight: 1,
        color: 'var(--_lower-color)',
        animation: `${fadeIn} 0.5s ease-out`,
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
  )
}

// Cache amélioré avec réessai automatique
const createNewsCache = () => {
  const cache = {
    data: null,
    timestamp: null,
    attempts: 0,
    maxAttempts: 3,
    expiry: 30 * 60 * 1000, // 30 minutes
    get isValid() {
      return this.data && this.timestamp && (Date.now() - this.timestamp) < this.expiry
    },
    clear() {
      this.data = null
      this.timestamp = null
      this.attempts = 0
    }
  }
  return cache
}

const newsCache = createNewsCache()

const parseRssXml = (xmlString) => {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlString, "text/xml")
    
    return Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
      title: item.querySelector('title')?.textContent?.trim() || '',
      link: item.querySelector('link')?.textContent?.trim() || '',
      description: (item.querySelector('description')?.textContent || '').replace(/<[^>]+>/g, '').trim(),
      pubDate: item.querySelector('pubDate')?.textContent?.trim() || '',
      enclosure: item.querySelector('enclosure')?.getAttribute('url') || null,
    }))
  } catch (error) {
    console.error('Error parsing RSS:', error)
    return []
  }
}

const fetchUdeMNews = async (signal) => {
  const rssFeedUrl = 'https://nouvelles.umontreal.ca/rss/sujets/bibliotheques/'
  
  try {
    // Essai direct
    const response = await fetch(rssFeedUrl, { 
      signal, 
      mode: 'cors',
      cache: 'no-store' // Empêche la mise en cache du navigateur
    })
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const text = await response.text()
    if (!text) throw new Error('Empty response')
    
    return parseRssXml(text)
  } catch (directError) {
    console.log('Trying proxy due to:', directError)
    
    // Essai via proxy si échec direct
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssFeedUrl)}`
      const proxyResponse = await fetch(proxyUrl, { signal })
      
      if (!proxyResponse.ok) throw new Error(`Proxy error! status: ${proxyResponse.status}`)
      
      const data = await proxyResponse.json()
      if (!data.contents) throw new Error('No contents in proxy response')
      
      return parseRssXml(data.contents)
    } catch (proxyError) {
      console.error('Proxy fetch failed:', proxyError)
      throw proxyError
    }
  }
}

export default function ListNouvelles({ title = 'Nouvelles', moreLink = '/nouvelles/', moreText = 'Toutes nos nouvelles', id }) {
  const [combinedNews, setCombinedNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  // Récupération des nouvelles locales
  const { allFile } = useStaticQuery(graphql`
    query ListeNouvellesCombineesQuery {
      allFile(filter: { sourceInstanceName: { eq: "nouvelles" }, extension: { eq: "mdx" } }, sort: { childMdx: { frontmatter: { date: DESC } } }) {
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
    }
  `)

  const processLocalNews = useMemo(() => {
    return allFile.nodes.map(node => {
      const { id, relativePath } = node
      const { frontmatter } = node.childMdx
      const url = frontmatter.type === 'interne' ? getPath(relativePath, frontmatter.slug) : frontmatter.newsUrl
      
      return {
        id,
        type: frontmatter.type,
        title: frontmatter.title,
        date: frontmatter.date,
        formattedDate: frontmatter.date,
        pubDate: new Date(frontmatter.date).toISOString(),
        url,
        source: frontmatter.source,
      }
    })
  }, [allFile.nodes])

  const loadNews = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // 1. Charger les nouvelles UdeM (avec cache)
      let udeMNews = []
      if (newsCache.isValid && newsCache.data) {
        udeMNews = newsCache.data
      } else {
        const abortController = new AbortController()
        const timeoutId = setTimeout(() => abortController.abort(), 10000) // Timeout après 10s
        
        try {
          udeMNews = await fetchUdeMNews(abortController.signal)
          
          const formattedUdeMNews = udeMNews.map(item => ({
            ...item,
            type: 'udem',
            pubDate: item.pubDate,
            formattedDate: new Date(item.pubDate).toLocaleDateString('fr', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            url: item.link,
            source: 'Nouvelles UdeM',
          }))

          newsCache.data = formattedUdeMNews
          newsCache.timestamp = Date.now()
          newsCache.attempts = 0
        } finally {
          clearTimeout(timeoutId)
        }
      }

      // 2. Combiner et trier les nouvelles
      const allNews = [...processLocalNews, ...udeMNews]
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 2)

      setCombinedNews(allNews)
      setLoading(false)
    } catch (error) {
      console.error('News loading error:', error)
      
      if (newsCache.attempts < newsCache.maxAttempts) {
        newsCache.attempts++
        setRetryCount(prev => prev + 1)
        setTimeout(() => loadNews(), 2000 * newsCache.attempts) // Backoff exponentiel
      } else {
        newsCache.clear()
        setError("Erreur lors du chargement des nouvelles. Veuillez réessayer plus tard.")
        setLoading(false)
        // Montrer quand même les nouvelles locales
        setCombinedNews(processLocalNews.slice(0, 2))
      }
    }
  }, [processLocalNews])

  useEffect(() => {
    const abortController = new AbortController()
    loadNews()

    return () => {
      abortController.abort()
    }
  }, [loadNews])

  // Validation des props
  useEffect(() => {
    if (typeof title !== 'string') console.error('The `title` parameter must be a string')
    if (typeof moreText !== 'string') console.error('The `moreText` parameter must be a string')
    if (typeof moreLink !== 'string') console.error('The `moreLink` parameter must be a url')
    
    try {
      new URL(moreLink, 'https://bib.umontreal.ca')
    } catch (e) {
      console.error('The `moreLink` parameter must be a valid url')
    }
  }, [title, moreText, moreLink])

  if (loading && combinedNews.length === 0) {
    return (
      <Box
        component="section"
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          '--_lower-icon-color': theme.palette.rougeOrange.main,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px'
        })}
      >
        <Header flexItem id={id}>
          {title}
        </Header>
        <CircularProgress />
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
      <Header flexItem id={id}>
        {title}
      </Header>

      {error && (
        <Typography 
          color="error" 
          sx={{ 
            animation: `${fadeIn} 0.5s ease-out`,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            padding: '10px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ⚠️ {error}
        </Typography>
      )}

      {combinedNews.map((newsItem, index) => (
        <Card
          key={newsItem.id || `${newsItem.url}-${index}`}
          sx={(theme) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.corner.small,
            backgroundColor: theme.palette.rose300.main,
            animation: `${fadeIn} ${0.3 + index * 0.1}s ease-out`,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          })}
        >
          <CardActionArea
            component={Link}
            to={newsItem.url}
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
              <Upper>{newsItem.formattedDate || newsItem.date}</Upper>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'stretch',
                  flexGrow: 1,
                }}
              >
                <Title>{newsItem.title}</Title>
                <Lower url={newsItem.url} type={newsItem.type === 'udem' ? 'externe' : newsItem.type}>
                  {newsItem.source}
                </Lower>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      {moreLink && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            animation: `${fadeIn} 0.5s ease-out`,
          }}
        >
          <Button 
            primary 
            href={moreLink}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              }
            }}
          >
            {moreText}
          </Button>
        </Box>
      )}
    </Box>
  )
}