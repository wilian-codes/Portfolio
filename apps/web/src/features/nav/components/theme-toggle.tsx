import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      className="rounded-full text-muted-foreground transition-colors duration-(--duration-fast) hover:text-foreground"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
