import { EDUCATION } from '@/data/education'
import { BentoCardLabel } from './bento-card'

export function EducationCard() {
  return (
    <>
      <BentoCardLabel title="Education">
        <span>04</span>
      </BentoCardLabel>
      <div className="mt-auto">
        <p className="text-heading font-medium">{EDUCATION.degree}</p>
        <p className="mt-1 text-meta text-muted-foreground">{EDUCATION.school}</p>
        <p className="mt-2 font-mono text-label text-subtle">{EDUCATION.period}</p>
      </div>
    </>
  )
}
