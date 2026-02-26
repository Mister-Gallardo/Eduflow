import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'

import { getCategoryGradient, getCategoryImg } from '../../lib'

import { courseImageStyles, getBlobStyles, illustrationStyles } from './CourseImage.styles'

interface CourseImageProps {
  category: string
  variant?: 'default' | 'card'
  sx?: SxProps<Theme>
  children?: React.ReactNode
}

export const CourseImage = ({ category, variant = 'default', sx, children }: CourseImageProps) => {
  const blobs = getBlobStyles(variant)

  return (
    <Box
      sx={
        {
          ...courseImageStyles,
          ...sx,
          background: getCategoryGradient(category),
        } as SxProps<Theme>
      }
    >
      <Box sx={blobs.first} />
      <Box sx={blobs.second} />

      <Box
        className="course-illustration"
        component="img"
        src={getCategoryImg(category)}
        alt={category}
        sx={illustrationStyles(variant)}
      />

      {children}
    </Box>
  )
}
