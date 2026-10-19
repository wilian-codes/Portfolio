import { useInView } from '@/hooks/use-in-view'
import { BentoCard } from './bento-card'
import { ContactCard } from './contact-card'
import { EducationCard } from './education-card'
import { ExperienceCard } from './experience-card'
import { FeaturedProjectCard } from './featured-project-card'
import { GitHubCard } from './github-card'
import { NowCard } from './now-card'
import { TechStackCard } from './tech-stack-card'

// Order, size, and reveal delay of each card. Two columns on phones, four from `md` up.
const BENTO_CARDS = [
  { id: 'featured', Content: FeaturedProjectCard, layout: 'col-span-2 md:row-span-2', delay: '[animation-delay:0ms]', isInverted: false },
  { id: 'stack', Content: TechStackCard, layout: 'col-span-2 md:row-span-2', delay: '[animation-delay:80ms]', isInverted: false },
  { id: 'experience', Content: ExperienceCard, layout: 'col-span-2', delay: '[animation-delay:160ms]', isInverted: false },
  { id: 'education', Content: EducationCard, layout: 'col-span-1', delay: '[animation-delay:240ms]', isInverted: false },
  { id: 'github', Content: GitHubCard, layout: 'col-span-1', delay: '[animation-delay:320ms]', isInverted: false },
  { id: 'now', Content: NowCard, layout: 'col-span-2', delay: '[animation-delay:400ms]', isInverted: false },
  { id: 'contact', Content: ContactCard, layout: 'col-span-2', delay: '[animation-delay:480ms]', isInverted: true },
]

export function BentoSection() {
  const { ref: gridRef, isInView } = useInView<HTMLDivElement>()

  return (
    <section id="about" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-label text-subtle">01 / Overview</p>
            <h2 className="mt-2 text-title font-medium">At a glance</h2>
          </div>
          <p className="hidden text-meta text-subtle pointer-fine:block">Hover the cards</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 gap-2.5 md:auto-rows-[minmax(8.5rem,auto)] md:grid-cols-4">
          {BENTO_CARDS.map(({ id, Content, layout, delay, isInverted }) => (
            <BentoCard key={id} isRevealed={isInView} isInverted={isInverted} className={`${layout} ${delay}`}>
              <Content />
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
