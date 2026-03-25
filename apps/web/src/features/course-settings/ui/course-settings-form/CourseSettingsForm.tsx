import { COURSE_CATEGORIES, COURSE_LEVELS } from '@eduflow/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { trpc } from '@/shared/api/trpc'
import { messages } from '@/shared/config/messages'
import { paths } from '@/shared/config/paths'
import { useSnackbar } from '@/shared/ui/feedback/snackbar'

import type { CourseSettingsFormInput, CourseSettingsFormSchema } from '../../model'
import { courseSettingsFormSchema } from '../../model'

import {
  dialogActionsStyles,
  dialogContentStyles,
  dialogPaperStyles,
  dialogSubtitleStyles,
  dialogTitleStyles,
  fieldLabelStyles,
  rowFieldsStyles,
} from './CourseSettingsForm.styles'

// ─── Constants ───

const CATEGORY_LABELS: Record<(typeof COURSE_CATEGORIES)[number], string> = {
  DEVELOPMENT: 'Разработка',
  DESIGN: 'Дизайн',
  ANALYTICS: 'Аналитика',
  MARKETING: 'Маркетинг',
}

const LEVEL_LABELS: Record<(typeof COURSE_LEVELS)[number], string> = {
  BEGINNER: 'Начинающий',
  INTERMEDIATE: 'Средний',
  ADVANCED: 'Продвинутый',
}

// ─── Types ───

interface CourseSettingsFormBaseProps {
  open: boolean
  onClose: () => void
}

interface CourseSettingsFormEditProps extends CourseSettingsFormBaseProps {
  mode?: 'edit'
  defaultValues: CourseSettingsFormInput
}

interface CourseSettingsFormCreateProps extends CourseSettingsFormBaseProps {
  mode: 'create'
  defaultValues?: undefined
}

type CourseSettingsFormProps = CourseSettingsFormEditProps | CourseSettingsFormCreateProps

// ─── Default values for create mode ───

const CREATE_DEFAULTS: CourseSettingsFormInput = {
  id: '',
  title: '',
  description: '',
  price: '',
  duration: '',
  level: 'BEGINNER',
  category: 'DEVELOPMENT',
}

// ─── Component ───

export const CourseSettingsForm = (props: CourseSettingsFormProps) => {
  const { open, onClose, mode = 'edit' } = props
  const isCreate = mode === 'create'

  const showSnackbar = useSnackbar()
  const utils = trpc.useUtils()
  const navigate = useNavigate()

  const updateMutation = trpc.courses.update.useMutation({
    onSuccess: () => {
      const editProps = props as CourseSettingsFormEditProps
      void utils.teach.getCourses.invalidate()
      void utils.teach.getCourseById.invalidate({ courseId: editProps.defaultValues.id })
      showSnackbar({ message: 'Настройки курса сохранены', severity: 'success' })
      onClose()
    },
    onError: () => {
      showSnackbar({ message: messages.genericError, severity: 'error' })
    },
  })

  const createMutation = trpc.teach.editor.createCourse.useMutation({
    onSuccess: (data) => {
      void utils.teach.getCourses.invalidate()
      showSnackbar({ message: 'Курс успешно создан.', severity: 'success' })
      onClose()
      void navigate(paths.course.edit(data.id))
    },
    onError: () => {
      showSnackbar({ message: messages.genericError, severity: 'error' })
    },
  })

  const isPending = isCreate ? createMutation.isPending : updateMutation.isPending

  const formDefaults = isCreate
    ? CREATE_DEFAULTS
    : (props as CourseSettingsFormEditProps).defaultValues

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CourseSettingsFormInput>({
    resolver: zodResolver(courseSettingsFormSchema),
    defaultValues: formDefaults,
  })

  const onSubmit = (data: CourseSettingsFormInput) => {
    const validatedData = data as unknown as CourseSettingsFormSchema
    if (isCreate) {
      createMutation.mutate({
        title: validatedData.title,
        description: validatedData.description,
        price: validatedData.price,
        duration: validatedData.duration,
        level: validatedData.level,
        category: validatedData.category,
      })
    } else {
      updateMutation.mutate(validatedData)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: dialogPaperStyles }} fullWidth>
      <DialogTitle sx={dialogTitleStyles}>
        {isCreate ? 'Создание курса' : 'Настройки курса'}
      </DialogTitle>
      <Typography sx={dialogSubtitleStyles}>Основная информация о курсе</Typography>

      <Box component="form" id="course-settings-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={dialogContentStyles}>
          {/* Title */}
          <Box>
            <Typography sx={fieldLabelStyles}>Название курса</Typography>
            <TextField
              {...register('title')}
              fullWidth
              placeholder="Введите название курса"
              error={!!errors.title}
              helperText={errors.title?.message}
              size="small"
            />
          </Box>

          {/* Description */}
          <Box>
            <Typography sx={fieldLabelStyles}>Описание</Typography>
            <TextField
              {...register('description')}
              fullWidth
              multiline
              minRows={3}
              maxRows={6}
              placeholder="Опишите ваш курс"
              error={!!errors.description}
              helperText={errors.description?.message}
              size="small"
            />
          </Box>

          {/* Category + Level */}
          <Box sx={rowFieldsStyles}>
            <Box>
              <Typography sx={fieldLabelStyles}>Категория</Typography>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    size="small"
                  >
                    {COURSE_CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {CATEGORY_LABELS[cat]}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
            <Box>
              <Typography sx={fieldLabelStyles}>Уровень</Typography>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    error={!!errors.level}
                    helperText={errors.level?.message}
                    size="small"
                  >
                    {COURSE_LEVELS.map((lvl) => (
                      <MenuItem key={lvl} value={lvl}>
                        {LEVEL_LABELS[lvl]}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Box>

          {/* Price + Duration */}
          <Box sx={rowFieldsStyles}>
            <Box>
              <Typography sx={fieldLabelStyles}>Цена</Typography>
              <TextField
                {...register('price')}
                type="number"
                fullWidth
                placeholder="0"
                error={!!errors.price}
                helperText={errors.price?.message}
                size="small"
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                  },
                }}
              />
            </Box>
            <Box>
              <Typography sx={fieldLabelStyles}>Продолжительность</Typography>
              <TextField
                {...register('duration')}
                type="number"
                fullWidth
                placeholder="0"
                error={!!errors.duration}
                helperText={errors.duration?.message}
                size="small"
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end">часов</InputAdornment>,
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={dialogActionsStyles}>
          <Button onClick={onClose} variant="outlined" disabled={isPending} sx={{ px: 3 }}>
            Отмена
          </Button>
          <Button
            type="submit"
            form="course-settings-form"
            variant="contained"
            disabled={isPending}
            sx={{ px: 3 }}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
