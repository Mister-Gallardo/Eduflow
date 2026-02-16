import type { TextContent } from '@eduflow/shared'
import { Box } from '@mui/material'

interface TextStepProps {
  data: TextContent
}

export const TextStep = ({ data }: TextStepProps) => {
  return (
    <Box
      sx={
        {
          // '& h1': { typography: 'h4', mb: 2 },
          // '& h2': { typography: 'h5', mb: 1.5 },
          // '& p': { typography: 'body1', mb: 1, color: 'text.secondary' },
          // '& ul': { pl: 3, mb: 2 },
        }
      }
      dangerouslySetInnerHTML={{ __html: data.html }}
    />
  )
}
