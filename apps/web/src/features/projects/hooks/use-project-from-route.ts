import { useParams } from 'react-router'
import { PROJECTS } from '@/data/projects'
import { findProjectBySlug, getNextProject } from '../lib/project-lookup'

/** Reads :slug from the URL and returns that project and the one after it. */
export function useProjectFromRoute() {
  const { slug } = useParams()
  const project = findProjectBySlug(PROJECTS, slug)
  const nextProject = project ? getNextProject(PROJECTS, project.slug) : undefined
  return { project, nextProject }
}
