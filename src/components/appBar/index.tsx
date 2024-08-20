import {
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  MenuProps
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'

import { useThemeMode } from '@hooks/useTheme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { FormatAlignJustify, QuestionMark, Settings } from '@mui/icons-material'
import React from 'react'
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

export const AppBarStyle = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}))

interface AppBarProps {
  title?: string
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5)
      }
    }
  }
}))

export const AppBar = ({ title }: AppBarProps) => {
  const { themeMode, setThemeMode } = useThemeMode()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleThemeChange = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }
  return (
    <AppBarStyle position="absolute">
      <Toolbar
        sx={{
          pr: '24px'
        }}>
        <Typography
          ml={4}
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
          <QuestionMark />
          {title}
          <QuestionMark />
        </Typography>

        <IconButton onClick={handleMenuOpen} color="inherit">
          <Tooltip title="Settings">
            <Settings />
          </Tooltip>
        </IconButton>
        <StyledMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleThemeChange}>
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </MenuItem>
        </StyledMenu>
      </Toolbar>
    </AppBarStyle>
  )
}
