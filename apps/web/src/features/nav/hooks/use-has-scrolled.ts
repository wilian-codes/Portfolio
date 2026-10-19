import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD_PX = 8

export function useHasScrolled() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const update = () => setHasScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return hasScrolled
}
