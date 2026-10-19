import { useEffect, useState } from 'react'

const TIME_ZONE = 'Asia/Manila'
const REFRESH_MS = 30_000

const timeFormatter = new Intl.DateTimeFormat('en-PH', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: TIME_ZONE,
})

export function formatLocalTime(date: Date) {
  return timeFormatter.format(date)
}

/** Wilian's local time in the Philippines, refreshed every 30 seconds. */
export function useLocalTime() {
  const [time, setTime] = useState(() => formatLocalTime(new Date()))

  useEffect(() => {
    const interval = setInterval(() => setTime(formatLocalTime(new Date())), REFRESH_MS)
    return () => clearInterval(interval)
  }, [])

  return time
}
