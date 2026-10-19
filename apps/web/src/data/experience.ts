export type Experience = {
  role: string
  organization: string
  period: string
  isCurrent: boolean
  highlights: readonly string[]
}

// From the resume. Add internships here as they happen; the newest goes first.
export const EXPERIENCE: readonly Experience[] = [
  {
    role: 'Full-stack developer',
    organization: 'Academic projects',
    period: '2023 – now',
    isCurrent: true,
    highlights: ['Database design', 'APIs', 'Responsive UI', 'Testing', 'Code reviews'],
  },
]
