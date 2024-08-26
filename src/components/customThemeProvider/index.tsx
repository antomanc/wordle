import { useThemeMode } from '@hooks/useTheme'
import {
  createTheme,
  useMediaQuery,
  ThemeProvider,
  PaletteOptions,
  ThemeOptions
} from '@mui/material'

import { useMemo } from 'react'

const globalThemeOptions: ThemeOptions = {
  shape: {
    borderRadius: 12
  }
}

const palette: PaletteOptions = {
  primary: {
    main: '#8335ef'
  },
  secondary: {
    main: '#51e5ff'
  },
  error: {
    main: '#ffa5a5'
  },
  warning: {
    main: '#f0f465'
  },
  success: {
    main: '#9cec5b'
  }
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...palette
  },
  ...globalThemeOptions
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...palette
  },
  ...globalThemeOptions
})

export type Theme = 'dark' | 'light'

export const CustomThemeProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { themeMode } = useThemeMode()
  const selectedTheme = useMemo(() => {
    if (themeMode) {
      return themeMode
    }
    return prefersDarkMode ? 'dark' : 'light'
  }, [themeMode, prefersDarkMode])

  return (
    <ThemeProvider theme={selectedTheme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  )
}
