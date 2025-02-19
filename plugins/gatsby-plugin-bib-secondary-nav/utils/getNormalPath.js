import getPathWithoutExtension from "./getPathWithoutExtension.js"

const getNormalPath = path => {
  const pathWithoutExtension = getPathWithoutExtension(path)
  // console.log("pathWithoutExtension:", pathWithoutExtension)
  const isIndex = pathWithoutExtension.endsWith("index")
  return `${pathWithoutExtension
    .replace(/\\/g, "/")
    .replace(/^content|\/index$/g, "")}${isIndex ? "/" : ""}`
}

export default getNormalPath
