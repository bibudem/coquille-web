import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Section from '@/components/Section'
import { appBarHeight } from '@/components/AppBar/TopAppBar'

export const inlineOffset = '3.75rem'

const boxSize = {
  height: '49.75rem',
  width: '100%',
}

/**
 * A full-width hero section component with background image and text overlay
 * @param {string} title - The main heading text to display (required)
 * @param {React.ReactNode} subTitle - Optional subtitle content below the heading
 * @param {string} imageName - Name of the image file to use as background (required)
 * @param {string} alt - Alt text for the background image (defaults to empty string)
 * @returns {JSX.Element} A hero section with gradient overlay and text content
 */
export default function SuperHero({ title, subTitle, imageName, alt = '', ...rest }) {
  if (typeof title === 'undefined') {
    throw new Error('title prop is required')
  }

  if (typeof imageName === 'undefined') {
    throw new Error('imageName prop is required')
  }

  const { children, ...props } = rest

  const data = useStaticQuery(graphql`
    query ImageQuery {
      allFile(filter: { sourceInstanceName: { eq: "super-heroes" } }) {
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

  const imageNode = data.allFile.nodes.find((node) => node.name === imageName)
  const image = imageNode.childrenImageSharp[0].gatsbyImageData

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          ...boxSize,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <GatsbyImage
          className="bib-comp-super-hero"
          image={image}
          layout="fullWidth"
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          loading="eager"
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.48) 5%, rgba(0, 0, 0, 0.20) ${appBarHeight})`,
            zIndex: 1,
          }}
        ></div>
        <Section
          sx={{
            padding: `0 0 ${children ? '1rem' : '4.25rem'} ${inlineOffset}`,
            zIndex: 2,
          }}
        >
          <Grid container direction="row">
            <Grid size={8}>
              <Typography variant="display1" component="h1">
                {title}
              </Typography>
              {subTitle}
            </Grid>
          </Grid>
        </Section>
        <div style={{ zIndex: 2 }}>{children}</div>
      </div>
      <div
        style={{
          width: boxSize.width,
          height: `calc(${boxSize.height} - ${appBarHeight})`,
        }}
      />
    </>
  )
}
