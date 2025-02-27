import getRecursiveMenu from './plugins/gatsby-plugin-bib-secondary-nav/utils/getRecursiveMenu.js'
import routes from './plugins/gatsby-plugin-bib-secondary-nav/_sample-data/allSiteNavigation.json' assert {type: 'json'}

const menu = getRecursiveMenu(routes)

console.log('menu:', menu)