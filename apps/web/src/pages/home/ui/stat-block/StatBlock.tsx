import { Box, Typography } from '@mui/material'

import { MotionBox } from '@/shared/ui'

import type { Stat } from '../../model'

import { iconStyles } from './StatBlock.styles'

export const StatBlock = ({ stat, index }: { stat: Stat; index: number }) => {
  const Icon = stat.icon

  return (
    <MotionBox
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          ...iconStyles,
          backgroundColor: stat.bgColor,
          color: stat.color,
        }}
      >
        <Icon sx={{ fontSize: 28 }} />
      </Box>

      <Box sx={{ textAlign: 'left' }}>
        <Typography
          sx={{
            fontSize: { xs: 24, md: 28 },
            fontWeight: 800,
            color: 'primary.main',
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          {stat.value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: 'clamp(10px, 3.5vw, 12px)', md: 12 },
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {stat.label}
        </Typography>
      </Box>
    </MotionBox>
  )
}
