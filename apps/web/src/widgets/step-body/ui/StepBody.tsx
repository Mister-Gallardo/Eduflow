import { pick, type Step } from '@eduflow/shared'
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

  const utils = trpc.useUtils()

  const { lastViewedStepId, courseId, stepId, prevStepId, nextStepId, isCourseNavigationLoading } =
    useOutletContext<LearnOutletContext>()

  const {
    data: stepData,
    isLoading: isStepLoading,
    isFetched: isStepFetched,
  } = trpc.learning.getStepData.useQuery({ courseId, stepId }, { enabled: !!stepId })

  useEffect(() => {
    if (
      stepData?.userProgress?.isCompleted &&
      (stepData.step.type === 'TEXT' || stepData.step.type === 'VIDEO')
    ) {
      utils.learning.getCourseNavigation.setData({ courseId }, (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          navigation: oldData.navigation.map((module) => ({
            ...module,
            lessons: module.lessons.map((lesson) => ({
              ...lesson,
              steps: lesson.steps.map((s) =>
                s.id === stepId && !s.isCompleted ? { ...s, isCompleted: true } : s,
              ),
            })),
          })),
        }
      })
    }
  }, [stepData, stepId, courseId, utils])

  useEffect(() => {
    if (stepId || !lastViewedStepId) return

    void navigate(paths.learn.setup(courseId, lastViewedStepId), { replace: true })
  }, [stepId, lastViewedStepId, courseId, navigate])

  if (isCourseNavigationLoading || isStepLoading || !isStepFetched) {
    return <StepContentSkeleton />
  }

  const step = stepData?.step

  if (!step) {
    return <Result404 />
  }

  const stepContent = pick(step, ['type', 'content']) as Step

  return (
    <Box sx={{ py: 3 }}>
      <Typography sx={{ mb: 3, fontSize: 18, fontWeight: 700 }}>{step.title}</Typography>

      <StepRenderer
        step={stepContent}
        courseId={courseId}
        stepId={stepId}
        isCompleted={stepData.userProgress?.isCompleted}
        savedAnswer={stepData.userProgress?.answer}
      />

      <StepNavigation prevStepId={prevStepId} nextStepId={nextStepId} courseId={courseId} />
    </Box>
  )
}
