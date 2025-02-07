import fs from 'node:fs'

const readFile = path => {
  let result

  try {
    result = fs.readFileSync(path, 'utf8')
  } catch (error) {
    console.log('Error reading file `%s` from disk.', path, error)
    console.log(error)
    result = ''
  }

  return result
}

export default readFile

