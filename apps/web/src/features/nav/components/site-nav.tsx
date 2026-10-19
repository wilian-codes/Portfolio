import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { PROFILE } from '@/data/profile'
import { cn } from '@/lib/utils'
import { useActiveSection } from '../hooks/use-active-section'
import { useHasScrolled } from '../hooks/use-has-scrolled'
import { useMobileMenu } from '../hooks/use-mobile-menu'
import { MOBILE_MENU_ID, NAV_ITEMS, SECTION_IDS } from '../nav-items'
import { MobileMenu } from './mobile-menu'
import { ThemeToggle } from './theme-toggle'

export function SiteNav() {
  const activeId = useActiveSection(SECTION_IDS)
  const hasScrolled = useHasScrolled()
  const { isOpen, toggle, close, containerRef, toggleButtonRef } = useMobileMenu()

  return (
    // The header keeps a fixed height; the nav floats inside it so the open menu overlays the page.
    <header className="sticky top-0 z-50 h-16 md:h-17">
      <nav
        ref={containerRef}
        aria-label="Main"
        className={cn(
          'absolute inset-x-4 top-3 mx-auto max-w-3xl rounded-[1.75rem] md:top-4 border bg-background/70 backdrop-blur-xl transition-[border-color,box-shadow] duration-(--duration-base)',
          hasScrolled || isOpen
            ? 'border-border-strong shadow-lg shadow-black/10'
            : 'border-border',
        )}
      >
        <div className="flex h-13 items-center justify-between gap-4 pr-2 pl-5">
          <Link
            to="/#home"
            onClick={close}
            className="rounded-md text-heading font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            wilian<span className="text-subtle">.dev</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeId
              return (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'rounded-full px-3.5 py-1.5 text-meta outline-none transition-colors duration-(--duration-fast) focus-visible:ring-3 focus-visible:ring-ring/50',
                      isActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden rounded-full px-3.5 md:inline-flex">
              <a href={PROFILE.resumeUrl}>Resume</a>
            </Button>
            <Button
              ref={toggleButtonRef}
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="rounded-full md:hidden"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        <MobileMenu isOpen={isOpen} activeId={activeId} onNavigate={close} />
      </nav>
    </header>
  )
}
