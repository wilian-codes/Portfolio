import { Outlet, ScrollRestoration } from 'react-router'
import { SiteNav } from '@/features/nav/components/site-nav'
import { useInstantScrollOnPageChange } from '@/hooks/use-instant-scroll-on-page-change'

// A separate component because React runs effects in sibling order:
// placed before <ScrollRestoration />, its effect runs first.
function InstantScrollOnPageChange() {
  useInstantScrollOnPageChange()
  return null
}

export function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-primary px-4 py-2 text-meta text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="min-h-dvh">
        <Outlet />
      </main>
      <InstantScrollOnPageChange />
      <ScrollRestoration />
    </>
  )
}
