import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { Mail } from 'lucide-react'
import { PROFILE } from '@/data/profile'
import { cn } from '@/lib/utils'

// Business rule: public contact info is email, GitHub, and LinkedIn only.
const SOCIAL_LINKS = [
  { label: 'Email', href: `mailto:${PROFILE.email}`, Icon: Mail, isExternal: false },
  { label: 'GitHub', href: PROFILE.githubUrl, Icon: IconBrandGithub, isExternal: true },
  { label: 'LinkedIn', href: PROFILE.linkedinUrl, Icon: IconBrandLinkedin, isExternal: true },
]

type SocialLinksProps = {
  className?: string
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {SOCIAL_LINKS.map(({ label, href, Icon, isExternal }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            className="grid size-9 place-items-center rounded-full text-subtle outline-none transition-colors duration-(--duration-fast) hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
