const sortLinks = links =>
  Array.from(links).sort(({ path: path1 }, { path: path2 }) => {
    const { length: length1 } = path1.split("/")
    const { length: length2 } = path2.split("/")

    return length1 - length2
  })

export default sortLinks
