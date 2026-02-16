import { ExpandLess } from '@mui/icons-material'
import { Box, useTheme } from '@mui/material'

import { MotionBox } from '@/shared/ui'

import { chevronStyles } from './PanelChevron.styles'

interface PanelChevronProps {
  isExpanded: boolean
  onToggle: () => void
}

export const PanelChevron = ({ isExpanded, onToggle }: PanelChevronProps) => {
  const theme = useTheme()

  return (
    <Box onClick={onToggle} sx={chevronStyles}>
      <MotionBox
        animate={{ rotate: isExpanded ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ExpandLess
          sx={{
            fontSize: 18,
            color: theme.palette.text.secondary,
            transition: 'color 0.2s',
            '&:hover': { color: theme.palette.primary.main, transition: 'color 0.2s' },
          }}
        />
      </MotionBox>
    </Box>
  )
}
