import { MapPin } from 'lucide-react'
import { PROFILE } from '@/data/profile'
import { SOCIAL_LINKS } from '@/data/social-links'
import { useInView } from '@/hooks/use-in-view'
import { useLocalTime } from '@/hooks/use-local-time'
import { cn } from '@/lib/utils'
import { EmailRow } from './email-row'
import { ProfileLinkRow } from './profile-link-row'

const PROFILE_LINKS = SOCIAL_LINKS.filter((link) => link.isExternal)
const REVEAL_DELAYS = ['[animation-delay:80ms]', '[animation-delay:160ms]', '[animation-delay:240ms]']

export function ContactSection() {
  const { ref: contentRef, isInView } = useInView<HTMLDivElement>()
  const localTime = useLocalTime()
  const reveal = isInView ? 'animate-rise-in' : 'opacity-0'

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border">
      <div
        ref={contentRef}
        className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1fr_1.15fr] md:gap-16 md:px-8 md:py-28"
      >
        <div className={reveal}>
          <p className="font-mono text-label text-subtle">03 / Contact</p>
          <h2 className="mt-2 text-title font-medium">Let's work together.</h2>
          <p className="mt-3 max-w-sm text-muted-foreground">
            Have an internship or a project in mind? Email is the fastest way to reach me.
          </p>
          <ul className="mt-6 flex flex-col gap-2 font-mono text-label text-subtle">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
              {PROFILE.availability}
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-3.5" />
              {PROFILE.location} · <time>{localTime}</time>
            </li>
          </ul>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          <EmailRow className={cn(reveal, REVEAL_DELAYS[0])} />
          {PROFILE_LINKS.map((link, index) => (
            <ProfileLinkRow key={link.label} link={link} className={cn(reveal, REVEAL_DELAYS[index + 1])} />
          ))}
        </ul>
      </div>
    </section>
  )
}
