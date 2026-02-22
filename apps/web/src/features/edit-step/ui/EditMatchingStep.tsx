import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'

import type { MatchingPairDraft } from '../model/use-matching-step-form'

interface EditMatchingStepProps {
  pairs: MatchingPairDraft[]
  onAddPair: () => void
  onRemovePair: (id: string) => void
  onUpdateLeft: (id: string, value: string) => void
  onUpdateRight: (id: string, value: string) => void
}

/**
 * Форма создания/редактирования MatchingStep для преподавателя.
 *
 * Преподаватель вводит ПРАВИЛЬНЫЕ пары:
 * [Left TextField] ←→ [Right TextField]
 *
 * SolveMatchingStep перемешает правую колонку при показе студенту.
 * Минимум 2 пары.
 */
export const EditMatchingStep = ({
  pairs,
  onAddPair,
  onRemovePair,
  onUpdateLeft,
  onUpdateRight,
}: EditMatchingStepProps) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr auto' },
          gap: { xs: 0, sm: 1 },
          mb: -1,
          px: { xs: 0, sm: 0.5 },
        }}
      >
        {[
          { label: 'Левая часть', xs: true },
          { label: '', xs: false },
          { label: 'Правая часть (правильное соответствие)', xs: true },
          { label: '', xs: false },
        ].map((col, i) =>
          col.label ? (
            <Typography
              key={i}
              variant="caption"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'text.disabled',
              }}
            >
              {col.label}
            </Typography>
          ) : (
            <Box key={i} sx={{ display: { xs: 'none', sm: 'block' } }} />
          ),
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <AnimatePresence initial={false}>
          {pairs.map((pair, index) => (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr auto' },
                  gridTemplateRows: { xs: 'auto auto auto', sm: 'auto' },
                  alignItems: 'center',
                  gap: { xs: 1, sm: 1.5 },
                }}
              >
                {/* Левый TextField */}
                <TextField
                  size="small"
                  fullWidth
                  value={pair.left}
                  onChange={(e) => onUpdateLeft(pair.id, e.target.value)}
                  placeholder={`Левый элемент ${index + 1}`}
                  label={`Левый элемент ${index + 1}`}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                />

                {/* Иконка-разделитель */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'text.disabled',
                    // На мобилке показываем стрелку вниз, на десктопе — двойную стрелку
                    '& .icon-desktop': { display: { xs: 'none', sm: 'flex' } },
                    '& .icon-mobile': { display: { xs: 'flex', sm: 'none' } },
                  }}
                >
                  <SyncAltIcon className="icon-desktop" sx={{ fontSize: 18 }} />
                  <KeyboardArrowDownIcon className="icon-mobile" sx={{ fontSize: 18 }} />
                </Box>

                {/* Правый TextField */}
                <TextField
                  size="small"
                  fullWidth
                  value={pair.right}
                  onChange={(e) => onUpdateRight(pair.id, e.target.value)}
                  placeholder={`Правый элемент ${index + 1}`}
                  label={`Правый элемент ${index + 1}`}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                />

                {/* Удалить пару */}
                <Tooltip title={pairs.length <= 2 ? 'Минимум 2 пары' : 'Удалить пару'}>
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => onRemovePair(pair.id)}
                      disabled={pairs.length <= 2}
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
        onClick={onAddPair}
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
        Добавить пару
      </Box>

      <Typography variant="caption" sx={{ color: 'text.disabled', mt: -1 }}>
        💡 Студент увидит перемешанные правые элементы и должен будет сопоставить их с левыми.
      </Typography>
    </Box>
  )
}
