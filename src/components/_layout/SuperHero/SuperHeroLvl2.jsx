import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Section from '@/components/Section'
import LayoutContainer from '@/components/utils/LayoutContainer'
import { appBarHeight } from '@/components/_layout/AppBar/TopAppBar'
import { SuperHeroContext } from '@/components/_layout/SuperHero/SuperHeroContext'
import { useSmall } from '@/hooks/use-small'

export const inlineOffset = '0 215px'

const boxSize = {
  height: '230px',
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

  const isSmall = useSmall()
  const [contextData, setContextData] = useState({})

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

  useEffect(() => {
    setContextData(
      isSmall
        ? {
            inlineOffset: '20px',
            bottomOffset: '2rem',
          }
        : {
            inlineOffset,
            bottomOffset: '48px',
          }
    )
  }, [isSmall])

  return (
    <>
      <SuperHeroContext.Provider value={contextData}>
        <Box
          className="bib-comp-super-hero"
          sx={{
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
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              background: `rgba(0, 0, 0, 0.40)`,
              zIndex: 1,
            }}
          ></Box>
          <LayoutContainer
            id="t"
            sx={(theme) => ({
              zIndex: 2,
              padding: '0 0 .5rem',
              [theme.breakpoints.up('md')]: {
                padding: `0 215px 48px 0`,
              },
            })}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Typography
                component="h1"
                variant="textWhite"
              >
                {title}
              </Typography>
            </Box>
          </LayoutContainer>
          <div style={{ zIndex: 2 }}>{children}</div>
        </Box>
        <div
          style={{
            width: boxSize.width,
            height: `calc(${boxSize.height} - ${appBarHeight})`,
          }}
        />
      </SuperHeroContext.Provider>
    </>
  )
}
