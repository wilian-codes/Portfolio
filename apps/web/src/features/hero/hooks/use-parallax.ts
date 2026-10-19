import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Writes the pointer position inside the element to the CSS variables
 * --parallax-x and --parallax-y (each from -0.5 to 0.5).
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion) return

    const setOffset = (x: number, y: number) => {
      element.style.setProperty('--parallax-x', x.toFixed(3))
      element.style.setProperty('--parallax-y', y.toFixed(3))
    }
    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      setOffset((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5)
    }
    const handlePointerLeave = () => setOffset(0, 0)

    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [prefersReducedMotion])

  return ref
}
