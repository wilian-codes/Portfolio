import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

// A section becomes active once its top passes 40% of the way down the screen.
const ACTIVE_LINE_RATIO = 0.4
const BOTTOM_TOLERANCE_PX = 2
const PROJECT_PAGES_PREFIX = '/projects/'
const WORK_SECTION_ID = 'work'

export type SectionPosition = {
  id: string
  top: number
}

export function getActiveSectionId(
  positions: SectionPosition[],
  activeLine: number,
  isAtPageBottom: boolean,
): string | null {
  // The last section can be too short to reach the line, so the page bottom selects it.
  if (isAtPageBottom && positions.length > 0) {
    return positions[positions.length - 1]?.id ?? null
  }

  let activeId: string | null = null
  for (const { id, top } of positions) {
    if (top <= activeLine) activeId = id
  }
  return activeId
}

function readSectionPositions(sectionIds: string[]): SectionPosition[] {
  return sectionIds.flatMap((id) => {
    const element = document.getElementById(id)
    return element ? [{ id, top: element.getBoundingClientRect().top }] : []
  })
}

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrollBottom = window.scrollY + window.innerHeight
      const isAtPageBottom =
        window.scrollY > 0 &&
        scrollBottom >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX
      setActiveId(
        getActiveSectionId(
          readSectionPositions(sectionIds),
          window.innerHeight * ACTIVE_LINE_RATIO,
          isAtPageBottom,
        ),
      )
    }

    const scheduleUpdate = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [sectionIds, pathname])

  // Project pages have no sections; they belong to Work.
  return pathname.startsWith(PROJECT_PAGES_PREFIX) ? WORK_SECTION_ID : activeId
}
