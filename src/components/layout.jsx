import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Hello from './hello.js'

const shortcodes = { Hello }

export default function Layout({ children }) {
  return <MDXProvider components={shortcodes}>{children}</MDXProvider>
}
