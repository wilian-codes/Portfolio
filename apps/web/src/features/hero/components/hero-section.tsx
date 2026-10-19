import { ArrowDown } from 'lucide-react'
import { Link } from 'react-router'
import { SocialLinks } from '@/components/social-links'
import { useParallax } from '../hooks/use-parallax'
import { HeroIntro } from './hero-intro'
import { HeroStage } from './hero-stage'

export function HeroSection() {
  const sectionRef = useParallax<HTMLElement>()

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100dvh-4rem)] scroll-mt-24 flex-col overflow-hidden [--parallax-x:0] [--parallax-y:0] md:min-h-[calc(100dvh-4.25rem)]"
    >
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute top-24 -right-24 -z-10 size-[30rem]" />

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 pt-10 md:grid-cols-[1.15fr_1fr] md:gap-10 md:px-8 md:pt-0">
        <HeroIntro />
        <HeroStage />
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-6 pb-6 md:px-6">
        <SocialLinks />
        <Link
          to="/#about"
          className="flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-label text-subtle outline-none transition-colors duration-(--duration-fast) hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Scroll
          <ArrowDown aria-hidden="true" className="size-3.5 animate-float" />
        </Link>
      </div>
    </section>
  )
}
