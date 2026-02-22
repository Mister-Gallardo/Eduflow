import type { VideoContent } from '@eduflow/shared'
import { Box } from '@mui/material'

import { iframeStyles } from '@/shared/ui/styles/iframe'

import { getEmbedUrl } from '../../../lib'

interface VideoStepProps {
  content: VideoContent
}

export const VideoStep = ({ content }: VideoStepProps) => {
  const embedUrl = getEmbedUrl(content.url)

  return (
    <Box
      component="iframe"
      src={embedUrl}
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
      title="Step Video Content"
      sx={iframeStyles}
    />
  )
}
