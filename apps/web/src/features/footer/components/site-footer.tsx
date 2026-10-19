import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router'
import { SocialLinks } from '@/components/social-links'
import { PROFILE } from '@/data/profile'

const CURRENT_YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-meta text-muted-foreground">
          © {CURRENT_YEAR} {PROFILE.fullName}
        </p>
        <div className="-ml-2 flex items-center justify-between gap-4 md:ml-0 md:justify-end">
          <SocialLinks />
          {/*
            A router Link, not a plain <a href="#top">: React Router treats a plain hash link as
            "back" navigation and restores the old scroll position. No element has id="top",
            so the router scrolls to the top of the page instead.
          */}
          <Link
            to="#top"
            className="group flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-label text-subtle outline-none transition-colors duration-(--duration-fast) hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="size-3.5 transition-[translate] duration-(--duration-base) group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
