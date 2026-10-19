import type { SimpleIcon as SimpleIconData } from 'simple-icons'
import { cn } from '@/lib/utils'

type SimpleIconProps = {
  icon: SimpleIconData
  className?: string
}

/** Renders an official brand logo from the simple-icons set in the current text color. */
export function SimpleIcon({ icon, className }: SimpleIconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" aria-label={icon.title} className={cn('size-4 fill-current', className)}>
      <path d={icon.path} />
    </svg>
  )
}
