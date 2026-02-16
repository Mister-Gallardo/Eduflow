import { Clear, Search } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useRef } from 'react'

import { searchInputStyles } from './SearchInput.styles'

interface CourseFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const SearchInput = ({ searchQuery, onSearchChange }: CourseFiltersProps) => {
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
      sx={searchInputStyles}
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
