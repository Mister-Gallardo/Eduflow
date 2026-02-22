import type { VideoContent } from '@eduflow/shared'

import { VideoStep } from '@/entities/step-content/ui/step-types/video-step'

interface SolveVideoStepProps {
  content: VideoContent
}

export const SolveVideoStep = ({ content }: SolveVideoStepProps) => {
  return <VideoStep content={content} />
}
