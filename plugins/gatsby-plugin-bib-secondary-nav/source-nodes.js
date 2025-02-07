export const sourceNodes = (gatsbyApi) => {
  // Your arbitrary, serializable data
  const yourData = {
    hello: `world`,
  }

  const node = {
    ...yourData,
    // Required fields
    id: gatsbyApi.createNodeId(`some-string`),
    internal: {
      type: `MySiteNavigation`,
      contentDigest: gatsbyApi.createContentDigest(yourData)
    }
  }

  gatsbyApi.actions.createNode(node)
}

