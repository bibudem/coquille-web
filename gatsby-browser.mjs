export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  // Always land at top on page navigation, except when a hash anchor is used.
  if (location.hash) return false
  return [0, 0]
}
