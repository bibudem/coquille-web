import matter from 'gray-matter'
import readFile from './readFile.js'

const getPageAttrs = path => {
  const content = readFile(path)
  const { data } = matter(content)

  if (data) {
    const { title: pageTitle, secondaryNav = {} } = data
    const { hidden = false, order = null, isRoot, title: navTitle } = secondaryNav
    const title = navTitle || pageTitle

    return title ? { title, order, hidden, isRoot } : undefined
  }
}

export default getPageAttrs;

