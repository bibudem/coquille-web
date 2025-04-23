import { addDays, format, isSunday, previousSunday } from 'date-fns'
import { frCA } from 'date-fns/locale'

export function getLastSundayDate(date = new Date()) {
  return isSunday(date) ? date : previousSunday(date)
}

export function getLastSundayISODate(date = new Date()) {
  date = isSunday(date) ? date : previousSunday(date)
  return format(date, 'yyyy-MM-dd')
}

export function getFormatedDaysOfWeek(date, pattern = 'E d') {
  const startDate = getLastSundayDate(date)
  return Array(7).fill(1).map((step, i) => format(addDays(startDate, step + i), pattern, { locale: frCA }))
}

export function formatWeekHeader(startDate, pattern = 'd MMMM y') {
  const endDate = addDays(startDate, 6)
  return `${format(startDate, pattern, { locale: frCA })} - ${format(endDate, pattern, { locale: frCA })}`
}