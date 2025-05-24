import { createContext, useContext, useEffect, useState } from 'react'

export const Theme = {
  Dark: 'dark',
  Light: 'light',
  System: 'system',
} as const

type ValueOf<T> = T[keyof T];

export type ThemeType = ValueOf<typeof Theme>

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeType
  storageKey?: string
}

type ThemeProviderState = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const initialState: ThemeProviderState = {
  theme: Theme.System,
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = Theme.System,
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem(storageKey) as ThemeType) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove(Theme.Light, Theme.Dark)

    if (theme === Theme.System) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? Theme.Dark
        : Theme.Light

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: ThemeType) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}