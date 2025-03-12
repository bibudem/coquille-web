import { Children, createContext, useRef, useEffect, act } from 'react'
import { IconButton } from '@mui/material'
import { Button, Element, Link as RSLink, Events, animateScroll, scrollSpy, ScrollElement, ScrollLink } from 'react-scroll'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@/components/CustomIcons'

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

export function Carousel({ children, renderItem }) {
  const scrollRef = useRef(null)
  const pages = Children.toArray(children)

  useEffect(() => {
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register('begin', (to, element) => {
      console.log('begin', to, element)
    })

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register('end', (to, element) => {
      console.log('end', to, element)
    })

    // Updating scrollSpy when the component mounts.
    scrollSpy.update()

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove('begin')
      Events.scrollEvent.remove('end')
    }
  }, [])

  function goTo(index) {
    const pageId = getPageId(index)
    console.log('[goTo]', pageId)
    animateScroll.scrollTo(pageId, {
      duration: 1000,
      smooth: true,
      horizontal: true,
      containerId: 'scroll-container',
      isDynamic: true,
      activeClass: 'active',
    })
  }

  console.log('animateScroll', animateScroll)

  return (
    <div style={styles.root}>
      <ul id="scroll-container" style={styles.scroll} ref={scrollRef}>
        {pages.map((item, index) => (
          <Element key={index} name={getPageId(index)} id={getPageId(index)}>
            {item}
          </Element>
        ))}
      </ul>
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
          // <Link key={i} to={getPageId(i)} spy={true} smooth={true} horizontal={true} duration={1000}>
          //   {i + 1}
          // </Link>
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

function Item({ id, isSnapPoint, children, parentBindings, ...props }) {
  return (
    <li
      {...props}
      id={id}
      style={{
        ...styles.item,
        // ...(isSnapPoint ? styles.itemSnapPoint : {}),
      }}
      ref={(el) => (parentBindings.domNode = el)}
    >
      {children}
    </li>
  )
}

export const CarouselItem = ScrollElement(Item)

function Link({ ariaLabel, children, ...props }) {
  return (
    <IconButton {...props} color="primary" aria-label={ariaLabel} sx={{ fontSize: 50 }}>
      {children}
    </IconButton>
  )
}

export const CarouselLink = ScrollLink(Link)
