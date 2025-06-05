import { useStaticQuery, graphql } from 'gatsby'
import { Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton } from '@mui/material'
import { CalendarBlankIcon } from '@phosphor-icons/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Link from '@/components/Link'

function Header({ children }) {
  return (
    <Box
      sx={{
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: 1.2,
      }}
    >
      header: {children}
    </Box>
  )
}

function Title({ children }) {
  return (
    <Box
      sx={{
        fontSize: '1.7778rem',
        fontWeight: 500,
        lineHeight: 1.2,
        color: 'inherit',
      }}
    >
      {children}
    </Box>
  )
}

function Excerpt({ children }) {
  return (
    <Box
      sx={{
        fontSize: '0.8889rem',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '0.16px',
        color: 'inherit',
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
      })}
    >
      <CalendarBlankIcon size={20} color="currentColor" />
      {children}
    </Box>
  )
}

/**
 * @param {object} props - Les propriétés du composant.
 * @param {string} [props.title='Nouvelles'] - Le titre de la liste de nouvelles.
 * @param {string} props.id - L'identifiant HTML unique pour l'élément de titre.
 * @returns {JSX.Element} Le composant ListeNouvelles.
 */
export default function ListNouvelles({ title = 'Nouvelles', id }) {
  if (typeof title !== 'string') {
    throw new Error('The `title` parameter must be a string')
  }

  const data = useStaticQuery(graphql`
    query ListeNouvellesRichQuery {
      allFile(filter: { sourceInstanceName: { eq: "nouvelles" }, extension: { eq: "mdx" } }, sort: { childMdx: { frontmatter: { date: DESC } } }) {
        nodes {
          id
          relativeDirectory
          relativePath
          childMdx {
            excerpt(pruneLength: 200)
            frontmatter {
              authors
              date(formatString: "LL", locale: "fr")
              newsImage {
                alt
                legend
                name
                source
              }
              newsUrl
              slug
              source
              title
              type
            }
          }
        }
      }

      images: allFile(filter: { sourceInstanceName: { eq: "nouvelles" }, internal: { mediaType: { glob: "image/*" } } }) {
        nodes {
          id
          name
          absolutePath
          relativePath
          relativeDirectory
          childrenImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  `)

  const images = new Map()

  data.images.nodes.forEach((node) => {
    images.set(node.name, node.childrenImageSharp[0]?.gatsbyImageData)
  })

  const nouvelles = data.allFile.nodes.map((node) => {
    const { id, relativePath } = node
    const {
      excerpt,
      frontmatter: { authors, date, newsImage, newsUrl, slug, source, title, type },
    } = node.childMdx
    const url = type === 'interne' ? `/nouvelles/${relativePath.replace(/\.mdx$/i, '')}` : newsUrl
    return {
      id,
      authors,
      date,
      excerpt,
      images: images.get(newsImage.name),
      newsImage,
      newsUrl: url,
      slug,
      source,
      title,
      type,
    }
  })

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

      <List>
        {nouvelles.map(({ id, authors, date, excerpt, images, newsImage, newsUrl, slug, source, title, type }) => (
          <ListItem key={id} disableGutters>
            <ListItemButton
              component={Link}
              to={newsUrl}
              sx={{
                gap: '30px',
                rect: {
                  transition: 'opacity 250ms ease-in-out',
                },
                ':hover': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  rect: {
                    opacity: 0,
                    transition: 'opacity 250ms ease-in-out',
                  },
                },
              }}
            >
              <ListItemAvatar>
                {images ? (
                  <GatsbyImage
                    image={images}
                    alt={newsImage.alt}
                    title={newsImage.caption}
                    layout="fullWidth"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '12px',
                    }}
                  />
                ) : (
                  <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: '12px' }} />
                )}
              </ListItemAvatar>
              <ListItemText sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }} disableTypography secondary={<Excerpt>{excerpt}</Excerpt>}>
                <Upper>{date}</Upper>
                <Title>{title}</Title>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
