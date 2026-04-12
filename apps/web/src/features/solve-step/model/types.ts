import type {
  FreeTextContent,
  MatchingContent,
  StepStatus,
  TestMultipleContent,
  TestSingleContent,
} from '@eduflow/shared'

type TestContent = TestSingleContent | TestMultipleContent

export interface SolveTestStepProps {
  content: TestContent
  testType: 'TEST_SINGLE' | 'TEST_MULTIPLE'
  courseId: string
  stepId: string
  status?: StepStatus
  savedAnswer?: string | string[] | null
}

export interface SolveMatchingStepProps {
  content: MatchingContent
  courseId: string
  stepId: string
  status?: StepStatus
  savedAnswer?: Record<string, string> | null
}

export interface SolveInputStepProps {
  content: { question: string }
  stepType: 'INPUT_TEXT' | 'INPUT_NUMBER'
  courseId: string
  stepId: string
  status?: StepStatus
  savedAnswer?: string | number | null
}

export interface SolveFreeTextStepProps {
  content: FreeTextContent
  courseId: string
  stepId: string
  status?: StepStatus
  savedAnswer?: string | null
  reviewComment?: string | null
}
