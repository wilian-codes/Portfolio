import { BentoSection } from '@/features/bento/components/bento-section'
import { HeroSection } from '@/features/hero/components/hero-section'
import { ProjectListSection } from '@/features/projects/components/project-list-section'
import { TechMarquee } from '@/features/tech-marquee/components/tech-marquee'

// Placeholder section so the nav has a target; step 7 replaces it.
const PLACEHOLDER_SECTIONS = [
  { id: 'contact', label: '03 / Contact', title: "Let's work together", note: 'Contact arrives in step 7.' },
]

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

      {PLACEHOLDER_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto min-h-[80dvh] max-w-5xl scroll-mt-24 border-t border-border px-4 py-24 md:px-8"
        >
          <p className="font-mono text-label text-subtle">{section.label}</p>
          <h2 className="mt-2 text-title font-medium">{section.title}</h2>
          <p className="mt-3 text-muted-foreground">{section.note}</p>
        </section>
      ))}
    </>
  )
}
