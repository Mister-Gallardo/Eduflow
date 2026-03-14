import type { PendingSubmission } from '@eduflow/shared'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import {
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  darken,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { type InfiniteData, useQueryClient } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { formatTimeAgo } from '@/entities/course/lib'
import { trpc } from '@/shared/api/trpc'
import { paths } from '@/shared/config/paths'

interface PageData {
  items: PendingSubmission[]
  nextCursor?: string | null
}

type CacheData = InfiniteData<PageData>

interface ReplyCardProps {
  reply: PendingSubmission
  expanded: boolean
  onToggle: (id: string) => void
  mode: 'pending' | 'reviewed'
}

export const ReplyCard = ({ reply, expanded, onToggle, mode }: ReplyCardProps) => {
  const theme = useTheme()
  const utils = trpc.useUtils()
  const queryClient = useQueryClient()

  const [comment, setComment] = useState(reply.reviewComment ?? '')
  const [isEditing, setIsEditing] = useState(false)

  // For reviewed cards: edit mode state
  const [editComment, setEditComment] = useState(reply.reviewComment ?? '')

  const reviewMutation = trpc.teach.reviewReply.useMutation({
    onMutate: async (variables) => {
      // Отменяем исходящие запросы, чтобы они не перезаписали наш optimistic update
      await utils.teach.getPendingReplies.cancel()
      await utils.teach.getReviewedReplies.cancel()

      const pendingKey = [['teach', 'getPendingReplies']]
      const reviewedKey = [['teach', 'getReviewedReplies']]

      // Сохраняем предыдущее состояние для всех вариаций инпутов (search, limit)
      const prevPending = queryClient.getQueriesData({ queryKey: pendingKey })
      const prevReviewed = queryClient.getQueriesData({ queryKey: reviewedKey })

      // Optimistic update для pending: убираем ответ из списка
      queryClient.setQueriesData(
        { queryKey: pendingKey },
        (data: CacheData | undefined): CacheData | undefined => {
          if (!data) return data
          return {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              items: page.items.filter((item) => item.id !== variables.id),
            })),
          }
        },
      )

      // Optimistic update для reviewed: добавляем ответ (в самое начало первой страницы)
      queryClient.setQueriesData(
        { queryKey: reviewedKey },
        (data: CacheData | undefined): CacheData | undefined => {
          if (!data) return data

          const optimisticReply: PendingSubmission = {
            ...reply,
            status: variables.status,
            reviewComment: variables.comment ?? null,
            reviewedAt: new Date(),
          }

          return {
            ...data,
            pages: data.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  items: [optimisticReply, ...page.items],
                }
              }
              return page
            }),
          }
        },
      )

      return { prevPending, prevReviewed }
    },
    onError: (_err, _newTodo, context) => {
      // В случае ошибки возвращаем предыдущее состояние
      if (context?.prevPending) {
        context.prevPending.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      if (context?.prevReviewed) {
        context.prevReviewed.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      // В конце всегда инвалидируем запросы для уверенности, что локальные данные совпадают с сервером
      void utils.teach.getPendingReplies.invalidate()
      void utils.teach.getReviewedReplies.invalidate()
      void utils.teach.getStats.invalidate()
      setIsEditing(false)
    },
  })

  const handleReview = (status: 'APPROVED' | 'FAILED') => {
    reviewMutation.mutate({
      id: reply.id,
      status,
      comment: comment.trim() || undefined,
    })
  }

  const handleEditReview = (status: 'APPROVED' | 'FAILED') => {
    reviewMutation.mutate({
      id: reply.id,
      status,
      comment: editComment.trim() || undefined,
    })
  }

  const initial = reply.student.fullName.charAt(0).toUpperCase()
  const breadcrumb = `${reply.course.title} / ${reply.lesson.title} / ${reply.step.title}`

  const isReviewed = mode === 'reviewed'
  const isApproved = reply.status === 'APPROVED'

  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: `0 2px 12px ${alpha(theme.palette.common.black, 0.06)}`,
        },
      }}
    >
      {/* Header — always visible */}
      <Box
        onClick={() => onToggle(reply.id)}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          columnGap: 4,
          rowGap: 2,
          px: { xs: 2, md: 3 },
          py: 2,
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.04),
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {initial}
          </Avatar>

          {/* Info */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {reply.student.fullName}
              </Typography>
              {isReviewed && (
                <Chip
                  label={isApproved ? 'Принято' : 'На доработку'}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    bgcolor: isApproved
                      ? alpha(theme.palette.customColors.green, 0.12)
                      : alpha(theme.palette.customColors.red, 0.12),
                    color: (theme) =>
                      isApproved
                        ? darken(theme.palette.customColors.green, 0.1)
                        : darken(theme.palette.customColors.red, 0.1),
                  }}
                />
              )}
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {breadcrumb}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 2,
            flex: 0,
          }}
        >
          {/* Time */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              color: 'text.secondary',
            }}
          >
            <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
              {formatTimeAgo(reply.updatedAt)}
            </Typography>
          </Box>

          {/* Expand icon */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              color: 'text.secondary',
              transition: 'transform 0.3s ease',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ExpandMoreIcon sx={{ fontSize: 24 }} />
          </Box>
        </Box>
      </Box>

      {/* Expandable content */}
      <Collapse in={expanded} timeout={300}>
        <Box
          sx={{
            px: { xs: 2, md: 3 },
            pb: 3,
            pt: 0,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Task link + breadcrumb */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              justifyContent: 'space-between',
              rowGap: 1,
              pt: 2,
              pb: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {reply.course.title} / {reply.lesson.title}
            </Typography>
            <Button
              component={Link}
              to={paths.course.view(reply.course.id, reply.step.id)}
              variant="text"
              size="small"
              startIcon={<LaunchOutlinedIcon sx={{ fontSize: 16 }} />}
              sx={{
                textTransform: 'none',
                alignSelf: 'end',
                borderRadius: 1.5,
                fontWeight: 600,
                fontSize: '0.75rem',
                color: 'primary.main',
                px: 1.5,
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Открыть задание
            </Button>
          </Box>

          {/* Student Answer */}
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Ответ студента:
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.action.hover, 0.04),
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.6),
              mb: 2.5,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              {typeof reply.answer === 'string'
                ? reply.answer
                : JSON.stringify(reply.answer, null, 2)}
            </Typography>
          </Box>

          {/* Pending: review form */}
          {mode === 'pending' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Комментарий (необязательно):
              </Typography>
              <TextField
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Добавьте комментарий к ответу..."
                multiline
                minRows={2}
                maxRows={6}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<CheckCircleOutlineIcon />}
                  disabled={reviewMutation.isPending}
                  onClick={() => handleReview('APPROVED')}
                  sx={{
                    px: 3,
                    py: 1,
                    boxShadow: 'none',
                    bgcolor: (theme) => theme.palette.customColors.green,
                    '&:hover': {
                      bgcolor: (theme) => darken(theme.palette.customColors.green, 0.1),
                      boxShadow: 'none',
                    },
                  }}
                >
                  Принять ответ
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CancelOutlinedIcon />}
                  disabled={reviewMutation.isPending}
                  onClick={() => handleReview('FAILED')}
                  sx={{
                    px: 3,
                    py: 1,
                    color: (theme) => theme.palette.customColors.red,
                    borderColor: (theme) => theme.palette.customColors.red,
                    '&:hover': {
                      borderColor: (theme) => darken(theme.palette.customColors.red, 0.1),
                      bgcolor: (theme) => alpha(theme.palette.customColors.red, 0.04),
                    },
                  }}
                >
                  Вернуть на доработку
                </Button>
              </Box>
            </Box>
          )}

          {/* Reviewed: show result or edit form */}
          {mode === 'reviewed' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {!isEditing ? (
                <>
                  {/* Display review info */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: isApproved
                        ? alpha(theme.palette.success.main, 0.05)
                        : alpha(theme.palette.error.main, 0.05),
                      border: '1px solid',
                      borderColor: isApproved
                        ? alpha(theme.palette.success.main, 0.2)
                        : alpha(theme.palette.error.main, 0.2),
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isApproved ? (
                          <CheckCircleOutlineIcon
                            sx={{
                              fontSize: 18,
                              color: darken(theme.palette.customColors.green, 0.25),
                            }}
                          />
                        ) : (
                          <CancelOutlinedIcon
                            sx={{
                              fontSize: 18,
                              color: darken(theme.palette.customColors.red, 0.25),
                            }}
                          />
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: (theme) =>
                              isApproved
                                ? darken(theme.palette.customColors.green, 0.25)
                                : darken(theme.palette.customColors.red, 0.25),
                          }}
                        >
                          {isApproved ? 'Ответ принят' : 'Возвращено на доработку'}
                        </Typography>
                      </Box>
                      {reply.reviewComment && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
                          {reply.reviewComment}
                        </Typography>
                      )}
                    </Box>
                    <IconButton
                      size="medium"
                      onClick={() => {
                        setEditComment(reply.reviewComment ?? '')
                        setIsEditing(true)
                      }}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      <EditOutlinedIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  {/* Edit form */}
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Редактирование оценки:
                  </Typography>
                  <TextField
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    placeholder="Комментарий..."
                    multiline
                    minRows={2}
                    maxRows={6}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CheckCircleOutlineIcon />}
                      disabled={reviewMutation.isPending}
                      onClick={() => handleEditReview('APPROVED')}
                      sx={{
                        px: 3,
                        py: 1,
                        boxShadow: 'none',
                        bgcolor: (theme) => theme.palette.customColors.green,
                        '&:hover': {
                          bgcolor: (theme) => darken(theme.palette.customColors.green, 0.1),
                          boxShadow: 'none',
                        },
                      }}
                    >
                      Принять ответ
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<CancelOutlinedIcon />}
                      disabled={reviewMutation.isPending}
                      onClick={() => handleEditReview('FAILED')}
                      sx={{
                        px: 3,
                        py: 1,
                        color: (theme) => theme.palette.customColors.red,
                        borderColor: (theme) => theme.palette.customColors.red,
                        '&:hover': {
                          borderColor: (theme) => darken(theme.palette.customColors.red, 0.1),
                          bgcolor: (theme) => alpha(theme.palette.customColors.red, 0.04),
                        },
                      }}
                    >
                      Вернуть на доработку
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      disabled={reviewMutation.isPending}
                      onClick={() => setIsEditing(false)}
                      sx={{
                        px: 3,
                        py: 1,
                        color: (theme) => theme.palette.text.secondary,
                        '&:hover': {
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                        },
                      }}
                    >
                      Отмена
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  )
}
