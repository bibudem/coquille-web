import { SITE_NAVIGATION_FILE_URL } from '../../../plugins/gatsby-plugin-bib-secondary-nav/constants.js'

let currentNavigation = null
let requestPromise = null

export default function fetchNavigation() {
  return new Promise((resolve, reject) => {
    if (currentNavigation) {
      resolve(currentNavigation)
      return
    }

    if (requestPromise) {
      requestPromise = requestPromise.then(navigation => navigation)

      return
    }

    if (typeof window !== "undefined") {
      requestPromise = window
        .fetch(SITE_NAVIGATION_FILE_URL)
        .then(data => data.json())
        .then(navigation => {
          currentNavigation = navigation

          resolve(navigation)
          return
        })
        .catch(error => reject(error))
    }
  })
}
