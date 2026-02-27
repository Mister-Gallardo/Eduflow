import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import animatedLogoImg from '../../../assets/images/animated_logo.svg'
import logoImg from '../../../assets/images/logo.svg'

import { logoStyles } from './Logo.styles'

interface LogoProps {
  size: 'extraSmall' | 'small' | 'medium' | 'large'
  isClickable?: boolean
  isAnimated?: boolean
  showText?: boolean
  scale?: number
}

export const Logo = ({
  size,
  isClickable = false,
  isAnimated = false,
  showText = true,
}: LogoProps) => {
  const height = {
    extraSmall: 32,
    small: 40,
    medium: 45,
    large: 60,
  }[size]

  const fontSize = {
    extraSmall: 20,
    small: 24,
    medium: 28,
    large: 38,
  }[size]

  return (
    <Box
      component={isClickable ? Link : 'div'}
      to={isClickable ? '/' : undefined}
      sx={{
        ...logoStyles,
        cursor: isClickable ? 'pointer' : 'default',
      }}
    >
      {isAnimated ? (
        <Box component="img" src={animatedLogoImg} height={height} alt="Логотип Eduflow" />
      ) : (
        <Box component="img" src={logoImg} height={height} alt="Логотип Eduflow" />
      )}
      {showText && (
        <Typography
          component="h1"
          fontFamily="Outfit, Inter, sans-serif"
          sx={{ fontSize: `${fontSize}px`, fontWeight: 600 }}
        >
          Eduflow
        </Typography>
      )}
    </Box>
  )
}
