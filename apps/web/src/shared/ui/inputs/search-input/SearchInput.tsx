import { Clear, Search } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { useRef } from 'react'

import { searchInputStyles } from './SearchInput.styles'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  sx?: SxProps<Theme>
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Поиск...',
  sx,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <TextField
      inputRef={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      size="small"
      sx={{ ...searchInputStyles, ...sx } as SxProps<Theme>}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: value ? (
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
