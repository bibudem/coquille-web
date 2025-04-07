import { useStaticQuery, graphql } from 'gatsby'
import { Card, CardActionArea, CardContent } from '@mui/material'
import Button from '@/components/Button'
import Link from '@/components/Link'
import Div from '@/components/utils/Div'
import isInternalLink from '@/utils/internLink'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'

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
    query NouvellesQuery {
      allFile(filter: { sourceInstanceName: { eq: "nouvelles" }, extension: { eq: "mdx" } }, sort: { childMdx: { frontmatter: { date: DESC } } }, limit: 3) {
        nodes {
          absolutePath
          id
          name
          childMdx {
            frontmatter {
              articleUrl
              authors
              date(formatString: "LL", locale: "fr")
              imageAlt
              imageCaption
              imageName
              slug
              source
              title
              type
            }
            fields {
              timeToRead {
                minutes
                text
              }
            }
          }
        }
      }
    }
  `)

  const nouvelles = data.allFile.nodes.map((node) => {
    const {
      frontmatter: { articleUrl, authors, date, imageAlt, imageCaption, imageName, slug, source, title, type },
      fields: {
        timeToRead: { text },
      },
    } = node.childMdx
    return {
      articleUrl,
      authors,
      date,
      imageAlt,
      imageCaption,
      imageName,
      slug,
      source,
      title,
      type,
      text,
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

      {nouvelles.map(({ articleUrl, authors, date, imageAlt, imageCaption, imageName, slug, source, text, title, type }) => (
        <Card
          sx={(theme) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.corner.small,
            backgroundColor: theme.palette.rose300.main,
          })}
        >
          <CardActionArea
            component={Link}
            to={slug}
            sx={{
              rect: {
                transition: 'opacity 250ms ease-in-out',
              },
              ':hover': {
                rect: {
                  opacity: 0,
                  transition: 'opacity 250ms ease-in-out',
                },
              },
            }}
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
                <Lower url={articleUrl} type={type}>
                  {text}
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
