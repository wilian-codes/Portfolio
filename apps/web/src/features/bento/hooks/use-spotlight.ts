import { useEffect, useRef } from 'react'

/**
 * Writes the pointer position inside the element, in pixels, to the CSS
 * variables --spotlight-x and --spotlight-y. The `spotlight` utility draws the light.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      element.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
      element.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
    }

    element.addEventListener('pointermove', handlePointerMove)
    return () => element.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return ref
}
