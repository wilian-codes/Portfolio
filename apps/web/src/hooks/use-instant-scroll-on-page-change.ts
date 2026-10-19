import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * The site scrolls smoothly (globals.css), which suits jumps within a page.
 * When the page itself changes, React Router's ScrollRestoration would smooth-scroll
 * too, so the visitor watches the new page slide up. This turns smooth scrolling
 * off for that one moment. It must run before <ScrollRestoration /> does.
 */
export function useInstantScrollOnPageChange() {
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    const root = document.documentElement
    root.style.scrollBehavior = 'auto'
    const frame = requestAnimationFrame(() => root.style.removeProperty('scroll-behavior'))
    return () => cancelAnimationFrame(frame)
  }, [pathname])
}
