import matter from 'gray-matter'
import readFile from './readFile.js'

const getPageAttrs = path => {
  const content = readFile(path)
  const { data } = matter(content)

  if (data) {
    const { title: pageTitle, navTitle, order } = data
    const title = navTitle || pageTitle

    return title ? { title, order } : undefined
  }
}

export default getPageAttrs;

