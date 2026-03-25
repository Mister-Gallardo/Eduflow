import type { EditorStepType } from '@eduflow/shared'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import ShortTextIcon from '@mui/icons-material/ShortText'
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined'
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import type { ReactElement } from 'react'

interface AddStepMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  onSelectType: (type: EditorStepType, title: string) => void
}

const STEP_TYPE_OPTIONS: { type: EditorStepType; label: string; icon: ReactElement }[] = [
  { type: 'TEXT', label: 'Текстовый урок', icon: <ArticleOutlinedIcon sx={{ fontSize: 18 }} /> },
  {
    type: 'VIDEO',
    label: 'Видеоурок',
    icon: <OndemandVideoOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    type: 'TEST_SINGLE',
    label: 'Тест (один ответ)',
    icon: <RadioButtonCheckedIcon sx={{ fontSize: 18 }} />,
  },
  {
    type: 'TEST_MULTIPLE',
    label: 'Тест (несколько)',
    icon: <CheckBoxOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    type: 'MATCHING',
    label: 'Соответствие',
    icon: <CompareArrowsIcon sx={{ fontSize: 18 }} />,
  },
  {
    type: 'INPUT_TEXT',
    label: 'Ввод текста',
    icon: <TextFieldsOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    type: 'INPUT_NUMBER',
    label: 'Ввод числа',
    icon: <ShortTextIcon sx={{ fontSize: 18 }} />,
  },
  {
    type: 'FREE_TEXT',
    label: 'Свободный ответ',
    icon: <QuizOutlinedIcon sx={{ fontSize: 18 }} />,
  },
]

export const AddStepMenu = ({ anchorEl, open, onClose, onSelectType }: AddStepMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            minWidth: 200,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
            '& .MuiMenuItem-root': {
              px: 1.5,
              py: 0.75,
              gap: 1,
            },
          },
        },
      }}
    >
      {STEP_TYPE_OPTIONS.map(({ type, label, icon }) => (
        <MenuItem
          key={type}
          onClick={() => {
            onSelectType(type, label)
            onClose()
          }}
        >
          <ListItemIcon sx={{ minWidth: '28px !important', color: 'text.secondary' }}>
            {icon}
          </ListItemIcon>
          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}
