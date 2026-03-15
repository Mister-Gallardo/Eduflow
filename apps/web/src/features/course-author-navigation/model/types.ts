export type AuthorMenuActiveItem = 'edit' | 'preview'

export interface AuthorNavButtonProps {
  courseId: string
  courseTitle: string
  activeItem: AuthorMenuActiveItem
  stepId?: string
}
