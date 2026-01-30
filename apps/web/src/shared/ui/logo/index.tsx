import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { animated_logo, logo } from '../../assets'

interface LogoProps {
  size: 'small' | 'medium' | 'large'
  isClickable?: boolean
  isAnimated?: boolean
}

export const Logo = ({ size, isClickable = false, isAnimated = false }: LogoProps) => {
  const height = {
    small: 35,
    medium: 45,
    large: 55,
  }[size]

  const fontSize = {
    small: 22,
    medium: 28,
    large: 36,
  }[size]

  return (
    <Box
      component={isClickable ? Link : 'div'}
      to={isClickable ? '/' : undefined}
      sx={{
        justifySelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        cursor: isClickable ? 'pointer' : 'default',
      }}
    >
      {isAnimated ? (
        <Box component="img" src={animated_logo} height={height} />
      ) : (
        <Box component="img" src={logo} height={height} />
      )}
      <Typography
        component="h1"
        fontFamily="Outfit, Inter, sans-serif"
        sx={{ fontSize: `${fontSize}px`, fontWeight: '600' }}
      >
        Eduflow
      </Typography>
    </Box>
  )
}
