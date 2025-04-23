import { useEffect, useState } from 'react'
import { formatWeekHeader, getLastSundayDate } from '@/utils/dateTimeUtils'

export default function useHoraires() {
  const [currentWeek, setCurrentWeek] = useState(getLastSundayDate())
  const [currentWeekTitle, setCurrentWeekTitle] = useState(null)
  console.log('currentWeek:', currentWeek)
  useEffect(() => {
    setCurrentWeekTitle(formatWeekHeader(currentWeek))
  }, [currentWeek])

  return {
    currentWeek,
    setCurrentWeek,
    currentWeekTitle,
    setCurrentWeekTitle,
  }
}
