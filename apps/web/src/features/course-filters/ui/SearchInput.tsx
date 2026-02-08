import { Clear, Search } from '@mui/icons-material'
import { alpha, IconButton, InputAdornment, TextField, useTheme } from '@mui/material'
import { useRef } from 'react'

interface CourseFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const SearchInput = ({ searchQuery, onSearchChange }: CourseFiltersProps) => {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = () => {
    onSearchChange('')
    inputRef.current?.focus()
  }

  return (
    <TextField
      inputRef={inputRef}
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Найти курс..."
      size="small"
      sx={{
        flex: { md: 1 },
        minWidth: { xs: 'auto', md: 400 },
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          '& fieldset': {
            border: 'none',
          },
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.06),
          },
          '&.Mui-focused': {
            bgcolor: alpha(theme.palette.primary.main, 0.06),
          },
        },
        '& .MuiInputBase-input': {
          py: 1.25,
          fontSize: 14,
          fontWeight: 500,
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{
                  p: 0.5,
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <Clear sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  )
}
