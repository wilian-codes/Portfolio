import { ProjectDetail } from '@/features/projects/components/project-detail'
import { useProjectFromRoute } from '@/features/projects/hooks/use-project-from-route'
import { NotFoundPage } from './not-found'

export function ProjectPage() {
  const { project, nextProject } = useProjectFromRoute()
  if (!project) return <NotFoundPage />

  // The key gives each project a fresh page, so the reveal animation plays again on "Next project".
  return <ProjectDetail key={project.slug} project={project} nextProject={nextProject} />
}
