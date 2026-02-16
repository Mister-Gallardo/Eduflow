import { Box, Typography } from '@mui/material'

import emptyStateImg from '@/shared/assets/images/empty.svg'

import { emptyStateStyles } from './EmptyState.styles'

export const EmptyState = () => (
  <Box sx={emptyStateStyles}>
    <Box
      component="img"
      src={emptyStateImg}
      alt="Ничего не найдено"
      sx={{
        width: { xs: 200, md: 240 },
        height: 'auto',
        mb: 3,
        opacity: 0.8,
      }}
    />
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: 'text.primary',
        mb: 1,
      }}
    >
      Курсы не найдены
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
      Попробуйте изменить параметры поиска или выберите другую категорию
    </Typography>
  </Box>
)
