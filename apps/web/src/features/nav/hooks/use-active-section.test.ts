import { describe, expect, it } from 'vitest'
import { getActiveSectionId } from './use-active-section'

const positions = [
  { id: 'home', top: -900 },
  { id: 'about', top: 120 },
  { id: 'work', top: 800 },
  { id: 'contact', top: 1600 },
]

describe('getActiveSectionId', () => {
  it('picks the last section whose top passed the active line', () => {
    expect(getActiveSectionId(positions, 300, false)).toBe('about')
  })

  it('returns null when no section reached the line', () => {
    expect(getActiveSectionId([{ id: 'home', top: 500 }], 300, false)).toBeNull()
  })

  it('selects the last section at the bottom of the page', () => {
    expect(getActiveSectionId(positions, 300, true)).toBe('contact')
  })

  it('returns null when the page has no sections', () => {
    expect(getActiveSectionId([], 300, true)).toBeNull()
  })
})
