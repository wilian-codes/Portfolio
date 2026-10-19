import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { getProjectPath, type Project } from '@/data/projects'
import { cn } from '@/lib/utils'

type ProjectRowProps = {
  project: Project
  index: number
  isRevealed: boolean
  revealDelay?: string
}

export function ProjectRow({ project, index, isRevealed, revealDelay }: ProjectRowProps) {
  return (
    <li className={cn(isRevealed ? 'animate-rise-in' : 'opacity-0', revealDelay)}>
      <Link
        to={getProjectPath(project.slug)}
        className="group -mx-3 grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 rounded-lg px-3 py-5 outline-none transition-colors duration-(--duration-fast) hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 md:grid-cols-[3rem_1fr_13rem_3.5rem_auto] md:gap-x-4 md:py-6"
      >
        <span className="font-mono text-label text-subtle">{String(index + 1).padStart(2, '0')}</span>
        <span className="min-w-0">
          <span className="block text-heading font-medium transition-[translate] duration-(--duration-base) group-hover:translate-x-1">
            {project.name}
          </span>
          <span className="mt-0.5 block text-meta text-muted-foreground">
            {project.summary}
            <span className="md:hidden"> · {project.year}</span>
          </span>
        </span>
        <span className="hidden text-meta text-muted-foreground md:block">{project.roles.join(' · ')}</span>
        <span className="hidden font-mono text-label text-subtle md:block">{project.year}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-subtle transition-[rotate,color] duration-(--duration-base) group-hover:rotate-45 group-hover:text-foreground"
        />
      </Link>
    </li>
  )
}
