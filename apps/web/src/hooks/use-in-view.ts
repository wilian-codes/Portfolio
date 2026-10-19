import { useEffect, useRef, useState } from 'react'

const DEFAULT_VISIBLE_SHARE = 0.15

/**
 * Turns true the first time the element scrolls into view, then stays true,
 * so reveal animations play once.
 */
export function useInView<T extends Element>(visibleShare = DEFAULT_VISIBLE_SHARE) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setIsInView(true)
        observer.disconnect()
      },
      { threshold: visibleShare },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [visibleShare])

  return { ref, isInView }
}
