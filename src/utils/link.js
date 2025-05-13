export const internalHostnames = [
  'bib.umontreal.ca',
  /\.bib\.umontreal\.ca$/,
  'bib-pp.umontreal.ca',
  /\.bib-pp\.umontreal\.ca$/,
  'bib-prod.umontreal.ca',
  /\.bib-prod\.umontreal\.ca$/
]

function testHostname(hostname) {
  return internalHostnames.some((internalHostname) => {
    if (typeof internalHostname === 'string') {
      return hostname === internalHostname
    }
    return internalHostname.test(hostname)
  })
}

export function isInternalLink(href) {
  console.log('arguments:', arguments)
  if (typeof href !== 'string' && !(href instanceof URL)) {
    throw new Error(`The href argument must be a string or a URL object. Got ${typeof href}`)
  }

  try {
    const url = new URL(href, 'https://bib.umontreal.ca')
    return testHostname(url.hostname)
  } catch (error) {
    throw new Error('Could not parse url:', href)
  }
}