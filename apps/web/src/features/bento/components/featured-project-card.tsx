import { PROJECTS } from '@/data/projects'
import { BentoCardLabel, CardArrow, CardLink } from './bento-card'

const FEATURED_PROJECT = PROJECTS.find((project) => project.isFeatured)

// A wireframe of a dashboard, shown until real screenshots arrive in step 6.
function ScreenshotPlaceholder() {
  return (
    <div className="-mr-5 -mb-5 mt-6 flex-1 rounded-tl-xl border-t border-l border-border bg-muted p-4 pb-6 text-foreground/25 transition-[translate] duration-(--duration-base) group-hover:-translate-y-1.5">
      <svg viewBox="0 0 200 84" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true" className="w-full">
        <circle cx="5" cy="4" r="2.5" />
        <circle cx="13" cy="4" r="2.5" />
        <circle cx="21" cy="4" r="2.5" />
        <rect x="0" y="14" width="44" height="70" rx="5" />
        <rect x="6" y="22" width="30" height="4" rx="2" fill="currentColor" />
        <rect x="6" y="32" width="24" height="4" rx="2" />
        <rect x="6" y="42" width="28" height="4" rx="2" />
        <rect x="52" y="14" width="70" height="32" rx="5" />
        <rect x="128" y="14" width="72" height="32" rx="5" />
        <polyline points="58,38 72,28 86,32 100,22 116,26" className="text-foreground/60" />
        <rect x="52" y="54" width="148" height="30" rx="5" />
        <line x1="58" y1="64" x2="194" y2="64" />
        <line x1="58" y1="74" x2="194" y2="74" />
      </svg>
    </div>
  )
}

export function FeaturedProjectCard() {
  if (!FEATURED_PROJECT) return null

  return (
    <>
      <BentoCardLabel title="Featured project">
        <CardArrow />
      </BentoCardLabel>
      <p className="text-heading font-medium">
        <CardLink to="/#work">{FEATURED_PROJECT.name}</CardLink>
      </p>
      <p className="mt-1 text-meta text-muted-foreground">{FEATURED_PROJECT.summary}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {[...FEATURED_PROJECT.roles, FEATURED_PROJECT.period].map((tag) => (
          <li key={tag} className="rounded-full border border-border-strong px-2.5 py-0.5 text-label text-muted-foreground">
            {tag}
          </li>
        ))}
      </ul>
      <ScreenshotPlaceholder />
    </>
  )
}
