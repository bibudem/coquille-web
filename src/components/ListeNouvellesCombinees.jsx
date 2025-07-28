import React, { useEffect, useState } from 'react'
import { 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
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
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

// Composants mémoïsés
const Header = React.memo(({ children }) => (
  <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 500, lineHeight: 1.2 }}>
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



export default function ListeNouvellesCombinees({ 
  title = 'Nouvelles', 
  id = 'nouvelles-combinees'
}) {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayCount, setDisplayCount] = useState(5)

  const data = useStaticQuery(graphql`
    query {
      allFile(
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
          childMdx {
            excerpt(pruneLength: 200)
            frontmatter {
              date  # ISO string
              newsImage {
                name
                alt
              }
              slug
              title
              type
            }
          }
        }
      }
      allUdemNews(sort: { fields: pubDate, order: DESC }) {
        nodes {
          id
          title
          link
          description
          pubDate  # champ string ISO, formatted en JS
          enclosure
        }
      }
      images: allFile(
        filter: { 
          sourceInstanceName: { eq: "nouvelles" }, 
          internal: { mediaType: { glob: "image/*" } } 
        }
      ) {
        nodes {
          name
          childrenImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  `)

  useEffect(() => {
    try {
      // Extraction nouvelles locales
      const localNews = data.allFile.nodes
        .map(node => {
          const mdx = node.childMdx
          if (!mdx) return null

          const imageNode = data.images.nodes.find(img =>
            img.name === mdx.frontmatter.newsImage?.name
          )
          const year = mdx.frontmatter.date ? new Date(mdx.frontmatter.date).getFullYear() : null
          const link = year ? `/nouvelles/${year}/${mdx.frontmatter.slug}` : `/nouvelles/${mdx.frontmatter.slug}`
          return {
            id: node.id,
            type: 'interne',
            title: mdx.frontmatter.title,
            excerpt: mdx.excerpt,
            // garder date brute ISO pour tri
            date: mdx.frontmatter.date || null,
            formattedDate: mdx.frontmatter.date
              ? new Date(mdx.frontmatter.date).toLocaleDateString('fr', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '',
            link: link,
            image: imageNode?.childrenImageSharp?.[0]?.gatsbyImageData || null,
            imageAlt: mdx.frontmatter.newsImage?.alt || '',
          }
        })
        .filter(Boolean)

      // Extraction nouvelles UdeM
      const udemNews = data.allUdemNews.nodes.map(node => {
        // formater date pubDate en string locale FR
        const dateObj = node.pubDate ? new Date(node.pubDate) : null
        return {
          id: node.id,
          type: 'udem',
          title: node.title,
          description: node.description,
          date: node.pubDate || null,
          formattedDate: dateObj
            ? dateObj.toLocaleDateString('fr', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '',
          link: node.link,
          imageUrl: node.enclosure || null,
        }
      })

      // Fusionner et trier par date décroissante
      const combinedNews = [...localNews, ...udemNews].sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0
        const dateB = b.date ? new Date(b.date).getTime() : 0
        return dateB - dateA
      })

      setNews(combinedNews)
    } catch (err) {
      setError('Erreur lors du chargement des nouvelles')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [data])

  const handleShowMore = () => {
    setDisplayCount(prev => prev + 5)
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
      <List>
        {news.slice(0, displayCount).map((item, index) => (
          <ListItem key={`${id}-${index}-${item.id || item.link}`} disableGutters>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', gap: '30px', width: '100%' }}>
                <ListItemAvatar>
                  {item.type === 'interne' && item.image ? (
                    <GatsbyImage
                      image={item.image}
                      alt={item.imageAlt}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: '12px',
                      }}
                    />
                  ) : item.type === 'udem' && item.imageUrl ? (
                    <img
                      src={item.imageUrl}
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
                    {item.type === 'udem' 
                      ? item.description
                          .replace(/<[^>]+>/g, '')
                          .replace(/&[^;]+;/g, ' ')
                          .substring(0, 300)
                      : item.excerpt?.substring(0, 300)}...
                  </Excerpt>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {item.type === 'udem' ? (
                  <Button
                    component={Link}
                    to={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={
                      <span className="MuiButton-icon MuiButton-endIcon MuiButton-iconSizeMedium css-1g78ho2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#616161" viewBox="0 0 256 256">
                          <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                        </svg>
                      </span>
                    }
                    sx={{ textTransform: 'none' }}
                  >
                    Lire plus
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to={item.link}  
                    sx={{ textTransform: 'none' }}
                    endIcon={<ArrowRight size={20} />}
                  >
                    Lire plus
                  </Button>
                )}
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
            Charger d'autres nouvelles
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
            '& .MuiButton-endIcon': {
              marginLeft: '8px',
              '& svg': {
                width: '18px',
                height: '18px',
              }
            }
          }}
          endIcon={
            <ArrowSquareOut size={24} />
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