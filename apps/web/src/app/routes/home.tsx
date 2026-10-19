import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

// Placeholder until the landing, marquee, and bento sections land in steps 3–5.
export function HomePage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <section className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-6 px-4 md:px-8">
      <p className="font-mono text-label text-subtle">Full-stack developer and tester</p>
      <h1 className="text-display font-medium">
        Wilian Nunag.
        <br />
        <span className="text-subtle">Web and mobile.</span>
      </h1>
      <p className="max-w-md text-muted-foreground">
        BSIT student at National University – Clark. I build and test web apps from database to UI.
      </p>
      <div>
        <Button variant="outline" onClick={toggleTheme}>
          Switch to {theme === 'dark' ? 'light' : 'dark'} mode
        </Button>
      </div>
    </section>
  )
}
