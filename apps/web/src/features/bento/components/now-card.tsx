import { PROFILE } from '@/data/profile'
import { BentoCardLabel } from './bento-card'

export function NowCard() {
  return (
    <>
      <BentoCardLabel title="Now">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
      </BentoCardLabel>
      <div className="mt-auto">
        <p className="text-heading font-medium">{PROFILE.currentFocus.title}</p>
        <p className="mt-1 text-meta text-muted-foreground">{PROFILE.currentFocus.detail}</p>
      </div>
    </>
  )
}
