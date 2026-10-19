import { describe, expect, it } from 'vitest'
import { formatLocalTime } from './use-local-time'

describe('formatLocalTime', () => {
  it('shows Philippine time (UTC+8), not the visitor’s time', () => {
    expect(formatLocalTime(new Date('2026-01-01T00:00:00Z'))).toMatch(/08:00/)
  })

  it('uses a 12-hour clock with AM/PM', () => {
    expect(formatLocalTime(new Date('2026-01-01T06:30:00Z'))).toMatch(/02:30\s?PM/i)
  })
})
