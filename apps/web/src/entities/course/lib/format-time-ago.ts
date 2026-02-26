const MINUTE_MS = 60_000
const HOUR_MS = 3_600_000
const DAY_MS = 86_400_000

export const formatTimeAgo = (date: Date | string): string => {
  const diffMs = Date.now() - new Date(date).getTime()

  const minutes = Math.floor(diffMs / MINUTE_MS)
  const hours = Math.floor(diffMs / HOUR_MS)
  const days = Math.floor(diffMs / DAY_MS)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (minutes < 1) return 'Только что'
  if (minutes < 60) return `${minutes} мин. назад`
  if (hours < 24) return `${hours} ч. назад`
  if (days < 7) return `${days} дн. назад`
  if (weeks < 5) return `${weeks} нед. назад`
  if (months < 13) return `${months} мес. назад`
  return 'Более года назад'
}
