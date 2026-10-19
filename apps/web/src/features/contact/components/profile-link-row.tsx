import { ArrowUpRight } from 'lucide-react'
import type { SocialLink } from '@/data/social-links'

type ProfileLinkRowProps = {
  link: SocialLink
  className?: string
}

export function ProfileLinkRow({ link, className }: ProfileLinkRowProps) {
  const { label, href, display, Icon } = link

  return (
    <li className={className}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group -mx-3 flex items-center gap-4 rounded-lg px-3 py-5 outline-none transition-colors duration-(--duration-fast) hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Icon aria-hidden="true" strokeWidth={1.75} className="size-5 shrink-0 text-subtle" />
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-label text-subtle">{label}</span>
          <span className="mt-0.5 block truncate text-heading font-medium">{display}</span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-subtle transition-[rotate,color] duration-(--duration-base) group-hover:rotate-45 group-hover:text-foreground"
        />
      </a>
    </li>
  )
}
