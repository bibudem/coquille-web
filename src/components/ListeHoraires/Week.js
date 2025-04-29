import { addDays, addWeeks, format } from 'date-fns'
import { frCA } from 'date-fns/locale'
import { getFirstDayOfWeekDate } from '../../utils/dateTimeUtils.js'

export default class Week {

  constructor(date = new Date()) {
    this._date = getFirstDayOfWeekDate(date)
  }

  toString() {
    return format(this._date, 'yyyy-MM-dd')
  }

  toDate() {
    return new Date(`${this._date.toISOString().split('T')[0]}T00:00:00`)
  }

  _go(step) {
    return new Week(addWeeks(this.toDate(), step))
  }

  nextWeek() {
    return this._go(1)
  }

  previousWeek() {
    return this._go(-1)
  }

  formatWeekHeader(currentBreakpoint) {
    const startDate = this.toDate()
    const endDate = addDays(startDate, 6)
    const pattern = currentBreakpoint.key === 'xs' ? 'd MMM y' : 'd MMMM y'
    return `${format(startDate, pattern, { locale: frCA })} - ${format(endDate, pattern, { locale: frCA })}`
  }

  formatDaysOfWeekHeader(pattern = 'E d') {
    const startDate = this.toDate()

    return Array(7).fill(1).map((_, i) => {
      const day = format(addDays(startDate, i), pattern, { locale: frCA })
      return day.charAt(0).toUpperCase() + day.slice(1)
    })
  }
}