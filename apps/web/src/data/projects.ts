export type Project = {
  slug: string
  name: string
  summary: string
  period: string
  roles: readonly string[]
  isFeatured: boolean
}

// From the resume, newest first. Step 6 adds screenshots, tech, and links.
export const PROJECTS: readonly Project[] = [
  {
    slug: 'trisikol',
    name: 'Trisikol',
    summary: 'Ride-hailing mobile app',
    period: '2026',
    roles: ['QA tester'],
    isFeatured: false,
  },
  {
    slug: 'dental-management-system',
    name: 'Dental Management System',
    summary: 'Web app for running a dental clinic',
    period: '2026',
    roles: ['Lead developer', 'QA tester'],
    isFeatured: true,
  },
  {
    slug: 'apparel-store-management-system',
    name: 'Apparel Store Management System',
    summary: 'Web app for managing an apparel store',
    period: '2025',
    roles: ['Lead developer', 'QA tester'],
    isFeatured: false,
  },
  {
    slug: 'ridecrash',
    name: 'RideCrash',
    summary: 'Desktop game',
    period: '2024',
    roles: ['Co-developer', 'QA tester'],
    isFeatured: false,
  },
]
