import type { AvatarScene } from './avatar-scene'

// A press that moves less than this counts as a click (wave), not a drag (spin).
const CLICK_TOLERANCE_PX = 4

const clamp = (value: number) => Math.max(-1, Math.min(1, value))

/** Connects mouse, touch, and keyboard input to the avatar. Returns a cleanup function. */
export function bindAvatarInput(stage: HTMLElement, scene: AvatarScene) {
  let isDragging = false
  let startX = 0
  let lastX = 0

  const handlePointerMove = (event: PointerEvent) => {
    const rect = stage.getBoundingClientRect()
    scene.setPointer(
      clamp(((event.clientX - rect.left) / rect.width) * 2 - 1),
      clamp(((event.clientY - rect.top) / rect.height) * 2 - 1),
    )
    if (!isDragging) return
    scene.spinBy(event.clientX - lastX)
    lastX = event.clientX
  }

  const handlePointerDown = (event: PointerEvent) => {
    isDragging = true
    startX = event.clientX
    lastX = event.clientX
    scene.setDragging(true)
  }

  const handlePointerUp = (event: PointerEvent) => {
    if (!isDragging) return
    isDragging = false
    scene.setDragging(false)
    if (Math.abs(event.clientX - startX) < CLICK_TOLERANCE_PX) scene.wave()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    scene.wave()
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerup', handlePointerUp)
  window.addEventListener('pointercancel', handlePointerUp)
  stage.addEventListener('pointerdown', handlePointerDown)
  stage.addEventListener('keydown', handleKeyDown)

  return () => {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointercancel', handlePointerUp)
    stage.removeEventListener('pointerdown', handlePointerDown)
    stage.removeEventListener('keydown', handleKeyDown)
  }
}

/** Pauses rendering while the avatar is scrolled out of view. Returns a cleanup function. */
export function pauseWhenOffscreen(stage: HTMLElement, scene: AvatarScene) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry) scene.setActive(entry.isIntersecting)
  })
  observer.observe(stage)
  return () => observer.disconnect()
}
