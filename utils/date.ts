import { monthsArray } from '@/components/todos/constants/daysArray'

export const isTody = (date: string) => {
  const now = new Date()
  const targetDate = new Date(date)

  return (
    now.getFullYear() === targetDate.getFullYear() &&
    now.getMonth() === targetDate.getMonth() &&
    now.getDate() === targetDate.getDate()
  )
}

export const isTomorrow = (date: string) => {
  const now = new Date()
  const targetDate = new Date(date)
  const tomorrow = new Date(now.getTime() + 86400000)
  return (
    tomorrow.getFullYear() === targetDate.getFullYear() &&
    tomorrow.getMonth() === targetDate.getMonth() &&
    tomorrow.getDate() === targetDate.getDate()
  )
}

// Helper to format time as HH:mm
export const formatTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

// Helper to format date as DD Month
export const formatDate = (date: Date) => {
  return `${date.getDate()} ${monthsArray[date.getMonth()]}`
}

export const formatTimeRange = (
  startDate: string | null,
  endDate: string | null
): string => {
  // Handle invalid start_date or end_date
  if (!startDate) return 'Start date is missing'
  if (!endDate) return 'End date is missing'

  const start = new Date(startDate)
  const end = new Date(endDate)

  // Check if the dates are valid
  if (isNaN(start.getTime())) return 'Invalid start date'
  if (isNaN(end.getTime())) return 'Invalid end date'

  const startTime = formatTime(start)
  const isSameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()

  const endTime = isSameDay
    ? formatTime(end) // If same day, only show time
    : `${formatDate(end)}, ${formatTime(end)}` // If different day, show date and time

  return `${startTime} - ${endTime}`
}
