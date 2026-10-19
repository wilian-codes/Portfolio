import { BentoSection } from '@/features/bento/components/bento-section'
import { ContactSection } from '@/features/contact/components/contact-section'
import { HeroSection } from '@/features/hero/components/hero-section'
import { ProjectListSection } from '@/features/projects/components/project-list-section'
import { TechMarquee } from '@/features/tech-marquee/components/tech-marquee'

export function HomePage() {
  return (
    <>
      {/* The first screen: the landing section grows to fill it, with the logo carousel at the bottom. */}
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col md:min-h-[calc(100dvh-4.25rem)]">
        <HeroSection />
        <TechMarquee />
      </div>

      <BentoSection />
      <ProjectListSection />
      <ContactSection />
    </>
  )
}
