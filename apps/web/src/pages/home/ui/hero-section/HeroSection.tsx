import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { alpha, Box, Button, Typography, useTheme } from '@mui/material'

import onlineLearningImg from '@/shared/assets/images/online-learning.svg'
import { blobStyles, MotionBox } from '@/shared/ui'

import {
  heroSectionStyles,
  imageContainerStyles,
  imageStyles,
  promoBadgeStyles,
  titleStyles,
} from './HeroSection.styles'

export const HeroSection = () => {
  const theme = useTheme()
  const colors = theme.palette.customColors
  const primary = theme.palette.primary

  return (
    <Box sx={heroSectionStyles}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'stretch', sm: 'center', md: 'flex-start' },
          gap: 4,
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={promoBadgeStyles}
        >
          <AutoAwesomeOutlinedIcon
            sx={{
              fontSize: 16,
              color: 'secondary.main',
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: 'primary.main',
              lineHeight: 1,
            }}
          >
            Новые курсы каждую неделю
          </Typography>
        </MotionBox>

        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography component="h1" sx={titleStyles}>
              Учитесь у лучших.
              <br />
              <Box component="span" sx={{ color: alpha(primary.main, 0.6) }}>
                Станьте лучше.
              </Box>
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: alpha(primary.main, 0.8),
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.6,
              }}
            >
              Интерактивные курсы от экспертов индустрии. <br /> Практические задания с обратной
              связью.
            </Typography>
          </MotionBox>
        </Box>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            component="a"
            href="#course-catalog"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: { xs: '100%', md: 'auto' },
              px: 5,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Начать обучение
          </Button>
        </MotionBox>
      </Box>

      <MotionBox
        initial={{ opacity: 0, scale: 0.95, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        sx={{
          maxWidth: { xs: '100%', sm: 450, lg: 500, xl: 600 },
          position: 'relative',
        }}
      >
        <Box sx={imageContainerStyles}>
          <Box
            sx={{
              ...blobStyles,
              top: '-10%',
              left: '-15%',
              background: `radial-gradient(circle, ${colors.red} 0%, transparent 35%)`,
            }}
          />

          <Box
            sx={{
              ...blobStyles,
              top: '-20%',
              right: '-15%',
              background: `radial-gradient(circle, ${colors.green} 0%, transparent 45%)`,
            }}
          />

          <Box
            sx={{
              ...blobStyles,
              bottom: '-20%',
              right: '-15%',
              background: `radial-gradient(circle, ${colors.orange} 0%, transparent 35%)`,
            }}
          />

          <Box
            sx={{
              ...blobStyles,
              bottom: '-20%',
              left: '-10%',
              background: `radial-gradient(circle, ${colors.indigo} 0%, transparent 25%)`,
            }}
          />

          <Box component="img" src={onlineLearningImg} alt="Онлайн-обучение" sx={imageStyles} />
        </Box>
      </MotionBox>
    </Box>
  )
}
