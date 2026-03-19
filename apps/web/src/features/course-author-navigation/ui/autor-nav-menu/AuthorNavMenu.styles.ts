import type { SxProps, Theme } from '@mui/material/styles'

export const AuthorNavMenuStyles: SxProps<Theme> = {
  width: 300,
  borderRadius: 4,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
  mt: -1,
  overflow: 'hidden',
}

export const AuthorNavMenuHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  px: 2,
  py: 1.5,
  borderBottom: '1px solid',
  borderColor: 'divider',
}

export const AuthorNavMenuHeaderIconStyles: SxProps<Theme> = {
  borderRadius: 2,
  bgcolor: (theme) => `${theme.palette.primary.main}0D`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 0.75,
  flex: 0,
}

export const AuthorNavMenuHeaderTitleStyles: SxProps<Theme> = {
  fontSize: 13,
  fontWeight: 600,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  mb: -0.5,
}

export const AuthorNavMenuItemsStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.75,
  px: 1.5,
  py: 1,
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 3,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
}

export const AuthorNavMenuItemIconStyles: SxProps<Theme> = {
  p: 0.75,
  borderRadius: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}
