import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import { alpha, Box, Typography, useTheme } from '@mui/material'

import { statCardIconStyles, statCardStyles } from './TeachStatsBar.styles'

interface TeachStatsBarProps {
  totalCourses: number
  totalStudents: number
  totalCompletedSteps: number
  pendingReviewCount: number
}

export const TeachStatsBar = ({
  totalCourses,
  totalStudents,
  totalCompletedSteps,
  pendingReviewCount,
}: TeachStatsBarProps) => {
  const theme = useTheme()

  const stats = [
    {
      icon: <LibraryBooksOutlinedIcon fontSize="medium" />,
      value: totalCourses,
      label: 'Всего курсов',
      color: theme.palette.primary.main,
    },
    {
      icon: <GroupsOutlinedIcon fontSize="medium" />,
      value: totalStudents,
      label: 'Студентов',
      color: theme.palette.customColors.indigo,
    },
    {
      icon: <CheckCircleOutlineOutlinedIcon fontSize="medium" />,
      value: totalCompletedSteps,
      label: 'Шагов пройдено',
      color: theme.palette.customColors.green,
    },
    {
      icon: <AssignmentOutlinedIcon fontSize="medium" />,
      value: pendingReviewCount,
      label: 'На проверку',
      color: theme.palette.customColors.orange,
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      {stats.map((stat) => (
        <Box
          key={stat.label}
          sx={{
            ...statCardStyles,
            borderColor: alpha(stat.color, 0.3),
          }}
        >
          <Box
            sx={{
              ...statCardIconStyles,
              color: stat.color,
              bgcolor: alpha(stat.color, 0.1),
            }}
          >
            {stat.icon}
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, fontSize: 20, lineHeight: 1.2, mb: -0.25 }}
            >
              {stat.value.toLocaleString('ru-RU')}
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
