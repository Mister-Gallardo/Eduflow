import type { TextContent } from '@eduflow/shared'
import { Box } from '@mui/material'

import { textStepStyles } from './TextStep.styles'

interface TextStepProps {
  content: TextContent
}

export const TextStep = ({ content }: TextStepProps) => {
  return <Box sx={textStepStyles} dangerouslySetInnerHTML={{ __html: content.html }} />
}
