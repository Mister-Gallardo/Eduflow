import type { MatchingContent, TestMultipleContent, TestSingleContent } from '@eduflow/shared'

type TestContent = TestSingleContent | TestMultipleContent

export interface SolveTestStepProps {
  content: TestContent
  testType: 'TEST_SINGLE' | 'TEST_MULTIPLE'
  courseId: string
  stepId: string
  isCompleted?: boolean
  savedAnswer?: string | string[] | null
}

export interface SolveMatchingStepProps {
  content: MatchingContent
  courseId: string
  stepId: string
  isCompleted?: boolean
  savedAnswer?: Record<string, string> | null
}

export interface SolveInputStepProps {
  content: { question: string }
  stepType: 'INPUT_TEXT' | 'INPUT_NUMBER'
  courseId: string
  stepId: string
  isCompleted?: boolean
  savedAnswer?: string | number | null
}
