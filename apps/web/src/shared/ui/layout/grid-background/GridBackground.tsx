import { Box } from '@mui/material'

import { gridBackgroundStyles } from './GridBackground.styles'

export const GridBackground = () => (
  <Box sx={gridBackgroundStyles.root}>
    <Box sx={gridBackgroundStyles.image} />
  </Box>
)
