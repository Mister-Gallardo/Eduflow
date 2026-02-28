import { Box, IconButton } from '@mui/material'

import { LoginPrompt } from '@/features/auth'

import { actionButtonStyles, headerActionsStyles } from './HeaderActions.styles'

interface HeaderAction {
  icon: React.ReactNode
  onClick: () => void
  'aria-label': string
}

interface HeaderActionsProps {
  actions: HeaderAction[]
  edgeToEnd?: boolean
  showAuthButton?: boolean
  isUserLoading?: boolean
}

const ActionButton = ({ icon, onClick, 'aria-label': ariaLabel }: HeaderAction) => {
  return (
    <IconButton
      className="icon-button"
      onClick={onClick}
      aria-label={ariaLabel}
      size="medium"
      sx={actionButtonStyles}
    >
      {icon}
    </IconButton>
  )
}

export const HeaderActions = ({
  actions,
  edgeToEnd = false,
  showAuthButton,
  isUserLoading,
}: HeaderActionsProps) => {
  if (isUserLoading) return null

  return (
    <Box
      sx={{
        ...headerActionsStyles,
        ...(edgeToEnd && {
          '& > .icon-button:last-child': {
            mr: '-10px',
          },
        }),
      }}
    >
      {showAuthButton ? (
        <LoginPrompt />
      ) : (
        actions.map((action, index) => <ActionButton key={index} {...action} />)
      )}
    </Box>
  )
}
