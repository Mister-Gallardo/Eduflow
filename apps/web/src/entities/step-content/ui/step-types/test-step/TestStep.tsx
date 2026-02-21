import type { TestMultipleContent, TestSingleContent } from '@eduflow/shared'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { trpc } from '@/shared/api/trpc'
import { getOptionLetter } from '@/shared/lib/getOptionLetter'

import { getIndicatorStyles, getOptionStyles } from '../../../lib'
import { StepCheckActions } from '../../step-result-actions'

import { optionsContainerStyles, optionTextStyles, questionStyles } from './TestStep.styles'

type TestContent = TestSingleContent | TestMultipleContent

interface TestStepProps {
  content: TestContent
  testType: 'TEST_SINGLE' | 'TEST_MULTIPLE'
  courseId: string
  stepId: string
  isCompleted?: boolean
  savedAnswer?: string | string[] | null
}

export const TestStep = ({
  content,
  testType,
  courseId,
  stepId,
  isCompleted = false,
  savedAnswer,
}: TestStepProps) => {
  const isMultiple = testType === 'TEST_MULTIPLE'

  const initialSelection = Array.isArray(savedAnswer)
    ? savedAnswer
    : savedAnswer
      ? [savedAnswer]
      : []

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelection))
  const [isChecked, setIsChecked] = useState(isCompleted)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(isCompleted)

  const utils = trpc.useUtils()

  const checkStepMutation = trpc.learning.checkStep.useMutation({
    onSuccess: (data) => {
      setIsChecked(true)
      setIsCorrectAnswer(data.isCorrect)
      if (data.isCorrect) {
        void utils.learning.getCourseNavigation.invalidate({ courseId })
      }
    },
  })

  const handleSelect = (optionId: string) => {
    if (isChecked) return

    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (isMultiple) {
        if (next.has(optionId)) next.delete(optionId)
        else next.add(optionId)
      } else {
        next.clear()
        next.add(optionId)
      }
      return next
    })
  }

  const handleCheck = () => {
    if (selectedIds.size === 0 || checkStepMutation.isPending) return
    const answer = isMultiple ? [...selectedIds] : [...selectedIds][0]
    checkStepMutation.mutate({ courseId, stepId, answer })
  }

  const handleRetry = () => {
    setSelectedIds(new Set())
    setIsChecked(false)
    setIsCorrectAnswer(false)
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography sx={questionStyles}>{content.question}</Typography>

      <Box sx={optionsContainerStyles}>
        {content.options.map((option, index) => {
          const isSelected = selectedIds.has(option.id)
          const isCorrect = isChecked ? (isSelected ? isCorrectAnswer : undefined) : undefined

          return (
            <Box
              key={option.id}
              onClick={() => handleSelect(option.id)}
              sx={getOptionStyles({ isSelected, isChecked, isCorrect })}
            >
              <Box
                sx={getIndicatorStyles({
                  isSelected,
                  isChecked,
                  isCorrect,
                  variant: isMultiple ? 'square' : 'circle',
                })}
              >
                {getOptionLetter(index)}
              </Box>

              <Typography sx={optionTextStyles}>{option.text}</Typography>

              {isChecked && isSelected && (
                <Box sx={{ ml: 'auto', display: 'flex' }}>
                  {isCorrect ? (
                    <CheckCircleOutlinedIcon
                      sx={{ fontSize: 24, color: (theme) => theme.palette.customColors.green }}
                    />
                  ) : (
                    <CancelOutlinedIcon
                      sx={{ fontSize: 24, color: (theme) => theme.palette.customColors.red }}
                    />
                  )}
                </Box>
              )}
            </Box>
          )
        })}
      </Box>

      <StepCheckActions
        canCheck={selectedIds.size > 0}
        isPending={checkStepMutation.isPending}
        isChecked={isChecked}
        isCorrect={isCorrectAnswer}
        onCheck={handleCheck}
        onRetry={handleRetry}
      />
    </Box>
  )
}
