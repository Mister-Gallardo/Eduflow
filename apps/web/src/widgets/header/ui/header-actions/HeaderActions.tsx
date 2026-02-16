import { Box, IconButton } from '@mui/material'

import { actionButtonStyles, headerActionsStyles } from './HeaderActions.styles'

interface HeaderAction {
  icon: React.ReactNode
  onClick: () => void
  'aria-label': string
}

interface HeaderActionsProps {
  actions: HeaderAction[]
  edgeToEnd?: boolean
}

const ActionButton = ({ icon, onClick, 'aria-label': ariaLabel }: HeaderAction) => {
  return (
    <IconButton onClick={onClick} aria-label={ariaLabel} size="medium" sx={actionButtonStyles}>
      {icon}
    </IconButton>
  )
}

export const HeaderActions = ({ actions, edgeToEnd = false }: HeaderActionsProps) => {
  return (
    <Box
      sx={{
        ...headerActionsStyles,
        ...(edgeToEnd && {
          '& > :last-child': {
            mr: '-10px',
          },
        }),
      }}
    >
      {actions.map((action, index) => (
        <ActionButton key={index} {...action} />
      ))}
    </Box>
  )
}
