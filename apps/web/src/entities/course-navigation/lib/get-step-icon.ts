import type { StepType } from '@eduflow/shared'
import {
  BrowserNotSupportedOutlined,
  CompareArrowsOutlined,
  CreateOutlined,
  DescriptionOutlined,
  EditOutlined,
  FactCheckOutlined,
  FormatListNumberedOutlined,
  LooksOneOutlined,
  PlayCircleOutline,
  QuizOutlined,
  ShortTextOutlined,
} from '@mui/icons-material'

const STEP_ICONS: Record<StepType | 'DEFAULT', React.ElementType> = {
  TEXT: DescriptionOutlined,
  VIDEO: PlayCircleOutline,
  TEST_SINGLE: QuizOutlined,
  TEST_MULTIPLE: FactCheckOutlined,
  MATCHING: CompareArrowsOutlined,
  ORDERING: FormatListNumberedOutlined,
  INPUT_TEXT: EditOutlined,
  INPUT_NUMBER: LooksOneOutlined,
  FREE_TEXT: CreateOutlined,
  FILL_GAPS: ShortTextOutlined,
  DEFAULT: BrowserNotSupportedOutlined,
} as const

export const getStepIcon = (stepType: StepType) => {
  const StepIcon = STEP_ICONS[stepType] || STEP_ICONS.DEFAULT

  return StepIcon
}
