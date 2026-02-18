import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import pageNotFoundImg from '@/shared/assets/images/page-not-found.svg'
import { paths } from '@/shared/config/paths'
import { useIsMobile } from '@/shared/lib/useIsMobile'

import { result404Styles } from './Result404.styles'

export const Result404 = () => {
  const isMobile = useIsMobile()

  return (
    <Box sx={result404Styles}>
      <Box
        component="img"
        src={pageNotFoundImg}
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
