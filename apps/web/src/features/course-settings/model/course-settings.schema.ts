import { zUpdateCourseInput } from '@eduflow/shared'
import type { z } from 'zod'

export type CourseSettingsFormSchema = z.infer<typeof zUpdateCourseInput>
export type CourseSettingsFormInput = z.input<typeof zUpdateCourseInput>
export { zUpdateCourseInput as courseSettingsFormSchema }
