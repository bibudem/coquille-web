const separator = "."

const getPathWithoutExtension = path =>
  path
    .split(separator)
    .slice(0, -1)
    .join(separator)

export default getPathWithoutExtension
