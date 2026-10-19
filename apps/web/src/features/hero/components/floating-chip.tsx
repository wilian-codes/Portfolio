import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ChipDepth = 'near' | 'mid' | 'far'

// Nearer chips drift further with the cursor, which reads as depth.
const PARALLAX_BY_DEPTH: Record<ChipDepth, string> = {
  near: 'translate-x-[calc(var(--parallax-x)*-24px)] translate-y-[calc(var(--parallax-y)*-24px)]',
  mid: 'translate-x-[calc(var(--parallax-x)*-17px)] translate-y-[calc(var(--parallax-y)*-17px)]',
  far: 'translate-x-[calc(var(--parallax-x)*-12px)] translate-y-[calc(var(--parallax-y)*-12px)]',
}

// Offsets the float animation so chips don't bob in sync.
const FLOAT_DELAY_BY_DEPTH: Record<ChipDepth, string> = {
  near: '',
  mid: '[animation-delay:-1.6s]',
  far: '[animation-delay:-3.2s]',
}

type FloatingChipProps = {
  depth: ChipDepth
  className?: string
  children: ReactNode
}

export function FloatingChip({ depth, className, children }: FloatingChipProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute transition-[translate] duration-(--duration-base)',
        PARALLAX_BY_DEPTH[depth],
        className,
      )}
    >
      <div
        className={cn(
          'animate-float rounded-xl border border-border-strong bg-card/70 px-3 py-2 text-meta shadow-lg shadow-black/20 backdrop-blur-md',
          FLOAT_DELAY_BY_DEPTH[depth],
        )}
      >
        {children}
      </div>
    </div>
  )
}
