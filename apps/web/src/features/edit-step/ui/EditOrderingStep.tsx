import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'

import type { OrderingItemDraft } from '../model/use-ordering-step-form'

interface EditOrderingStepProps {
  items: OrderingItemDraft[]
  onAddItem: () => void
  onRemoveItem: (id: string) => void
  onUpdateItem: (id: string, value: string) => void
}

/**
 * Форма создания/редактирования OrderingStep для преподавателя.
 *
 * Преподаватель вводит элементы в ПРАВИЛЬНОМ порядке:
 * [1. TextField] [🗑]
 * [2. TextField] [🗑]
 *   ...
 * [+ Добавить элемент]
 *
 * SolveOrderingStep перемешает элементы при показе студенту.
 * Минимум 2 элемента.
 */
export const EditOrderingStep = ({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}: EditOrderingStepProps) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Typography
        variant="caption"
        sx={{
          display: { xs: 'none', sm: 'block' },
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'text.disabled',
          px: 0.5,
        }}
      >
        Элементы (в правильном порядке)
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <AnimatePresence initial={false}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                {/* Номер позиции */}
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'primary.main',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </Box>

                {/* TextField */}
                <TextField
                  size="small"
                  fullWidth
                  value={item.content}
                  onChange={(e) => onUpdateItem(item.id, e.target.value)}
                  placeholder={`Элемент ${index + 1}`}
                  label={`Элемент ${index + 1}`}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                />

                {/* Удалить элемент */}
                <Tooltip title={items.length <= 2 ? 'Минимум 2 элемента' : 'Удалить элемент'}>
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => onRemoveItem(item.id)}
                      disabled={items.length <= 2}
                      sx={{ color: 'text.disabled' }}
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
        onClick={onAddItem}
        sx={{
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
          width: 'fit-content',
          transition: 'all 0.15s',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
          },
        }}
      >
        <AddIcon sx={{ fontSize: 16 }} />
        Добавить элемент
      </Box>

      <Typography variant="caption" sx={{ color: 'text.disabled', mt: -1 }}>
        💡 Студент увидит эти элементы в перемешанном порядке и должен будет восстановить
        правильный.
      </Typography>
    </Box>
  )
}
