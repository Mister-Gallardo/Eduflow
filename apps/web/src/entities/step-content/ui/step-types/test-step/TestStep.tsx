import type { TestMultipleContent, TestSingleContent } from '@eduflow/shared'
import { Box, Typography } from '@mui/material'

import { getOptionLetter } from '@/shared/lib/getOptionLetter'
import { stepQuestionStyles } from '@/shared/ui/styles/typography'

import { getIndicatorStyles, getOptionStyles } from '../../../lib'
import { StepOptionIndicator } from '../../step-option-indicator'

import { optionsContainerStyles, optionTextStyles } from './TestStep.styles'

export type TestContent = TestSingleContent | TestMultipleContent

export interface TestStepProps {
  content: TestContent
  testType: 'TEST_SINGLE' | 'TEST_MULTIPLE'
  selectedIds: Set<string>
  isChecked: boolean
  isCorrect?: boolean
  onSelectOption: (optionId: string) => void
}

export const TestStep = ({
  content,
  testType,
  selectedIds,
  isChecked,
  isCorrect,
  onSelectOption,
}: TestStepProps) => {
  const isMultiple = testType === 'TEST_MULTIPLE'

  return (
    <Box>
      <Typography sx={stepQuestionStyles}>{content.question}</Typography>

      <Box sx={optionsContainerStyles}>
        {content.options.map((option, index) => {
          const isSelected = selectedIds.has(option.id)
          const isOptionCorrect = isChecked ? (isSelected ? isCorrect : undefined) : undefined

          return (
            <Box
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              sx={getOptionStyles({ isSelected, isChecked, isCorrect: isOptionCorrect })}
            >
              <Box
                sx={getIndicatorStyles({
                  isSelected,
                  isChecked,
                  isCorrect: isOptionCorrect,
                  variant: isMultiple ? 'square' : 'circle',
                })}
              >
                {getOptionLetter(index)}
              </Box>

              <Typography sx={optionTextStyles}>{option.text}</Typography>

              <StepOptionIndicator
                isVisible={isChecked && isSelected && isOptionCorrect !== undefined}
                isCorrect={isOptionCorrect}
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
