import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export type AvatarStatus = 'loading' | 'ready' | 'error'

export function useAvatarScene() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<AvatarStatus>('loading')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let isCancelled = false
    const cleanups: Array<() => void> = []

    // Loaded on demand so three.js (the largest library) doesn't delay the first paint.
    Promise.all([import('../lib/avatar-scene'), import('../lib/avatar-input')])
      .then(([{ createAvatarScene }, { bindAvatarInput, pauseWhenOffscreen }]) => {
        if (isCancelled) return
        const scene = createAvatarScene(stage, { isMotionReduced: prefersReducedMotion })
        cleanups.push(bindAvatarInput(stage, scene), pauseWhenOffscreen(stage, scene), scene.dispose)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        console.error('The 3D avatar could not load.', error)
        if (!isCancelled) setStatus('error')
      })

    return () => {
      isCancelled = true
      for (const cleanup of cleanups) cleanup()
    }
  }, [prefersReducedMotion])

  return { stageRef, status }
}
