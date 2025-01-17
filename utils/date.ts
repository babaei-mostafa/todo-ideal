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
