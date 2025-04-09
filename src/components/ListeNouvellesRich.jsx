import { useStaticQuery, graphql } from 'gatsby'
import { Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton } from '@mui/material'
import Button from '@/components/Button'
import Link from '@/components/Link'
import Div from '@/components/utils/Div'
import isInternalLink from '@/utils/internLink'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'
import { CalendarBlank } from '@phosphor-icons/react'
import { GatsbyImage } from 'gatsby-plugin-image'

function Header({ children }) {
  return (
    <Div
      sx={{
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: 1.2,
      }}
    >
      {children}
    </Div>
  )
}

function Title({ children }) {
  return (
    <Div
      sx={{
        fontSize: '1.7778rem',
        fontWeight: 500,
        lineHeight: 1.2,
        color: 'inherit',
      }}
    >
      {children}
    </Div>
  )
}

function Excerpt({ children }) {
  return (
    <Div
      sx={{
        fontSize: '0.8889rem',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '0.16px',
        color: 'inherit',
      }}
    >
      {children}
    </Div>
  )
}

function Upper({ children }) {
  return (
    <Div
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
      <CalendarBlank size={20} color="currentColor" />
      {children}
    </Div>
  )
}

export default function ListNouvelles({ title = 'Nouvelles', moreLink = '/nouvelles/', ...rest }) {
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
  console.log([...images.entries()])
  const nouvelles = data.allFile.nodes.map((node) => {
    const { id, relativePath, relativeDirectory } = node
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
    <Div
      component="section"
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        '--_lower-icon-color': theme.palette.rougeOrange.main,
      })}
    >
      <Header flexItem>{title}</Header>

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
    </Div>
  )
}
