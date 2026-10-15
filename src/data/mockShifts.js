export const mockShifts = [
  {
    id: 'shift-1',
    dayLabel: 'Monday',
    weekLabel: 'Coming Week',
    date: '2026-10-19',
    start: '08:00',
    end: '16:00',
    label: 'Regular Shift',
    status: 'AI Verified',
  },
  {
    id: 'shift-2',
    dayLabel: 'Wednesday',
    weekLabel: 'Coming Week',
    date: '2026-10-21',
    start: '16:00',
    end: '00:00',
    label: 'Evening Shift',
    status: 'AI Verified',
  },
  {
    id: 'shift-3',
    dayLabel: 'Friday',
    weekLabel: 'Coming Week',
    date: '2026-10-23',
    start: '00:00',
    end: '08:00',
    label: 'Night Overtime',
    status: 'AI Verified',
  },
]

export const WEEKDAY_INDEX = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function weekdayFrom(dateString) {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return ''
  return WEEKDAY_INDEX[new Date(year, month - 1, day).getDay()]
}

export function durationInHours(start, end) {
  if (!start || !end) return null
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  let minutes = eh * 60 + em - (sh * 60 + sm)
  if (minutes <= 0) minutes += 24 * 60
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins ? `${hours}h ${mins}m` : `${hours}h`
}

export function formatTime(time) {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`
}
