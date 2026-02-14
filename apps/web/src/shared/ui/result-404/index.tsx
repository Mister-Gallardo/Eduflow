import { Box, Button, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

import { page_not_found } from '@/shared/assets'
import { paths } from '@/shared/config'
import { useIsMobile } from '@/shared/lib'

export const Result404 = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const headerHeight = isMobile
    ? theme.layout.headerHeight.mobile
    : theme.layout.headerHeight.desktop

  return (
    <Box
      sx={{
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: 500,
        maxHeight: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: {
          xs: 1.5,
          sm: 3,
        },
      }}
    >
      <Box
        component="img"
        src={page_not_found}
        alt="Страница не найдена"
        sx={{
          width: { xs: '80%', md: '40%' },
          maxWidth: 400,
          mb: 3,
        }}
      />
      <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={600} mb={1} color="text.primary">
        Страница не найдена
      </Typography>
      <Typography variant={isMobile ? 'body1' : 'body2'} color="text.secondary" mb={3}>
        Такой страницы не существует или она была перемещена.
      </Typography>
      <Button
        component={Link}
        to={paths.home()}
        variant="outlined"
        aria-label="Перейти на главную"
        sx={{
          px: 8,
          py: 1,
          color: 'text.primary',
          borderColor: 'primary.main',
        }}
      >
        На главную
      </Button>
    </Box>
  )
}
