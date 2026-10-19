import { SimpleIcon } from '@/components/simple-icon'
import { TECH_STACK } from '@/data/tech-stack'
import { cn } from '@/lib/utils'

type LogoListProps = {
  isDuplicate?: boolean
}

function LogoList({ isDuplicate = false }: LogoListProps) {
  return (
    <ul
      aria-label={isDuplicate ? undefined : 'Tech stack'}
      aria-hidden={isDuplicate}
      className={cn(
        'flex min-w-full shrink-0 animate-marquee items-center justify-around gap-(--marquee-gap) group-hover:[animation-play-state:paused]',
        'motion-reduce:shrink motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-5',
        isDuplicate && 'motion-reduce:hidden',
      )}
    >
      {TECH_STACK.map((tech) => (
        <li key={tech.name} title={tech.name}>
          <SimpleIcon
            icon={tech.icon}
            label={tech.name}
            className="size-6 text-subtle transition-colors duration-(--duration-fast) hover:text-foreground md:size-7"
          />
        </li>
      ))}
    </ul>
  )
}

// Two identical lists side by side, each sliding left by its own width. When the first
// has moved out of view, the second sits exactly where the first began, so the loop never jumps.
export function TechMarquee() {
  return (
    <div className="border-t border-border py-6">
      <div className="group mx-auto flex max-w-6xl gap-(--marquee-gap) overflow-hidden [--marquee-gap:2.75rem] motion-safe:edge-fade md:[--marquee-gap:3.5rem]">
        <LogoList />
        <LogoList isDuplicate />
      </div>
    </div>
  )
}
