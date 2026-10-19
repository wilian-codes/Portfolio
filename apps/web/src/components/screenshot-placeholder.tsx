import { cn } from '@/lib/utils'

type ScreenshotPlaceholderProps = {
  className?: string
}

/** A wireframe of an app screen, shown wherever a real project screenshot is still missing. */
export function ScreenshotPlaceholder({ className }: ScreenshotPlaceholderProps) {
  return (
    <svg
      viewBox="0 0 200 84"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
      className={cn('w-full text-foreground/25', className)}
    >
      <circle cx="5" cy="4" r="2.5" />
      <circle cx="13" cy="4" r="2.5" />
      <circle cx="21" cy="4" r="2.5" />
      <rect x="0" y="14" width="44" height="70" rx="5" />
      <rect x="6" y="22" width="30" height="4" rx="2" fill="currentColor" />
      <rect x="6" y="32" width="24" height="4" rx="2" />
      <rect x="6" y="42" width="28" height="4" rx="2" />
      <rect x="52" y="14" width="70" height="32" rx="5" />
      <rect x="128" y="14" width="72" height="32" rx="5" />
      <polyline points="58,38 72,28 86,32 100,22 116,26" className="text-foreground/60" />
      <rect x="52" y="54" width="148" height="30" rx="5" />
      <line x1="58" y1="64" x2="194" y2="64" />
      <line x1="58" y1="74" x2="194" y2="74" />
    </svg>
  )
}
