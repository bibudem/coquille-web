import { getDay } from '@/utils/dateTimeUtils'

const daysOfWeekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => `https://schema.org/${day}`)

function toISOHour(hour) {
  return `${hour}:00`
}

export function formatHour(h) {
  if (h === null) {
    throw new Error(`The hour parameter must be a string.`)
  }

  if (h === '23:59') {
    return '24:00'
  }

  if (h === '00:00') {
    return 'minuit'
  }

  h = `${parseFloat(h.replace(':', '.'))}`
  const f = h.split('.')[1]
  if (f && f.length == 1) {
    h += '0'
  }

  h = h.replace('.', 'h')
  if (h.indexOf('h') === -1) {
    h += 'h'
  }

  return h
}

function structuredHour(hour) {
  return {
    label: formatHour(hour),
    data: toISOHour(hour),
  }
}

function parseEvent({ debut1, debut2, fin1, fin2, sommaire }) {
  if (debut1 === '' && fin2 === '') {
    return {
      isClosed: true,
      sommaire,
    }
  }

  return {
    ...(debut1 === '00:00' && fin2 === '24:00' && { isOpen24: true }),
    sommaire,
    debut1: structuredHour(debut1),
    ...(debut2 && { debut2: structuredHour(debut2) }),
    ...(fin1 && { fin1: structuredHour(fin1) }),
    fin2: structuredHour(fin2),
  }
}

export function Hour({ event }) {
  const { date, debut1, debut2, fin1, fin2, sommaire, isClosed = false, isOpen24 = false } = parseEvent(event)
  const dayOfWeekDef = daysOfWeekMap[getDay(date)]

  return (
    <div itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
      <link itemProp="dayOfWeek" href={dayOfWeekDef} />
      {isClosed ? (
        <>{sommaire}</>
      ) : isOpen24 ? (
        <>
          <time itemProp="opens" content={debut1.data} hidden />
          <time itemProp="closes" content={fin2.data} hidden />
          {sommaire}
        </>
      ) : (
        <>
          <time itemProp="opens" content={debut1.data}>
            {debut1.label}
          </time>
          {'\xA0à\xA0'}
          {event.fin1 !== '' && event.debut2 !== '' && (
            <>
              <time itemProp="closes" content={fin1.data}>
                {fin1.label}
              </time>
              {'et'}
              <time itemProp="closes" content={debut2.data}>
                {debut2.label}
              </time>
              {'\xA0à\xA0'}
            </>
          )}
          <time itemProp="closes" content={fin2.data}>
            {fin2.label}
          </time>
        </>
      )}
    </div>
  )
}
