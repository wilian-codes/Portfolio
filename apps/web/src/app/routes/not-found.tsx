import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { PROFILE } from '@/data/profile'

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-dvh max-w-5xl flex-col items-start justify-center gap-4 px-4 md:px-8">
      <title>{`Page not found — ${PROFILE.shortName}`}</title>
      <p className="font-mono text-label text-subtle">404</p>
      <h1 className="text-title font-medium">This page doesn't exist.</h1>
      <Button asChild variant="outline">
        <Link to="/">Back to home</Link>
      </Button>
    </section>
  )
}
