export function parseSlideNumber(value, total) {
  if (!/^\d+$/.test(String(value).trim())) return null
  const page = Number(value)
  return Number.isSafeInteger(page) && page >= 1 && page <= total ? page : null
}

export function formatCountdown(duration, passed) {
  const remaining = Math.ceil(duration - passed)
  const seconds = Math.abs(remaining)
  return `${remaining < 0 ? '+' : ''}${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}
