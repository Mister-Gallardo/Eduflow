import { Box, IconButton } from '@mui/material'

interface HeaderAction {
  icon: React.ReactNode
  onClick: () => void
  'aria-label': string
}

interface HeaderActionsProps {
  actions: HeaderAction[]
}

const ActionButton = ({ icon, onClick, 'aria-label': ariaLabel }: HeaderAction) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      size="medium"
      sx={{
        color: 'text.primary',
        padding: 1,
        transition: 'all 0.2s ease-in-out',
        '& svg': {
          fontSize: 24,
        },
        '&:hover': {
          backgroundColor: 'action.hover',
          color: 'text.primary',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }}
    >
      {icon}
    </IconButton>
  )
}

export const HeaderActions = ({ actions }: HeaderActionsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      {actions.map((action, index) => (
        <ActionButton key={index} {...action} />
      ))}
    </Box>
  )
}
