import { IconBrandGithub } from '@tabler/icons-react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { ScreenshotPlaceholder } from '@/components/screenshot-placeholder'
import { Button } from '@/components/ui/button'
import { PROFILE } from '@/data/profile'
import { getProjectPath, type Project } from '@/data/projects'

type ProjectDetailProps = {
  project: Project
  nextProject?: Project
}

function getProjectFacts(project: Project) {
  return [
    { label: 'Role', value: project.roles.join(', ') },
    { label: 'Timeline', value: project.period },
    { label: 'Type', value: project.type },
    ...(project.stack ? [{ label: 'Stack', value: project.stack.join(', ') }] : []),
  ]
}

export function ProjectDetail({ project, nextProject }: ProjectDetailProps) {
  const hasLinks = Boolean(project.liveUrl ?? project.sourceUrl)

  return (
    <article className="mx-auto max-w-4xl px-4 pt-10 pb-20 md:px-8 md:pt-14 md:pb-24">
      <title>{`${project.name} — ${PROFILE.shortName}`}</title>

      <Link
        to="/#work"
        className="group inline-flex items-center gap-1.5 rounded-full py-1 font-mono text-label text-subtle outline-none transition-colors duration-(--duration-fast) hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5 transition-[translate] duration-(--duration-base) group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <header className="mt-8 animate-rise-in">
        <p className="font-mono text-label text-subtle">
          {project.type} · {project.year}
        </p>
        <h1 className="mt-2 text-title font-medium">{project.name}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{project.summary}</p>

        {hasLinks && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.liveUrl && (
              <Button asChild size="lg" className="h-11 rounded-full px-5">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit site
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            )}
            {project.sourceUrl && (
              <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
                <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                  <IconBrandGithub aria-hidden="true" />
                  Source code
                </a>
              </Button>
            )}
          </div>
        )}
      </header>

      <dl className="mt-10 grid animate-rise-in grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-6 [animation-delay:80ms] md:grid-cols-4">
        {getProjectFacts(project).map(({ label, value }) => (
          <div key={label}>
            <dt className="font-mono text-label text-subtle">{label}</dt>
            <dd className="mt-1 text-meta">{value}</dd>
          </div>
        ))}
      </dl>

      <figure className="mt-10 animate-rise-in overflow-hidden rounded-lg border border-border bg-muted p-6 [animation-delay:160ms] md:p-12">
        <ScreenshotPlaceholder />
        <figcaption className="sr-only">Screenshot coming soon</figcaption>
      </figure>

      <section className="mt-12 grid animate-rise-in gap-3 [animation-delay:240ms] md:grid-cols-[10rem_1fr] md:gap-8">
        <h2 className="font-mono text-label text-subtle">Overview</h2>
        <p className="max-w-prose">{project.overview}</p>
      </section>

      {nextProject && (
        <Link
          to={getProjectPath(nextProject.slug)}
          className="group mt-16 flex items-center justify-between gap-4 rounded-lg border-t border-border pt-8 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span>
            <span className="block font-mono text-label text-subtle">Next project</span>
            <span className="mt-1 block text-heading font-medium">{nextProject.name}</span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="size-5 text-subtle transition-[translate,color] duration-(--duration-base) group-hover:translate-x-1 group-hover:text-foreground"
          />
        </Link>
      )}
    </article>
  )
}
