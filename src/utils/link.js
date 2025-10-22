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
  if (typeof href !== 'string' && !(href instanceof URL)) {
    throw new Error(`The href argument must be a string or a URL object. Got ${typeof href}`)
  }

  try {
    if (typeof href === 'string') {
      href = href.trim()
    }

    // TODO: handle ws:, wss: and bloc: schemes.
    const url = new URL(href, 'https://bib.umontreal.ca')

    if (url.origin === 'null') {
      // This is not a valid scheme (e.g., mailto:, tel:, etc.)
      // @see: https://developer.mozilla.org/en-US/docs/Web/API/URL/origin
      return false
    }

    return testHostname(url.hostname)
  } catch (error) {
    throw new Error('Could not parse url:', href)
  }
}