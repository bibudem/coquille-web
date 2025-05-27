import getPathWithoutExtension from "./getPathWithoutExtension.js"

export default function getNormalPath(path) {
  const pathWithoutExtension = getPathWithoutExtension(path)
  const isIndex = pathWithoutExtension.endsWith("index")
  return `${pathWithoutExtension
    .replace(/\\/g, "/")
    .replace(/^content\/pages|\/index$/g, "")}${isIndex ? "/" : ""}`
}
