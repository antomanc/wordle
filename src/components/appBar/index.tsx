import {
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  MenuProps,
  ListItemText,
  Box,
  Input,
  Button,
  Select
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'

import { useThemeMode } from '@hooks/useTheme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Add, QuestionMark, Remove, Settings } from '@mui/icons-material'
import React from 'react'
import {
  LanguagesAvailableEnum,
  languagesLabels,
  useWordle
} from '@hooks/useWordle'
import { CustomMenuItem } from '@components/customMenuItem'
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
  const {
    preferredWordLength,
    preferredLanguage,
    setPreferredWordLength,
    setPreferredLanguage
  } = useWordle()
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
            <Box
              height={48}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}>
              {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              <ListItemText
                primary={themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
              />
            </Box>
          </MenuItem>
          {/* button to set preferred word length, with 2 buttons to increment and decrement */}
          <CustomMenuItem
            disableOnHoverEffect
            disableGutters
            disableRipple
            disableTouchRipple>
            <Box
              height={48}
              display="flex"
              alignItems="center"
              p={2}
              justifyContent="space-between">
              <Button
                size="small"
                onClick={() => setPreferredWordLength(preferredWordLength - 1)}
                endIcon={<Remove />}
                sx={{ borderRadius: 28, height: 40, width: 40 }}
              />
              <Input
                disableUnderline
                value={preferredWordLength}
                onChange={e => {
                  if (!isNaN(Number(e.target.value))) {
                    setPreferredWordLength(Number(e.target.value))
                  }
                }}
                inputProps={{
                  style: {
                    width: 40,
                    textAlign: 'center',
                    backgroundColor: 'transparent'
                  }
                }}
              />
              <Button
                endIcon={<Add />}
                onClick={() => setPreferredWordLength(preferredWordLength + 1)}
                sx={{ borderRadius: 28, height: 40, width: 40 }}
              />
            </Box>
          </CustomMenuItem>
          <CustomMenuItem disableOnHoverEffect disableRipple disableTouchRipple>
            <Box
              height={48}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}>
              <Select
                size="small"
                variant="standard"
                disableUnderline
                value={preferredLanguage}
                onChange={e =>
                  setPreferredLanguage(e.target.value as LanguagesAvailableEnum)
                }
                SelectDisplayProps={{
                  style: {
                    textAlign: 'center'
                  }
                }}
                inputProps={{
                  style: {
                    textAlign: 'center',
                    backgroundColor: 'transparent'
                  }
                }}
                sx={{ width: 120 }}>
                {Object.values(LanguagesAvailableEnum).map(language => (
                  <MenuItem value={language} key={language}>
                    {languagesLabels[language]}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </CustomMenuItem>
        </StyledMenu>
      </Toolbar>
    </AppBarStyle>
  )
}
