import { useEffect, useMemo, useState } from 'react'

const FIGMA_START_AT = new Date('2025-09-14T00:00:00+03:00').getTime()
const FIGMA_REFERENCE_REMAINING = (((5 * 24 + 23) * 60 + 14) * 60 + 44) * 1000

function resolveTarget() {
  const configured = import.meta.env.VITE_CONTEST_START_AT?.trim()

  if (configured) {
    const parsed = new Date(configured).getTime()
    if (!Number.isNaN(parsed)) return parsed
  }

  // The supplied design is an archived 2025 campaign. When that date is already
  // in the past, keep the Figma countdown demonstrably alive for layout review.
  // Production can set VITE_CONTEST_START_AT to the actual campaign start date.
  if (FIGMA_START_AT > Date.now()) return FIGMA_START_AT
  return Date.now() + FIGMA_REFERENCE_REMAINING
}

function getRemaining(target: number) {
  const delta = Math.max(target - Date.now(), 0)
  const days = Math.floor(delta / 86_400_000)
  const hours = Math.floor((delta / 3_600_000) % 24)
  const minutes = Math.floor((delta / 60_000) % 60)
  const seconds = Math.floor((delta / 1000) % 60)
  return { delta, days, hours, minutes, seconds }
}

export function Countdown() {
  const [target] = useState(resolveTarget)
  const [remaining, setRemaining] = useState(() => getRemaining(target))

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => window.clearInterval(timer)
  }, [target])

  const label = useMemo(() => {
    if (remaining.delta === 0) return 'Конкурс завершён'
    return `До начала ${remaining.days} дней ${String(remaining.hours).padStart(2, '0')} часа ${String(remaining.minutes).padStart(2, '0')} минут ${String(remaining.seconds).padStart(2, '0')} секунд`
  }, [remaining])

  return (
    <div className="countdown" aria-live="polite">
      <span>{label}</span>
      <span className="countdown-line" aria-hidden="true" />
    </div>
  )
}
