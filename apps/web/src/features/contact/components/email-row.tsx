import { ArrowUpRight, Check, Copy, Mail, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PROFILE } from '@/data/profile'
import { cn } from '@/lib/utils'
import { type CopyStatus, useCopyToClipboard } from '../hooks/use-copy-to-clipboard'

const COPY_LABELS: Record<CopyStatus, string> = { idle: 'Copy', copied: 'Copied', failed: 'Copy failed' }
const COPY_ICONS = { idle: Copy, copied: Check, failed: X }
// Read out by screen readers, since a changed button label isn't announced on its own.
const COPY_ANNOUNCEMENTS: Record<CopyStatus, string> = {
  idle: '',
  copied: 'Email address copied',
  failed: 'Could not copy the email address',
}

type EmailRowProps = {
  className?: string
}

export function EmailRow({ className }: EmailRowProps) {
  const { status, copy } = useCopyToClipboard()
  const StatusIcon = COPY_ICONS[status]

  return (
    <li
      className={cn(
        'group relative -mx-3 flex items-center gap-4 rounded-lg px-3 py-5 transition-colors duration-(--duration-fast) hover:bg-accent has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/50',
        className,
      )}
    >
      <Mail aria-hidden="true" strokeWidth={1.75} className="size-5 shrink-0 text-subtle" />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-label text-subtle">Email</p>
        {/* The ::after layer makes the whole row open the mail app; the copy button sits above it. */}
        <a
          href={`mailto:${PROFILE.email}`}
          className="mt-0.5 block truncate text-heading font-medium outline-none after:absolute after:inset-0"
        >
          {PROFILE.email}
        </a>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => copy(PROFILE.email)} className="relative z-10 rounded-full">
        <StatusIcon aria-hidden="true" />
        {COPY_LABELS[status]}
      </Button>
      <span aria-live="polite" className="sr-only">
        {COPY_ANNOUNCEMENTS[status]}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="hidden size-4 shrink-0 text-subtle transition-[rotate,color] duration-(--duration-base) group-hover:rotate-45 group-hover:text-foreground sm:block"
      />
    </li>
  )
}
