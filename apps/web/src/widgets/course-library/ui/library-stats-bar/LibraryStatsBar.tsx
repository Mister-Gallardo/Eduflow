import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined'
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined'
import { Box, Typography, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

import { statCardStyles, statsBarContainerStyles } from './LibraryStatsBar.styles'

interface LibraryStatsBarProps {
  inProgress: number
  completed: number
  totalCompletedSteps: number
}

export const LibraryStatsBar = ({
  inProgress,
  completed,
  totalCompletedSteps,
}: LibraryStatsBarProps) => {
  const theme = useTheme()

  const stats = [
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize="medium" />,
      value: inProgress,
      label: 'В процессе',
      color: theme.palette.customColors.orange,
    },
    {
      icon: <CheckCircleOutlineOutlinedIcon fontSize="medium" />,
      value: completed,
      label: 'Завершено',
      color: theme.palette.customColors.green,
    },
    {
      icon: <TrackChangesOutlinedIcon fontSize="medium" />,
      value: totalCompletedSteps,
      label: 'Шагов пройдено',
      color: theme.palette.primary.main,
    },
  ]

  return (
    <Box sx={statsBarContainerStyles}>
      {stats.map((stat) => (
        <Box
          key={stat.label}
          sx={{
            ...statCardStyles,
            bgcolor: alpha(stat.color, 0.1),
            borderColor: alpha(stat.color, 0.4),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: stat.color,
            }}
          >
            {stat.icon}
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1.2, mb: -0.5 }}
            >
              {stat.value}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: 'text.secondary',
                fontSize: 12,
                whiteSpace: 'nowrap',
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
