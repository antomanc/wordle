import { Box, CssBaseline, Toolbar } from '@mui/material'
import { AppBar } from '@components/appBar'

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
  margin?: number | string
}

export const MainLayout = ({
  children,
  title,
  margin = 4
}: MainLayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar title={title} />
      <Box
        component="main"
        padding={0}
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}>
        <Box sx={{ m: margin }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
  )
}
