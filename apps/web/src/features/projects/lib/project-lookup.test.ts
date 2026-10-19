import { describe, expect, it } from 'vitest'
import type { Project } from '@/data/projects'
import { findProjectBySlug, getNextProject } from './project-lookup'

function makeProject(slug: string): Project {
  return {
    slug,
    name: slug,
    type: 'Web app',
    summary: '',
    overview: '',
    year: '2026',
    period: '2026',
    roles: [],
    isFeatured: false,
  }
}

const PROJECTS = [makeProject('a'), makeProject('b'), makeProject('c')]

describe('findProjectBySlug', () => {
  it('finds the project with the matching slug', () => {
    expect(findProjectBySlug(PROJECTS, 'b')?.slug).toBe('b')
  })

  it('returns undefined for an unknown or missing slug', () => {
    expect(findProjectBySlug(PROJECTS, 'zzz')).toBeUndefined()
    expect(findProjectBySlug(PROJECTS, undefined)).toBeUndefined()
  })
})

describe('getNextProject', () => {
  it('returns the following project', () => {
    expect(getNextProject(PROJECTS, 'a')?.slug).toBe('b')
  })

  it('wraps from the last project to the first', () => {
    expect(getNextProject(PROJECTS, 'c')?.slug).toBe('a')
  })

  it('returns undefined for an unknown slug or a single project', () => {
    expect(getNextProject(PROJECTS, 'zzz')).toBeUndefined()
    expect(getNextProject([makeProject('solo')], 'solo')).toBeUndefined()
  })
})
