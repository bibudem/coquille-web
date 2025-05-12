import { readFileSync } from 'fs'
import { SITE_NAVIGATION_FILE_PATH } from '../constants.js'

console.log('SITE_NAVIGATION_FILE_PATH:', SITE_NAVIGATION_FILE_PATH)

let currentNavigation = null
let requestSync = null

const loadNavigation = async callback => {
  if (currentNavigation) {
    callback(currentNavigation)
    return
  }

  requestSync = readFileSync(SITE_NAVIGATION_FILE_PATH, 'utf8')
  const navigation = JSON.parse(requestSync)

  currentNavigation = navigation
  callback(navigation)

  return navigation
}

export default loadNavigation
