import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Box, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

import { MotionPaper } from '@/shared/ui/animations/motion'

import { createCourseCardStyles } from './CreateCourseCard.styles'

export const CreateCourseCard = ({ onClick }: { onClick: () => void }) => {
  const theme = useTheme()

  return (
    <MotionPaper
      elevation={0}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      onClick={onClick}
      sx={createCourseCardStyles}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <Box
        sx={{
          mb: 2,
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <AddCircleOutlineOutlinedIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 16, mb: 0.5, textAlign: 'center' }}>
        Создать новый курс
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        Добавьте модули, уроки и задания
      </Typography>
    </MotionPaper>
  )
}
