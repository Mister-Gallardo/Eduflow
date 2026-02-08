import { Box, Typography } from '@mui/material'

import { empty } from '@/shared/assets'

export const NotFound = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: { xs: 6, md: 10 },
      textAlign: 'center',
    }}
  >
    <Box
      component="img"
      src={empty}
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
