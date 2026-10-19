import { PROFILE } from '@/data/profile'
import { cn } from '@/lib/utils'
import { BentoCardLabel, CardArrow, CardLink } from './bento-card'

// A fixed, decorative pattern for now. Real contribution data needs either a
// GitHub token (which can't live in the browser) or a third-party service.
const HEATMAP_CELLS = 27
const HEATMAP_LEVELS = Array.from({ length: HEATMAP_CELLS }, (_, cell) => (cell * 7 + (cell % 5)) % 4)
const LEVEL_CLASSES = ['bg-foreground/6', 'bg-foreground/18', 'bg-foreground/40', 'bg-foreground/85']

export function GitHubCard() {
  return (
    <>
      <BentoCardLabel title="GitHub">
        <CardArrow />
      </BentoCardLabel>
      <div aria-hidden="true" className="mt-auto grid grid-cols-9 gap-1">
        {HEATMAP_LEVELS.map((level, cell) => (
          <span key={cell} className={cn('aspect-square rounded-[3px]', LEVEL_CLASSES[level])} />
        ))}
      </div>
      <p className="mt-3 text-meta text-muted-foreground">
        <CardLink to={PROFILE.githubUrl} isExternal>
          @{PROFILE.githubUsername}
        </CardLink>
      </p>
    </>
  )
}
