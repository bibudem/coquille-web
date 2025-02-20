export function recursiveMenu(routes) {
  const createItemsFromPathnames = routes
    .map(route => {
      let paths = route.pathname.split("/").filter(s => s)
      return {
        ...route,
        id: paths.length > 1 ? paths[paths.length - 1] : "",
        parent: paths.length > 1 ? paths[paths.length - 2] : null,
        paths: paths,
        menu: null
      }
    })
    .reduce((items, item, index) => {
      items.push(item)

      if (items[index].id && items[index].id !== item.parent) {
        const { paths } = item
        items.push({
          navTitle: item.parent && item.parent.replace(/-/g, " "),
          id: item.parent,
          pathname: null,
          paths: null,
          parent: paths.length > 2 ? paths[paths.length - 3] : null
        })
      }

      return items
    }, [])
    .filter(route => route.navTitle)

  function createRecursiveMenu(array, parent) {
    let result = []

    array
      .filter(route => route.parent === parent)
      .forEach(route => {
        route.menu = createRecursiveMenu(array, route.id)
        return result.push(route)
      })

    return result
  }

  return createRecursiveMenu(createItemsFromPathnames, null)
}
