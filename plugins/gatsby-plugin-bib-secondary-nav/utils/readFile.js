const fs = require('fs')

const readFile = path => {
  let result

  try {
    result = fs.readFileSync(path, 'utf8')
  } catch (e) {
    console.log(e)
    result = ''
  }

  return result
}

module.exports = readFile;

