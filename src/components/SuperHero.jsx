import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'
import Section from '@/components/Section'
import { appBarHeight } from '@/components/AppBar/TopAppBar'
import { useEffect, useState } from 'react'
import zIndex from '@mui/material/styles/zIndex'

const boxSize = {
  height: '49.75rem',
  width: '100%',
}

export default function SuperHero({ title, subTitle, image, img, ...rest }) {
  if (typeof title === 'undefined') {
    throw new Error('title prop is required')
  }

  if (typeof image === 'undefined') {
    throw new Error('image prop is required')
  }

  const { children, ...props } = rest
  const [_img, setImg] = useState(null)
  // const hasChildren = Boolean(children.type() !== null)

  // const data = useStaticQuery(graphql`
  //   query allImages {
  //     allFile {
  //       edges {
  //         node {
  //           childImageSharp {
  //             gatsbyImageData(width: 300, placeholder: NONE, quality: 75, layout: CONSTRAINED)
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

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
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  `)

  console.log('data', data)
  const imageNode = data.allFile.nodes.find((node) => node.name === img)

  console.log('imageNode', imageNode)

  const imagez = imageNode.childrenImageSharp[0].gatsbyImageData

  console.log('imagez', imagez)

  useEffect(() => {
    setImg(imagez)
  }, [data])

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          outline: '1px solid red',
          ...boxSize,
          // background: `linear-gradient(180deg, rgba(0, 0, 0, 0.48) 5%, rgba(104, 104, 104, 0.11) 22%, rgba(255, 255, 255, 0.00) 36%), url(${image}) lightgray 50% / cover no-repeat`,
          backgroundSize: 'cover',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <GatsbyImage
          image={imagez}
          layout="fullWidth"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
        <Section
          sx={{
            padding: `0 0 4.25rem 5.69rem`,
            zIndex: 1,
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
        {children}
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
