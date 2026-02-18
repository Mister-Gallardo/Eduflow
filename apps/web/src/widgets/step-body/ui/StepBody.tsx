import { pick, type StepContent } from '@eduflow/shared'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import type { LearnOutletContext } from '@/entities/course-navigation'
import { StepNavigation } from '@/entities/course-navigation'
import { StepContentSkeleton, StepRenderer } from '@/entities/step-content'
import { trpc } from '@/shared/api/trpc'
import { paths } from '@/shared/config/paths'
import { Result404 } from '@/shared/ui/feedback/result-404'

export const StepBody = () => {
  const navigate = useNavigate()

  const {
    lastViewedStepId,
    courseId,
    stepId,
    prevStepId,
    nextStepId,
    isCourseNavigationLoading,
    firstStepData,
  } = useOutletContext<LearnOutletContext>()

  // Use firstStepData as initialData when the step matches lastViewedStepId (first load)
  const isFirstStep = firstStepData?.step?.id === stepId

  const {
    data: stepData,
    isLoading: isStepLoading,
    isFetched: isStepFetched,
  } = trpc.learning.getStepData.useQuery(
    { courseId, stepId },
    {
      enabled: !!stepId && !isFirstStep,
    },
  )

  // Use pre-fetched data for the first step, otherwise use the query result
  const resolvedStepData = isFirstStep ? firstStepData : stepData

  useEffect(() => {
    if (stepId || !lastViewedStepId) return

    void navigate(paths.learn.setup(courseId, lastViewedStepId), { replace: true })
  }, [stepId, lastViewedStepId, courseId, navigate])

  if (isCourseNavigationLoading || (!isFirstStep && (isStepLoading || !isStepFetched))) {
    return <StepContentSkeleton />
  }

  if (!resolvedStepData?.step) {
    return <Result404 />
  }

  const { step } = resolvedStepData
  const stepContent = pick(step, ['type', 'content']) as StepContent

  return (
    <Box sx={{ py: 4 }}>
      <Typography sx={{ fontSize: 34, fontWeight: 700 }}>{step.title}</Typography>

      <StepRenderer step={stepContent} />

      <StepNavigation prevStepId={prevStepId} nextStepId={nextStepId} courseId={courseId} />
    </Box>
  )
}
