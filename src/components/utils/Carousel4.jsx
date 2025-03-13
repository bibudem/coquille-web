import { Carousel, CarouselViewport, CarouselSlider, CarouselCard, CarouselNavContainer } from '@fluentui/react-components'
import { Children, useEffect } from 'react'

function getPageId(index) {
  return `page-${index}`
}

const styles = {
  root: {},
  scroll: {
    position: 'relative',
    display: 'flex',
    gap: 10,
    listStyle: 'none',
    overflowX: 'scroll',
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
    scrollSnapAlign: 'start',
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

export default function Carousel4({ children }) {
  const pages = Children.toArray(children)

  function getAnnouncement(index, totalSlides, slideGroupList) {
    return `Diapositive ${index + 1} de ${totalSlides}`
  }

  return (
    <div style={styles.root}>
      <Carousel as="div" align="start" groupSize={1} announcement={getAnnouncement} style={{ outline: '1px dotted orange' }}>
        <CarouselViewport>
          <CarouselSlider style={{ gap: '10px' }}>
            {pages.map((item, index) => (
              <CarouselCard key={index} id={getPageId(index)} autoSize style={{ outline: '2px dashed red', outlineOffset: '-2px' }} aria-label={`${index + 1} de ${pages.length}`}>
                {item}
              </CarouselCard>
            ))}
          </CarouselSlider>
        </CarouselViewport>
      </Carousel>
      <CarouselNavContainer layout="inline"></CarouselNavContainer>
      <div style={styles.controls} aria-hidden>
        <button
          style={{
            ...styles.nextPrevButton,
            // ...(!hasPrevPage ? styles.nextPrevButtonDisabled : {}),
          }}
          // onClick={() => prev(gotoOptions)}
          // disabled={!hasPrevPage}
        >
          Prev
        </button>
        {pages.map((_, i) => (
          <a key={i} onClick={() => goTo(i)}>
            {i + 1}
          </a>
        ))}
        <button
          style={{
            ...styles.nextPrevButton,
            // ...(!hasNextPage ? styles.nextPrevButtonDisabled : {}),
          }}
          // onClick={() => next(gotoOptions)}
          // disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
      {/* <div style={styles.pageIndicator}>
        {activePageIndex + 1} / {pages.length}
      </div> */}
    </div>
  )
}
