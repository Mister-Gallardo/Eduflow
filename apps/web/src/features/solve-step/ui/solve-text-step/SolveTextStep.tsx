import type { TextContent } from '@eduflow/shared'

import { TextStep } from '@/entities/step-content/ui/step-types/text-step'

interface SolveTextStepProps {
  content: TextContent
}

export const SolveTextStep = ({ content }: SolveTextStepProps) => {
  return <TextStep content={content} />
}
