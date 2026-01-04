export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info'

export interface SnackbarOptions {
  message: React.ReactNode
  severity: SnackbarSeverity
}
