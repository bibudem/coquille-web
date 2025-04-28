import { useStaticQuery, graphql } from 'gatsby'
import { Card, CardActionArea, CardContent } from '@mui/material'
import Button from '@/components/Button'
import Link from '@/components/Link'
import Div from '@/components/utils/Div'
import { isInternalLink } from '@/utils/link'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'

function getPath(path, slug) {
  if (slug) {
    return `/nouvelles/${path.split('/').slice(0, -1).join('/')}/${slug}`
  }
  return `/nouvelles/${path.replace(/\.mdx$/i, '')}`
}

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
        fontFamily: 'Lora',
        fontSize: '1.75rem',
        fontWeight: 500,
        lineHeight: 1.3,
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
      {children}
    </Div>
  )
}

function Lower({ children, url, type }) {
  return (
    <Div
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'flex-end',
        fontSize: '1rem',
        lineHeight: 1,
        color: 'var(--_lower-color)',
      }}
    >
      <Div
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
        <Div
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          {type === 'interne' && url && isInternalLink(url) ? <ArrowRightCircleIcon color="var(--_lower-icon-color)" fontSize={50} /> : <ArrowUpRightCircleIcon color="var(--_lower-icon-color)" fontSize={50} />}
        </Div>
      </Div>
    </Div>
  )
}

export default function ListNouvelles({ title = 'Nouvelles', moreLink = '/nouvelles/', moreText = 'Toutes nos nouvelles', ...rest }) {
  if (typeof title !== 'string') {
    throw new Error('The `title` parameter must be a string')
  }

  if (typeof moreText !== 'string') {
    throw new Error('The `moreText` parameter must be a string')
  }

  if (typeof moreLink !== 'string') {
    throw new Error('The `moreLink` parameter must be a url')
  }

  try {
    new URL(moreLink, 'https://bib.umontreal.ca')
  } catch (e) {
    throw new Error('The `moreLink` parameter must be a valid url')
  }

  const data = useStaticQuery(graphql`
    query ListeNouvellesQuery {
      allFile(filter: { sourceInstanceName: { eq: "nouvelles" }, extension: { eq: "mdx" } }, sort: { childMdx: { frontmatter: { date: DESC } } }, limit: 2) {
        nodes {
          id
          name
          relativePath
          childMdx {
            frontmatter {
              authors
              date(formatString: "LL", locale: "fr")
              newsImage {
                name
                alt
                legend
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
    }
  `)

  const nouvelles = data.allFile.nodes.map((node) => {
    const { id, relativePath } = node
    const {
      frontmatter: { authors, date, newsImage, newsUrl, slug, source, title, type },
    } = node.childMdx
    const url = type === 'interne' ? getPath(relativePath, slug) : newsUrl
    return {
      id,
      authors,
      date,
      newsImage,
      url,
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

      {nouvelles.map(({ id, authors, date, newsImage, url, source, title, type }) => (
        <Card
          key={id}
          sx={(theme) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.corner.small,
            backgroundColor: theme.palette.rose300.main,
          })}
        >
          <CardActionArea
            component={Link}
            to={url}
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
              <Upper>{date}</Upper>
              <Div
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'stretch',
                  flexGrow: 1,
                }}
              >
                <Title>{title}</Title>
                <Lower url={url} type={type}>
                  {source}
                </Lower>
              </Div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      {moreLink && (
        <Div
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button primary href={moreLink}>
            {moreText}
          </Button>
        </Div>
      )}
    </Div>
  )
}
