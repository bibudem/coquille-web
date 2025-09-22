import { memo, useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Box, List, ListItem, ListItemAvatar, CircularProgress, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { CalendarBlankIcon, ArrowSquareOutIcon, BookOpenIcon } from '@phosphor-icons/react'
import Link from '@/components/Link'
import { ArrowUpRightCircleIcon, ArrowRightCircleIcon } from '@/components/CustomIcons'

// Composants mémoïsés
const Header = memo(({ children }) => (
  <Typography component="h2" variant="h2">
    {children}
  </Typography>
))

const Title = memo(({ children }) => <Typography variant="h4">{children}</Typography>)

const Excerpt = memo(({ children }) => <Typography variant="body1">{children}</Typography>)

const Upper = memo(({ children }) => {
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
      })}
    >
      <CalendarBlankIcon size={20} color="currentColor" />
      {children}
    </Box>
  )
})

/**
 * Composant qui affiche une liste de nouvelles locales et UdeM.
 *
 * @param {string} id ID de l'élément HTML qui contient le composant.
 *
 * @returns {JSX.Element} Élément JSX qui affiche la liste de nouvelles locales et UdeM.
 */
export default function ListeNouvellesCombinees({ id = 'nouvelles-combinees' }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayCount, setDisplayCount] = useState(5)

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "nouvelles" }, extension: { eq: "mdx" } }, sort: { childMdx: { frontmatter: { date: DESC } } }) {
        nodes {
          id
          childMdx {
            excerpt(pruneLength: 200)
            frontmatter {
              date # ISO string
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
      allUdemNews(sort: { pubDate: DESC }) {
        nodes {
          id
          title
          link
          description
          pubDate # champ string ISO, formatted en JS
          enclosure
        }
      }
      images: allFile(filter: { sourceInstanceName: { eq: "nouvelles" }, internal: { mediaType: { glob: "image/*" } } }) {
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
        .map((node) => {
          const mdx = node.childMdx
          if (!mdx) return null

          const imageNode = data.images.nodes.find((img) => img.name === mdx.frontmatter.newsImage?.name)
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
      const udemNews = data.allUdemNews.nodes.map((node) => {
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
    setDisplayCount((prev) => prev + 5)
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
        {process.env.NODE_ENV === 'development' && <Box sx={{ mt: 2, fontSize: '0.8rem' }}>Voir la console pour les détails</Box>}
      </Box>
    )
  }

  if (news.length === 0) {
    return (
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        Aucune nouvelle récente n'a été trouvée.
        <Box sx={{ mt: 2 }}>
          <Button href="https://nouvelles.umontreal.ca" target="_blank" rel="noopener noreferrer" endIcon={<ArrowSquareOutIcon size={16} />}>
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
          <ListItem
            key={`${id}-${index}-${item.id || item.link}`}
            disableGutters
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: isSmallScreen ? '1rem' : '0',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Image en pleine largeur sur mobile */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: isSmallScreen ? 'column' : 'row',
                  gap: isSmallScreen ? '1rem' : '30px',
                }}
              >
                {!isSmallScreen && (
                  <ListItemAvatar>
                    {item.type === 'interne' && item.image ? (
                      <Link
                        to={item.link}
                        sx={{
                          display: 'block',
                          transition: 'transform 0.1s ease',
                          '&:hover': {
                            transform: 'scale(1.01)',
                          },
                        }}
                      >
                        <GatsbyImage
                          image={item.image}
                          alt={item.imageAlt}
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: '12px',
                          }}
                        />
                      </Link>
                    ) : item.type === 'udem' && item.imageUrl ? (
                      <Link
                        to={item.link}
                        target="_blank"
                        sx={{
                          display: 'block',
                          transition: 'transform 0.1s ease',
                          '&:hover': {
                            transform: 'scale(1.01)',
                          },
                        }}
                      >
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
                      </Link>
                    ) : (
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '12px',
                          bgcolor: 'grey.100',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <BookOpenIcon size={40} color="disabled" />
                      </Box>
                    )}
                  </ListItemAvatar>
                )}

                {isSmallScreen && (
                  <Box sx={{ width: '100%' }}>
                    {item.type === 'interne' && item.image ? (
                      <Link
                        to={item.link}
                        sx={{
                          display: 'block',
                          transition: 'transform 0.1s ease',
                          '&:hover': {
                            transform: 'scale(1.01)',
                          },
                        }}
                      >
                        <GatsbyImage
                          image={item.image}
                          alt={item.imageAlt}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '200px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                          }}
                        />
                      </Link>
                    ) : item.type === 'udem' && item.imageUrl ? (
                      <Link
                        to={item.link}
                        target="_blank"
                        sx={{
                          display: 'block',
                          transition: 'transform 0.1s ease',
                          '&:hover': {
                            transform: 'scale(1.01)',
                          },
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt=""
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '200px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                          }}
                        />
                      </Link>
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: '120px',
                          borderRadius: '12px',
                          bgcolor: 'grey.100',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <BookOpenIcon size={40} color="disabled" />
                      </Box>
                    )}
                  </Box>
                )}

                <Box sx={{ flex: 1 }}>
                  <Upper>{item.formattedDate}</Upper>
                  <Link
                    to={item.link}
                    target={item.type === 'udem' ? '_blank' : undefined}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit!important',
                      '&:hover': {
                        ...(item.type === 'udem' ? { '& h3': { color: 'rgba(0, 87, 172) !important', textDecoration: 'none' } } : { color: 'rgba(0, 87, 172)!important', textDecoration: 'none' }),
                      },
                    }}
                  >
                    <Title>{item.title}</Title>
                  </Link>
                  <Excerpt>
                    {item.type === 'udem'
                      ? item.description
                          .replace(/<[^>]+>/g, '')
                          .replace(/&[^;]+;/g, ' ')
                          .substring(0, isSmallScreen ? 150 : 300)
                      : item.excerpt?.substring(0, isSmallScreen ? 150 : 300)}
                    ...
                  </Excerpt>
                </Box>
              </Box>

              <Box
                component={Link}
                to={item.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  justifyContent: isSmallScreen ? 'flex-start' : 'flex-end',
                  width: '100%',
                }}
              >
                {!isSmallScreen && (item.type === 'udem' ? <ArrowUpRightCircleIcon color="#0057ac" fontSize={50} /> : <ArrowRightCircleIcon color="#0057ac" fontSize={50} />)}
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
              },
            },
          }}
        >
          Voir toutes les nouvelles UdeM
          <span className="MuiButton-icon MuiButton-endIcon MuiButton-iconSizeMedium css-1g78ho2">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#616161" viewBox="0 0 256 256">
              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
            </svg>
          </span>
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
