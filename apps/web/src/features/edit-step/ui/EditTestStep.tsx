import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, Checkbox, IconButton, Radio, TextField, Tooltip, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'

import type { TestOptionDraft } from '../model/use-test-step-form'

interface EditTestStepProps {
  testType: 'TEST_SINGLE' | 'TEST_MULTIPLE'
  question: string
  options: TestOptionDraft[]
  onQuestionChange: (value: string) => void
  onAddOption: () => void
  onRemoveOption: (id: string) => void
  onUpdateOptionText: (id: string, text: string) => void
  /**
   * Переключает правильный ответ.
   * Для TEST_SINGLE — снимает предыдущий и ставит текущий.
   * Для TEST_MULTIPLE — переключает флаг.
   */
  onToggleCorrect: (id: string) => void
}

/**
 * Форма создания/редактирования TestStep для преподавателя.
 * Поддерживает TEST_SINGLE (Radio) и TEST_MULTIPLE (Checkbox).
 */
export const EditTestStep = ({
  testType,
  question,
  options,
  onQuestionChange,
  onAddOption,
  onRemoveOption,
  onUpdateOptionText,
  onToggleCorrect,
}: EditTestStepProps) => {
  const isSingle = testType === 'TEST_SINGLE'

  const handleToggle = (id: string) => {
    if (isSingle) {
      // В single-режиме снимаем с предыдущего и ставим на текущий
      // Логика toggleCorrect в хуке уже это обрабатывает через внешнюю обёртку
    }
    onToggleCorrect(id)
  }

  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Вопрос"
        fullWidth
        multiline
        minRows={2}
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="Введите вопрос..."
      />

      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'text.disabled',
            display: 'block',
            mb: 1.5,
          }}
        >
          Варианты ответов
          <Typography
            component="span"
            sx={{ ml: 1, fontSize: 11, fontWeight: 400, color: 'text.disabled' }}
          >
            {isSingle ? '(один правильный — Radio)' : '(несколько правильных — Checkbox)'}
          </Typography>
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <AnimatePresence initial={false}>
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.15 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    borderRadius: '10px',
                    border: '2px solid',
                    borderColor: (theme) =>
                      option.isCorrect
                        ? (theme.palette.customColors?.green ?? theme.palette.success.main)
                        : 'transparent',
                    backgroundColor: (theme) =>
                      option.isCorrect
                        ? theme.palette.mode === 'dark'
                          ? 'rgba(76, 175, 80, 0.06)'
                          : 'rgba(76, 175, 80, 0.03)'
                        : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <Tooltip
                    title={option.isCorrect ? 'Правильный ответ' : 'Отметить как правильный'}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      {isSingle ? (
                        <Radio
                          size="small"
                          checked={option.isCorrect}
                          onChange={() => handleToggle(option.id)}
                          color="success"
                        />
                      ) : (
                        <Checkbox
                          size="small"
                          checked={option.isCorrect}
                          onChange={() => handleToggle(option.id)}
                          color="success"
                        />
                      )}
                    </Box>
                  </Tooltip>

                  <TextField
                    fullWidth
                    size="small"
                    variant="standard"
                    value={option.text}
                    onChange={(e) => onUpdateOptionText(option.id, e.target.value)}
                    placeholder={`Вариант ${String.fromCharCode(64 + index + 1)}`}
                    slotProps={{
                      input: {
                        disableUnderline: option.isCorrect,
                        sx: {
                          fontSize: 14,
                          fontWeight: option.isCorrect ? 500 : 400,
                        },
                      },
                    }}
                  />

                  <Tooltip title="Удалить вариант">
                    <span>
                      <IconButton
                        size="small"
                        onClick={() => onRemoveOption(option.id)}
                        disabled={options.length <= 2}
                        sx={{ flexShrink: 0, color: 'text.disabled' }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        <Box
          component="button"
          onClick={onAddOption}
          sx={{
            mt: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.5,
            py: 0.75,
            border: '1px dashed',
            borderColor: (theme) => `${theme.palette.primary.main}50`,
            borderRadius: '8px',
            background: 'none',
            cursor: 'pointer',
            color: 'primary.main',
            fontSize: 13,
            fontWeight: 500,
            transition: 'all 0.15s',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
            },
          }}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          Добавить вариант
        </Box>
      </Box>
    </Box>
  )
}
