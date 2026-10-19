import { ArrowRight } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { PROFILE } from '@/data/profile'
import { cn } from '@/lib/utils'

// Two-tone headline. Each word blurs in a moment after the one before it.
const HEADLINE_WORDS = [
  { text: 'Wilian', isMuted: false, isLineEnd: false, delay: '[animation-delay:200ms]' },
  { text: 'Nunag.', isMuted: false, isLineEnd: true, delay: '[animation-delay:290ms]' },
  { text: 'Web', isMuted: true, isLineEnd: false, delay: '[animation-delay:380ms]' },
  { text: 'and', isMuted: true, isLineEnd: false, delay: '[animation-delay:470ms]' },
  { text: 'mobile.', isMuted: true, isLineEnd: false, delay: '[animation-delay:560ms]' },
]

export function HeroIntro() {
  return (
    <div className="flex flex-col items-start">
      <p className="flex items-center gap-2 font-mono text-label text-subtle">
        <span aria-hidden="true" className="h-px w-5 bg-subtle" />
        {PROFILE.role}
      </p>

      <h1 className="mt-4 text-display font-medium">
        {HEADLINE_WORDS.map((word) => (
          <Fragment key={word.text}>
            <span className={cn('inline-block animate-word-in', word.delay, word.isMuted && 'text-subtle')}>
              {word.text}
            </span>
            {word.isLineEnd ? <br /> : ' '}
          </Fragment>
        ))}
      </h1>

      <p className="mt-5 max-w-sm text-muted-foreground">{PROFILE.intro}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button asChild size="lg" className="group sheen h-11 overflow-hidden rounded-full px-5">
          <Link to="/#work">
            View work
            <ArrowRight className="transition-transform duration-(--duration-fast) group-hover:translate-x-0.5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
          <Link to="/#contact">Contact me</Link>
        </Button>
      </div>
    </div>
  )
}
