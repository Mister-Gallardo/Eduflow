import type { StepType } from '@eduflow/shared'
import {
  ArticleOutlined,
  CheckBoxOutlined,
  CompareArrowsOutlined,
  EditNoteOutlined,
  HelpOutline,
  PinOutlined,
  PlayCircleOutline,
  RadioButtonCheckedOutlined,
  ReorderOutlined,
  SpaceBarOutlined,
  TextFieldsOutlined,
} from '@mui/icons-material'

const STEP_ICONS: Record<StepType | 'DEFAULT', React.ElementType> = {
  TEXT: ArticleOutlined,
  VIDEO: PlayCircleOutline,
  TEST_SINGLE: RadioButtonCheckedOutlined,
  TEST_MULTIPLE: CheckBoxOutlined,
  MATCHING: CompareArrowsOutlined,
  ORDERING: ReorderOutlined,
  INPUT_TEXT: TextFieldsOutlined,
  INPUT_NUMBER: PinOutlined,
  FREE_TEXT: EditNoteOutlined,
  FILL_GAPS: SpaceBarOutlined,
  DEFAULT: HelpOutline,
} as const

export const getStepIcon = (stepType: StepType) => {
  return STEP_ICONS[stepType] || STEP_ICONS.DEFAULT
}
