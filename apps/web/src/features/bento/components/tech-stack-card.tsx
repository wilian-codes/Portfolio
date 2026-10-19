import { SimpleIcon } from '@/components/simple-icon'
import { TECH_GROUPS, TECH_STACK } from '@/data/tech-stack'
import { BentoCardLabel } from './bento-card'

const STACK_BY_GROUP = TECH_GROUPS.map((group) => ({
  group,
  items: TECH_STACK.filter((tech) => tech.group === group),
}))

export function TechStackCard() {
  return (
    <>
      <BentoCardLabel title="Tech stack">
        <span>02</span>
      </BentoCardLabel>
      <div className="flex flex-col gap-4">
        {STACK_BY_GROUP.map(({ group, items }) => (
          <div key={group}>
            <p className="mb-2 font-mono text-label text-subtle">{group}</p>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-1.5">
              {items.map((tech) => (
                <li
                  key={tech.name}
                  className="flex items-center gap-2 rounded-md border border-border px-2.5 py-2 text-meta text-muted-foreground transition-colors duration-(--duration-fast) hover:border-border-strong hover:text-foreground"
                >
                  <span aria-hidden="true" className="shrink-0">
                    <SimpleIcon icon={tech.icon} />
                  </span>
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
