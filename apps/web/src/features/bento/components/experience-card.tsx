import { EXPERIENCE } from '@/data/experience'
import { cn } from '@/lib/utils'
import { BentoCardLabel } from './bento-card'

export function ExperienceCard() {
  return (
    <>
      <BentoCardLabel title="Experience">
        <span>03</span>
      </BentoCardLabel>
      <ol className="flex flex-col gap-4">
        {EXPERIENCE.map((item) => (
          <li key={`${item.role}-${item.organization}`} className="flex gap-3">
            <span
              aria-hidden="true"
              className={cn('mt-1.5 size-2 shrink-0 rounded-full', item.isCurrent ? 'bg-foreground' : 'border border-subtle')}
            />
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-heading font-medium">{item.role}</p>
                <p className="shrink-0 font-mono text-label text-subtle">{item.period}</p>
              </div>
              <p className="text-meta text-muted-foreground">{item.organization}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-full border border-border-strong px-2.5 py-0.5 text-label text-muted-foreground">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}
