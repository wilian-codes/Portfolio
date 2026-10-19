import { useAvatarScene } from '../hooks/use-avatar-scene'

export function AvatarCanvas() {
  const { stageRef, status } = useAvatarScene()

  return (
    <div className="relative aspect-[4/5] w-full">
      <div
        ref={stageRef}
        role="button"
        tabIndex={0}
        aria-label="3D cartoon of Wilian. Press Enter to wave hello, or drag to spin."
        className="absolute inset-0 cursor-grab touch-pan-y rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing"
      />
      {status === 'loading' && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="size-32 animate-pulse rounded-full bg-muted" />
        </div>
      )}
      {status === 'error' && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="grid size-32 place-items-center rounded-full border border-border bg-card text-title font-medium">
            WN
          </div>
        </div>
      )}
    </div>
  )
}
