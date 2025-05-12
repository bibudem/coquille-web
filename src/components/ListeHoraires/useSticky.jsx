import { useInView } from 'react-intersection-observer'

const sentinelStyle = {
  width: '100%',
  height: 1,
  marginBottom: -1,
  visibility: 'hidden',
}

export function useSticky() {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
  })

  const sentinel = <div ref={ref} style={sentinelStyle} />

  return {
    sentinel,
    isSticky: !inView,
  }
}
