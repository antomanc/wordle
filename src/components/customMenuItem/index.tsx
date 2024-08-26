import { MenuItem, MenuItemProps, styled } from '@mui/material'
import { customShouldForwardProp } from '@utils/customShouldForwardProp'

type CustomMenuItemProps = {
  children: React.ReactNode
  disableOnHoverEffect?: boolean
} & MenuItemProps

type StyledMenuItemProps = {
  $disableOnHoverEffect?: boolean
}

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: customShouldForwardProp
})<StyledMenuItemProps>(({ theme, $disableOnHoverEffect }) => ({
  '&:hover': {
    backgroundColor: $disableOnHoverEffect
      ? 'transparent'
      : theme.palette.action.hover
  }
}))

export const CustomMenuItem = ({
  children,
  disableOnHoverEffect,
  ...props
}: CustomMenuItemProps) => {
  return (
    <StyledMenuItem $disableOnHoverEffect={disableOnHoverEffect} {...props}>
      {children}
    </StyledMenuItem>
  )
}
