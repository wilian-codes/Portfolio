import type { SimpleIcon as SimpleIconData } from 'simple-icons'
import { cn } from '@/lib/utils'

type SimpleIconProps = {
  icon: SimpleIconData
  /** Name read by screen readers when it differs from the logo's title (e.g. "Java" for OpenJDK). */
  label?: string
  className?: string
}

/** Renders an official brand logo from the simple-icons set in the current text color. */
export function SimpleIcon({ icon, label, className }: SimpleIconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" aria-label={label ?? icon.title} className={cn('size-4 fill-current', className)}>
      <path d={icon.path} />
    </svg>
  )
}
