import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { CourseSettingsForm } from '@/features/course-settings'
import type { ApiOutputs } from '@/shared/api/trpc'
import { trpc } from '@/shared/api/trpc'
import { paths } from '@/shared/config/paths'
import { MotionPaper } from '@/shared/ui/animations/motion'

import { formatTimeAgo } from '../../lib'
import { CourseImage } from '../course-image'

import {
  courseTeachCardEditButtonStyles,
  courseTeachCardFooterStyles,
  courseTeachCardMetaStyles,
  courseTeachCardStyles,
  courseTeachCardTitleStyles,
  courseTeachCardViewButtonStyles,
} from './CourseTeachCard.styles'

interface TeachCourseCardProps {
  course: ApiOutputs['teach']['getCourses'][number]
  index: number
}

export const CourseTeachCard = ({ course, index }: TeachCourseCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const openMoreOptions = Boolean(anchorEl)

  const courseByIdQuery = trpc.teach.getCourseById.useQuery(
    { courseId: course.id },
    { enabled: settingsOpen },
  )

  const handleOpenMoreOptions = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMoreOptions = () => setAnchorEl(null)

  const handleOpenSettings = () => {
    handleCloseMoreOptions()
    setSettingsOpen(true)
  }

  const handleCloseSettings = () => setSettingsOpen(false)

  const handlePublishToggle = () => {
    // handleCloseMoreOptions()
  }

  const handleDelete = () => {
    // handleCloseMoreOptions()
  }

  const category = course.category

  return (
    <>
      <MotionPaper
        elevation={0}
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
            <Box
              component={Link}
              to={paths.course.edit(course.id)}
              sx={courseTeachCardEditButtonStyles}
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
              <Typography sx={{ fontWeight: 600, fontSize: 12, color: 'inherit' }}>
                Редактировать
              </Typography>
            </Box>

            <Box
              component={Link}
              to={paths.course.view(course.id)}
              sx={courseTeachCardViewButtonStyles}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>

            <IconButton
              size="small"
              onClick={handleOpenMoreOptions}
              sx={{
                position: 'relative',
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

      <MoreOptions
        anchorEl={anchorEl}
        open={openMoreOptions}
        onClose={handleCloseMoreOptions}
        courseId={course.id}
        isPublished={true}
        onPublishToggle={handlePublishToggle}
        onDelete={handleDelete}
        onOpenSettings={handleOpenSettings}
      />

      {settingsOpen && courseByIdQuery.data && (
        <CourseSettingsForm
          open={settingsOpen}
          onClose={handleCloseSettings}
          defaultValues={courseByIdQuery.data}
        />
      )}
    </>
  )
}

interface MoreOptionsProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  isPublished: boolean
  onPublishToggle: () => void
  onDelete: () => void
  courseId: string
  onOpenSettings: () => void
}

const MoreOptions = ({
  anchorEl,
  open,
  onClose,
  isPublished,
  onPublishToggle,
  onDelete,
  courseId,
  onOpenSettings,
}: MoreOptionsProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="more-options"
      open={open}
      onClose={onClose}
      onClick={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            mt: -0.5,
            minWidth: 180,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
            '& .MuiMenuItem-root': {
              px: 1.5,
              py: 1,
              '& .MuiTypography-root': {
                fontWeight: 500,
                fontSize: 13,
              },
            },
          },
        },
      }}
    >
      <MenuItem component={Link} to={paths.course.view(courseId)}>
        <ListItemIcon sx={{ minWidth: '28px !important' }}>
          <VisibilityOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        </ListItemIcon>
        <Typography>Предпросмотр</Typography>
      </MenuItem>

      <MenuItem onClick={onPublishToggle}>
        <ListItemIcon sx={{ minWidth: '28px !important' }}>
          {isPublished ? (
            <LockOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          ) : (
            <LanguageOutlinedIcon sx={{ fontSize: 16, color: 'success.light' }} />
          )}
        </ListItemIcon>
        <Typography sx={{ color: isPublished ? 'inherit' : 'success.light' }}>
          {isPublished ? 'Снять с публикации' : 'Опубликовать'}
        </Typography>
      </MenuItem>

      <MenuItem onClick={onOpenSettings}>
        <ListItemIcon sx={{ minWidth: '28px !important' }}>
          <SettingsOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        </ListItemIcon>
        <Typography>Настройки курса</Typography>
      </MenuItem>

      <Divider sx={{ my: 0.5, mx: 1 }} />

      <MenuItem
        onClick={onDelete}
        sx={{
          color: 'error.light',
          '&:hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.04)',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: '28px !important', color: 'inherit' }}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
        </ListItemIcon>
        <Typography>Удалить курс</Typography>
      </MenuItem>
    </Menu>
  )
}
