import list from 'postcss/lib/list'
import { createContext, use, useContext } from 'react'
import { useSnapCarousel } from 'react-snap-carousel'

const styles = {
  root: {},
  scroll: {
    position: 'relative',
    display: 'flex',
    gap: 10,
    listStyle: 'none',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    // paddingBottom: '17px',
    // boxSizing: 'content-box',
    scrollSnapType: 'x mandatory',
    margin: 0,
    scrollbarWidth: 0,
    scrollPadding: '0',
    padding: '0',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  item: {
    // width: '250px',
    // height: '250px',
    flexShrink: 0,
  },
  itemSnapPoint: {
    scrollSnapAlign: 'start',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPrevButton: {},
  nextPrevButtonDisabled: { opacity: 0.3 },
  pagination: {
    display: 'flex',
  },
  paginationButton: {
    margin: '10px',
  },
  paginationButtonActive: { opacity: 0.3 },
  pageIndicator: {
    display: 'flex',
    justifyContent: 'center',
  },
}

const gotoOptions = {
  behavior: 'smooth',
}

// const CarouselContext = createContext(useSnapCarousel({ axis: 'x' }))

export function Carousel({ items, renderItem }) {
  const { scrollRef, pages, activePageIndex, hasPrevPage, hasNextPage, prev, next, goTo, snapPointIndexes } = useSnapCarousel({ axis: 'x' })
  // const { scrollRef, pages, activePageIndex, hasPrevPage, hasNextPage, prev, next, goTo, snapPointIndexes } = useContext(CarouselContext)

  return (
    <div style={styles.root}>
      <ul style={styles.scroll} ref={scrollRef}>
        {items.map((item, i) =>
          renderItem({
            item,
            isSnapPoint: snapPointIndexes.has(i),
          })
        )}
      </ul>
      <div style={styles.controls} aria-hidden>
        <button
          style={{
            ...styles.nextPrevButton,
            ...(!hasPrevPage ? styles.nextPrevButtonDisabled : {}),
          }}
          onClick={() => prev(gotoOptions)}
          disabled={!hasPrevPage}
        >
          Prev
        </button>
        {pages.map((_, i) => (
          <button
            key={i}
            style={{
              ...styles.paginationButton,
              ...(activePageIndex === i ? styles.paginationButtonActive : {}),
            }}
            onClick={() => goTo(i, gotoOptions)}
          >
            {i + 1}
          </button>
        ))}
        <button
          style={{
            ...styles.nextPrevButton,
            ...(!hasNextPage ? styles.nextPrevButtonDisabled : {}),
          }}
          onClick={() => next(gotoOptions)}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
      <div style={styles.pageIndicator}>
        {activePageIndex + 1} / {pages.length}
      </div>
    </div>
  )
}

export function CarouselItem({ isSnapPoint, children }) {
  return (
    <li
      style={{
        ...styles.item,
        ...(isSnapPoint ? styles.itemSnapPoint : {}),
      }}
    >
      {children}
    </li>
  )
}

export function Next() {
  const { next } = useContext(CarouselContext)
  return <button onClick={() => next()}>Next</button>
}
