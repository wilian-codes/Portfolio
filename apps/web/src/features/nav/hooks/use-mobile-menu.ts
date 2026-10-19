import { useCallback, useEffect, useRef, useState } from 'react'

// Matches Tailwind's `md` breakpoint, where the full link row replaces the menu.
const DESKTOP_MEDIA_QUERY = '(min-width: 48rem)'

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  const toggle = useCallback(() => setIsOpen((open) => !open), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      toggleButtonRef.current?.focus()
    }

    const handlePointerDown = (event: PointerEvent) => {
      const isInsideNav =
        event.target instanceof Node && containerRef.current?.contains(event.target)
      if (!isInsideNav) setIsOpen(false)
    }

    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    desktopQuery.addEventListener('change', handleBreakpointChange)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      desktopQuery.removeEventListener('change', handleBreakpointChange)
    }
  }, [isOpen])

  return { isOpen, toggle, close, containerRef, toggleButtonRef }
}
