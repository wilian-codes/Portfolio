import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { useSpotlight } from '../hooks/use-spotlight'

type BentoCardProps = {
  children: ReactNode
  isRevealed: boolean
  isInverted?: boolean
  className?: string
}

/** The shared card shell: border, cursor spotlight, hover lift, and the rise-in reveal. */
export function BentoCard({ children, isRevealed, isInverted = false, className }: BentoCardProps) {
  const spotlightRef = useSpotlight<HTMLDivElement>()

  return (
    <div
      ref={spotlightRef}
      className={cn(
        'group spotlight relative flex flex-col overflow-hidden rounded-lg border p-5 transition-[translate,border-color] duration-(--duration-base) hover:-translate-y-0.75 has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
        isInverted
          ? 'border-foreground bg-foreground text-background [--spotlight:var(--spotlight-inverted)]'
          : 'border-border bg-card hover:border-border-strong',
        isRevealed ? 'animate-rise-in' : 'opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

type BentoCardLabelProps = {
  title: string
  children?: ReactNode
}

/** The small mono label row at the top of every card, with an index, arrow, or dot on the right. */
export function BentoCardLabel({ title, children }: BentoCardLabelProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 font-mono text-label text-subtle">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

type CardArrowProps = {
  className?: string
}

export function CardArrow({ className }: CardArrowProps) {
  return (
    <ArrowUpRight
      aria-hidden="true"
      className={cn(
        'size-4 transition-[rotate,color] duration-(--duration-base) group-hover:rotate-45 group-hover:text-foreground',
        className,
      )}
    />
  )
}

type CardLinkProps = {
  to: string
  isExternal?: boolean
  children: ReactNode
}

/**
 * A link whose invisible ::after layer stretches over the whole card, so the
 * entire card is clickable while screen readers hear only the link text.
 */
export function CardLink({ to, isExternal = false, children }: CardLinkProps) {
  const className = 'outline-none after:absolute after:inset-0'

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
