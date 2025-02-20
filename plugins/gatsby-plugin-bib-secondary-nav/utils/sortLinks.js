export default function sortLinks(links) {
  return Array
    .from(links)
    .sort(({ pathname: pathname1 }, { pathname: pathname2 }) => {
      const pathnameArray1 = pathname1.split("/")
      const pathnameArray2 = pathname2.split("/")
      const length1 = pathnameArray1.length
      const length2 = pathnameArray2.length
      const lengthDiff = length1 - length2
      const lastPartLengthDiff = pathnameArray1.at(-1).length - pathnameArray2.at(-1).length

      return lengthDiff === 0 ? lastPartLengthDiff : lengthDiff
    })
}