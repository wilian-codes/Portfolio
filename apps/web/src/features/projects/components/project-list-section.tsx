import { PROJECTS } from '@/data/projects'
import { useInView } from '@/hooks/use-in-view'
import { ProjectRow } from './project-row'

// Static class names so Tailwind can find them; rows past the last delay simply don't wait.
const REVEAL_DELAYS = ['[animation-delay:0ms]', '[animation-delay:80ms]', '[animation-delay:160ms]', '[animation-delay:240ms]', '[animation-delay:320ms]', '[animation-delay:400ms]']

export function ProjectListSection() {
  const { ref: listRef, isInView } = useInView<HTMLOListElement>()

  return (
    <section id="work" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-label text-subtle">02 / Work</p>
            <h2 className="mt-2 text-title font-medium">Selected projects</h2>
          </div>
          <p className="font-mono text-label text-subtle">{PROJECTS.length} projects</p>
        </div>

        <ol ref={listRef} className="divide-y divide-border border-y border-border">
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={index}
              isRevealed={isInView}
              revealDelay={REVEAL_DELAYS[index]}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
