import { readFileSync } from 'fs'

export default function readFile(path) {
  let result

  try {
    result = readFileSync(path, 'utf8')
  } catch (error) {
    console.log('Error reading file `%s` from disk.', path, error)
    console.log(error)
    result = ''
  }

  return result
}

