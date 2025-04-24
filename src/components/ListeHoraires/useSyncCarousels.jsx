import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { formatWeekHeader, getFirstDayOfWeekDate } from '@/utils/dateTimeUtils.js'

const options = {}

export default function useCarousel(emblaApi) {
  const [ref, api] = useEmblaCarousel(options)
  const [currentWeek, setCurrentWeek] = useState(getFirstDayOfWeekDate())
  const [navCurrentWeekTitle, setNavCurrentWeekTitle] = useState(null)

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  useEffect(() => {
    setNavCurrentWeekTitle(formatWeekHeader(currentWeek))
  }, [])

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) {
      return
    }
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) {
      return
    }
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    ref,
    api,
    navCurrentWeekTitle,
    prevBtnProps: () => ({
      disabled: prevBtnDisabled,
      onClick: onPrevButtonClick,
    }),
    nextBtnProps: () => ({
      disabled: nextBtnDisabled,
      onClick: onNextButtonClick,
    }),
  }
}
