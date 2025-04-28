import { addDays, addWeeks, format, isSunday, previousSunday } from 'date-fns'
import { frCA } from 'date-fns/locale'

function toDate(date) {
  if (typeof date === 'string') {
    return new Date(`${date}T00:00:00`)
  }

  if (date.constructor.name === 'Week') {
    date = date.toDate()
  }

  return new Date(`${date.toISOString().split('T')[0]}T00:00:00`)
}

export function getFirstDayOfWeekDate(date = new Date()) {
  date = toDate(date)

  return isSunday(date) ? date : previousSunday(date)
}

export function getLastSundayISODate(date = new Date()) {
  date = getFirstDayOfWeekDate(date)
  return format(date, 'yyyy-MM-dd')
}

export function formatDaysOfWeekHeader(date, pattern = 'E d') {
  date = toDate(date)
  const startDate = getFirstDayOfWeekDate(date)

  return Array(7).fill(1).map((_, i) => format(addDays(startDate, i), pattern, { locale: frCA }))
}

export function formatWeekHeader(startDate, pattern = 'd MMMM y') {
  startDate = getFirstDayOfWeekDate(toDate(startDate))
  const endDate = addDays(startDate, 6)
  return `${format(startDate, pattern, { locale: frCA })} - ${format(endDate, pattern, { locale: frCA })}`
}

export function addWeekISODate(date, n) {
  date = toDate(date)

  if (Number.isNaN(n)) {
    throw new Error(`'to' must be a number.`)
  }

  return format(addWeeks(date, n), 'yyy-MM-dd')
}