import type { Project } from '@/data/projects'

export function findProjectBySlug(projects: readonly Project[], slug: string | undefined) {
  return projects.find((project) => project.slug === slug)
}

// The project after this one. It wraps around to the first, so every page has a "Next project" link.
export function getNextProject(projects: readonly Project[], slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1 || projects.length < 2) return undefined
  return projects[(index + 1) % projects.length]
}
