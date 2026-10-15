function pad(value) {
  return String(value).padStart(2, '0')
}

function toIcsDate(dateString, timeString) {
  const [year, month, day] = dateString.split('-').map(Number)
  const [hour, minute] = (timeString || '00:00').split(':').map(Number)
  return `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`
}

export function buildIcsFile(shifts) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ShiftSync//Shift Export//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ]

  shifts.forEach((shift, index) => {
    lines.push(
      'BEGIN:VEVENT',
      `UID:shiftsync-${shift.id}-${index}@shiftsync.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toIcsDate(shift.date, shift.start)}`,
      `DTEND:${toIcsDate(shift.date, shift.end)}`,
      `SUMMARY:${shift.label}`,
      `DESCRIPTION:Exported by ShiftSync from your schedule screenshot.`,
      'END:VEVENT',
    )
  })

  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

export function downloadIcs(shifts) {
  const blob = new Blob([buildIcsFile(shifts)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'shiftsync-schedule.ics'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
