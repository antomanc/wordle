import { Theme } from '@components/customThemeProvider'
import { useEffect, useState } from 'react'

export const useThemeMode = () => {
  const [cachedTheme, setCachedTheme] = useState<Theme | null>(() => {
    const theme = localStorage.getItem('theme') as Theme | null
    return theme
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const theme = localStorage.getItem('theme') as Theme | null
      setCachedTheme(theme)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const setThemeMode = (theme: Theme) => {
    localStorage.setItem('theme', theme)
    setCachedTheme(theme)
    window.dispatchEvent(new Event('storage'))
  }

  return { themeMode: cachedTheme, setThemeMode }
}
