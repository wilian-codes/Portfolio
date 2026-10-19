import { MapPin } from 'lucide-react'
import { siJavascript, siMysql, siReact } from 'simple-icons'
import { SimpleIcon } from '@/components/simple-icon'
import { PROFILE } from '@/data/profile'
import { useLocalTime } from '@/hooks/use-local-time'
import { AvatarCanvas } from './avatar-canvas'
import { FloatingChip } from './floating-chip'

const STACK_CHIP_ICONS = [siReact, siJavascript, siMysql]

export function HeroStage() {
  const localTime = useLocalTime()

  return (
    <div className="relative mx-auto w-full max-w-sm md:max-w-md">
      <AvatarCanvas />

      <FloatingChip depth="near" className="top-4 -left-2 md:-left-6">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-success ring-3 ring-success/20" />
          {PROFILE.availability}
        </span>
      </FloatingChip>

      <FloatingChip depth="mid" className="top-[46%] -right-1 md:-right-4">
        <span className="flex items-center gap-2.5 text-muted-foreground">
          {STACK_CHIP_ICONS.map((icon) => (
            <SimpleIcon key={icon.slug} icon={icon} />
          ))}
        </span>
      </FloatingChip>

      <FloatingChip depth="far" className="bottom-14 -left-1 md:-left-4">
        <span className="flex items-center gap-1.5 font-mono text-label text-muted-foreground">
          <MapPin aria-hidden="true" className="size-3.5" />
          {PROFILE.shortLocation} · <time>{localTime}</time>
        </span>
      </FloatingChip>

      <p className="mt-1 text-center font-mono text-label text-subtle">
        <span className="pointer-coarse:hidden">drag to spin · click to wave</span>
        <span className="hidden pointer-coarse:inline">drag to spin · tap to wave</span>
      </p>
    </div>
  )
}
