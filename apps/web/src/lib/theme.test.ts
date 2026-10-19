import { describe, expect, it } from 'vitest'
import { resolveTheme } from './theme'

describe('resolveTheme', () => {
  it('defaults to dark when nothing is saved', () => {
    expect(resolveTheme(null)).toBe('dark')
  })

  it('uses light only when light was saved', () => {
    expect(resolveTheme('light')).toBe('light')
  })

  it('falls back to dark for unknown values', () => {
    expect(resolveTheme('sepia')).toBe('dark')
  })
})
