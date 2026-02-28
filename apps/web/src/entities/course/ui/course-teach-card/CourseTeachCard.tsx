import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, Button, IconButton, Typography } from '@mui/material'

import type { ApiOutputs } from '@/shared/api/trpc'
import { MotionPaper } from '@/shared/ui/animations/motion'

import { formatTimeAgo } from '../../lib'
import { CourseImage } from '../course-image'

import {
  courseTeachCardFooterStyles,
  courseTeachCardMetaStyles,
  courseTeachCardStyles,
  courseTeachCardTitleStyles,
} from './CourseTeachCard.styles'

interface TeachCourseCardProps {
  course: ApiOutputs['teach']['getCourses'][number]
  index: number
  onView: (courseId: string) => void
  onEdit: (courseId: string) => void
}

export const CourseTeachCard = ({ course, index, onView, onEdit }: TeachCourseCardProps) => {
  const category = course.category

  return (
    <MotionPaper
      elevation={0}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      onClick={() => onView(course.id)}
      sx={courseTeachCardStyles}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.25,
          delay: index * 0.04,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
    >
      <CourseImage category={category} variant="card" sx={{ height: 140, borderRadius: 0 }} />

      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body1" sx={courseTeachCardTitleStyles}>
          {course.title}
        </Typography>

        <Box sx={courseTeachCardMetaStyles}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <GroupsOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12 }}
            >
              {course.studentsCount}
            </Typography>
          </Box>

          {course.pendingReviewCount > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AssignmentOutlinedIcon sx={{ fontSize: 16, color: 'customColors.orange' }} />
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: 'customColors.orange', fontSize: 12 }}
              >
                {course.pendingReviewCount}
              </Typography>
            </Box>
          )}

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 500, color: 'text.secondary', fontSize: 12 }}
            >
              {formatTimeAgo(course.updatedAt)}
            </Typography>
          </Box>
        </Box>

        <Box sx={courseTeachCardFooterStyles}>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={(e) => {
              e.stopPropagation()
              onEdit(course.id)
            }}
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              fontSize: 12,
              py: 0.75,
            }}
          >
            Редактировать
          </Button>

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onView(course.id)
            }}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Show more options menu
            }}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <MoreVertOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </MotionPaper>
  )
}
