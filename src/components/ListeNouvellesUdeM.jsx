import React, { useEffect, useState, useMemo } from 'react'
import { 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  CircularProgress,
  Button,
  Typography
} from '@mui/material'
import { 
  CalendarBlank, 
  ArrowSquareOut,
  BookOpen,
  ArrowRight
} from '@phosphor-icons/react'
import Link from '@/components/Link'

// Composants mémoïsés
const Header = React.memo(({ children }) => (
  <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 500, lineHeight: 1.2 }}>
    {children}
  </Typography>
))

const Title = React.memo(({ children }) => (
  <Typography variant="h3" sx={{ fontSize: '1.7778rem', fontWeight: 500, lineHeight: 1.2 }}>
    {children}
  </Typography>
))

const Excerpt = React.memo(({ children }) => (
  <Typography variant="body1" sx={{ fontSize: '0.8889rem', lineHeight: 1.2, letterSpacing: '0.16px' }}>
    {children}
  </Typography>
))

const Upper = React.memo(({ children }) => {
  return (
    <Box sx={(theme) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '.5em',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '.00875rem',
      color: theme.palette.rougeOrange.main,
    })}>
      <CalendarBlank size={20} color="currentColor" />
      {children}
    </Box>
  )
})

// Cache simple en mémoire
const newsCache = {
  data: null,
  timestamp: null,
  expiry: 30 * 60 * 1000, // 30 minutes en millisecondes
  get isValid() {
    return this.data && this.timestamp && (Date.now() - this.timestamp) < this.expiry
  }
}

// Parseur XML optimisé avec recherche CDATA
const parseRssXml = (xmlString) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, "text/xml")
  
  const items = []
  const itemNodes = xmlDoc.querySelectorAll('item')
  
  for (let i = 0; i < itemNodes.length; i++) {
    const item = itemNodes[i]
    const description = item.querySelector('description')?.textContent || ''
    
    // Extraction du contenu CDATA
    const cdataContent = description.match(/<!\[CDATA\[(.*?)\]\]>/s)?.[1] || description
    
    items.push({
      title: item.querySelector('title')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      description: cdataContent,
      pubDate: item.querySelector('pubDate')?.textContent || '',
      enclosure: item.querySelector('enclosure')?.getAttribute('url') || null,
    })
  }
  
  return { items }
}

export default function ListeNouvellesUdeM({ 
  title = 'Nouvelles UdeM', 
  id = 41
}) {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [displayCount, setDisplayCount] = useState(5) // Afficher 5 éléments par défaut

  const rssFeeds = useMemo(() => [
    { url: 'https://nouvelles.umontreal.ca/rss/sujets/bibliotheques/' },
  ], [])

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()
    
    const fetchNews = async () => {
      // Vérifier le cache d'abord
      if (newsCache.isValid) {
        if (isMounted) {
          setNews(newsCache.data)
          return
        }
      }
      
      setLoading(true)
      setError(null)
      
      try {
        const feedPromises = rssFeeds.map(async (feed) => {
          try {
            // Essayer directement sans proxy d'abord
            let response
            try {
              response = await fetch(feed.url, {
                signal: abortController.signal,
                mode: 'cors'
              })
            } catch (directError) {
              // Si échec, utiliser le proxy
              const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`
              response = await fetch(proxyUrl, { 
                signal: abortController.signal 
              })
            }

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
            
            const data = response.url.includes('allorigins') 
              ? await response.json().then(d => ({ contents: d.contents }))
              : { contents: await response.text() }
            
            const parsedRss = parseRssXml(data.contents)
            
            return parsedRss.items.map(item => ({
              ...item,
              pubDate: item.pubDate,
              formattedDate: new Date(item.pubDate).toLocaleDateString('fr', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
              enclosures: item.enclosure ? [{ url: item.enclosure }] : [],
            }))
          } catch (error) {
            console.error(`Error with feed ${feed.url}:`, error)
            return []
          }
        })

        const allNews = (await Promise.all(feedPromises)).flat()

        // Tri par date
        const sortedNews = allNews
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

        if (isMounted) {
          setNews(sortedNews)
          setLoading(false)
          
          // Mise en cache
          newsCache.data = sortedNews
          newsCache.timestamp = Date.now()
        }
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          console.error('Fetch error:', error)
          setError("Erreur lors du chargement des nouvelles. Veuillez réessayer.")
          setLoading(false)
        }
      }
    }

    fetchNews()

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [id, rssFeeds])

  const handleShowMore = () => {
    setDisplayCount(prev => prev + 5) // Ajouter 5 éléments à chaque clic
  }

  if (loading && news.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ padding: 2, color: 'error.main' }}>
        {error}
        {process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 2, fontSize: '0.8rem' }}>
            Voir la console pour les détails
          </Box>
        )}
      </Box>
    )
  }

  if (news.length === 0) {
    return (
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        Aucune nouvelle récente n'a été trouvée.
        <Box sx={{ mt: 2 }}>
          <Button
            href="https://nouvelles.umontreal.ca"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<ArrowSquareOut size={16} />}
          >
            Voir toutes les nouvelles UdeM
          </Button>
        </Box>
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
      id={id}
    >
      <Header>{title}</Header>
      <List>
        {news.slice(0, displayCount).map((item, index) => (
          <ListItem key={`${id}-${index}-${item.link}`} disableGutters>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', gap: '30px', width: '100%' }}>
                <ListItemAvatar>
                  {item.enclosures?.length > 0 ? (
                    <img
                      src={item.enclosures[0].url}
                      alt=""
                      loading="lazy"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: '12px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Box sx={{ 
                      width: 120, 
                      height: 120, 
                      borderRadius: '12px',
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <BookOpen size={40} color="disabled" />
                    </Box>
                  )}
                </ListItemAvatar>
                <Box sx={{ flex: 1 }}>
                  <Upper>{item.formattedDate}</Upper>
                  <Title>{item.title}</Title>
                  <Excerpt>
                    {item.description
                      .replace(/<[^>]+>/g, '')
                      .replace(/&[^;]+;/g, ' ')
                      .substring(0, 300)}...
                  </Excerpt>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  component={Link}
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                   endIcon={
                      <span class="MuiButton-icon MuiButton-endIcon MuiButton-iconSizeMedium css-1g78ho2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#616161" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg></span>
                    }
                  sx={{ textTransform: 'none' }}
                >
                  Lire plus
                </Button>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      
      {news.length > displayCount && (
        <Box sx={{ textAlign: 'center' }}>
          <Button 
          onClick={handleShowMore}
          sx={{ 
            textTransform: 'none',
            backgroundColor: '#0b113a',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0e1544',
            },
            padding: '8px 24px', 
            borderRadius: '40px', 
            fontWeight: 500,
            fontSize: '0.875rem',
            minWidth: '200px', 
            transition: 'all 0.3s ease', 
          }}
        >
          Charger d’autres nouvelles
        </Button>
        </Box>
      )}
      
     <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Button
        href="https://nouvelles.umontreal.ca/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ 
          textTransform: 'none',
          backgroundColor: '#0057ac',
          color: 'white',
          '&:hover': {
            backgroundColor: '#02478b',
          },
          padding: '8px 24px',
          borderRadius: '40px',
          fontWeight: 500,
          fontSize: '0.875rem',
          minWidth: '200px',
          transition: 'all 0.3s ease',
          // Styles pour l'icône
          '& .MuiButton-endIcon': {
            marginLeft: '8px',
            '& svg': {
              width: '18px',
              height: '18px',
            }
          }
        }}
        endIcon={
          <span class="MuiButton-icon MuiButton-endIcon MuiButton-iconSizeMedium css-1g78ho2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#616161" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg></span>
        }
      >
        Voir toutes les nouvelles UdeM
      </Button>
    </Box>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  )
}