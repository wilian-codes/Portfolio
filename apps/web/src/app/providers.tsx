import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext } from '@/hooks/use-theme'
import { applyTheme, readSavedTheme, type Theme } from '@/lib/theme'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [theme, setTheme] = useState<Theme>(readSavedTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
