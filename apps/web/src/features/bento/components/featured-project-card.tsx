import { ScreenshotPlaceholder } from '@/components/screenshot-placeholder'
import { getProjectPath, PROJECTS } from '@/data/projects'
import { BentoCardLabel, CardArrow, CardLink } from './bento-card'

const FEATURED_PROJECT = PROJECTS.find((project) => project.isFeatured)

export function FeaturedProjectCard() {
  if (!FEATURED_PROJECT) return null

  return (
    <>
      <BentoCardLabel title="Featured project">
        <CardArrow />
      </BentoCardLabel>
      <p className="text-heading font-medium">
        <CardLink to={getProjectPath(FEATURED_PROJECT.slug)}>{FEATURED_PROJECT.name}</CardLink>
      </p>
      <p className="mt-1 text-meta text-muted-foreground">{FEATURED_PROJECT.summary}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {[...FEATURED_PROJECT.roles, FEATURED_PROJECT.year].map((tag) => (
          <li key={tag} className="rounded-full border border-border-strong px-2.5 py-0.5 text-label text-muted-foreground">
            {tag}
          </li>
        ))}
      </ul>
      <div className="-mr-5 -mb-5 mt-6 flex-1 rounded-tl-xl border-t border-l border-border bg-muted p-4 pb-6 transition-[translate] duration-(--duration-base) group-hover:-translate-y-1.5">
        <ScreenshotPlaceholder />
      </div>
    </>
  )
}
