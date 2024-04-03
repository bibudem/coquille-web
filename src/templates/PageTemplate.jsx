import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Container, Divider, Tab, Tabs } from '@mui/material'
import AppBar from '@/components/AppBar'
import Footer from '@/components/Footer'
import Link from '@/components/Link'

const shortcodes = { Link, Accordion, AccordionDetails, AccordionSummary, Button, Box, Divider, Tab, Tabs } // Provide common components here
// const shortcodes = { Button, Box } // Provide common components here

export default function PageTemplate({ data, children }) {
  return (
    <MDXProvider components={shortcodes}>
      <AppBar />
      <Container component="main">{children}</Container>
      <Footer />
    </MDXProvider>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`
