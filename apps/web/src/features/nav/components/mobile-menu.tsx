import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { PROFILE } from '@/data/profile'
import { cn } from '@/lib/utils'
import { MOBILE_MENU_ID, NAV_ITEMS } from '../nav-items'

type MobileMenuProps = {
  isOpen: boolean
  activeId: string | null
  onNavigate: () => void
}

export function MobileMenu({ isOpen, activeId, onNavigate }: MobileMenuProps) {
  return (
    <div
      id={MOBILE_MENU_ID}
      className={cn(
        'grid transition-[grid-template-rows] duration-(--duration-base) md:hidden',
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="overflow-hidden" inert={!isOpen}>
        <ul className="flex flex-col gap-1 border-t border-border px-2 pt-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId
            return (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  onClick={onNavigate}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'block rounded-2xl px-4 py-3 text-heading font-medium outline-none transition-colors duration-(--duration-fast) focus-visible:ring-3 focus-visible:ring-ring/50',
                    isActive
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="px-2 pt-2 pb-3">
          <Button asChild size="lg" className="h-11 w-full rounded-full">
            <a href={PROFILE.resumeUrl} onClick={onNavigate}>
              Resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
