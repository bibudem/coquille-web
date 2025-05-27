const separator = "."

export default function getPathWithoutExtension(path) {
  return path
    .split(separator)
    .slice(0, -1)
    .join(separator)
}
