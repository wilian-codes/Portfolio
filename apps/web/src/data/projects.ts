export type ProjectType = 'Web app' | 'Mobile app' | 'Desktop game'

export type Project = {
  slug: string
  name: string
  type: ProjectType
  summary: string
  overview: string
  year: string
  period: string
  roles: readonly string[]
  isFeatured: boolean
  // Optional until Wilian adds them; the detail page hides what's missing.
  stack?: readonly string[]
  liveUrl?: string
  sourceUrl?: string
}

// From the resume, newest first. Summaries and overviews are placeholders until Wilian writes them.
export const PROJECTS: readonly Project[] = [
  {
    slug: 'trisikol',
    name: 'Trisikol',
    type: 'Mobile app',
    summary: 'Ride-hailing mobile app',
    overview: 'A ride-hailing mobile app built as an academic team project. I was the QA tester.',
    year: '2026',
    period: 'Apr – May 2026',
    roles: ['QA tester'],
    isFeatured: false,
  },
  {
    slug: 'dental-management-system',
    name: 'Dental Management System',
    type: 'Web app',
    summary: 'Web app for running a dental clinic',
    overview: 'A web app for running a dental clinic, built as an academic team project. I was the lead developer and the QA tester.',
    year: '2026',
    period: 'Mar – Apr 2026',
    roles: ['Lead developer', 'QA tester'],
    isFeatured: true,
  },
  {
    slug: 'apparel-store-management-system',
    name: 'Apparel Store Management System',
    type: 'Web app',
    summary: 'Web app for managing an apparel store',
    overview: 'A web app for managing an apparel store, built as an academic team project. I was the lead developer and the QA tester.',
    year: '2025',
    period: 'Sep – Oct 2025',
    roles: ['Lead developer', 'QA tester'],
    isFeatured: false,
  },
  {
    slug: 'ridecrash',
    name: 'RideCrash',
    type: 'Desktop game',
    summary: 'Desktop game',
    overview: 'A desktop game built as an academic team project. I was a co-developer and the QA tester.',
    year: '2024',
    period: 'Mar 2024',
    roles: ['Co-developer', 'QA tester'],
    isFeatured: false,
  },
]

export function getProjectPath(slug: string) {
  return `/projects/${slug}`
}
