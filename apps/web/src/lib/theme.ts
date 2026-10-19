export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

// The site is dark-first: only an explicit saved "light" choice switches it.
export function resolveTheme(savedTheme: string | null): Theme {
  return savedTheme === 'light' ? 'light' : 'dark'
}

export function readSavedTheme(): Theme {
  try {
    return resolveTheme(localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return 'dark'
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}
