import analyticsImg from '@/shared/assets/images/analytics.svg'
import designImg from '@/shared/assets/images/design.svg'
import marketingImg from '@/shared/assets/images/marketing.svg'
import programmingImg from '@/shared/assets/images/programming.svg'

const CATEGORY_GRADIENTS: Record<string, string> = {
  development: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  design: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  analytics: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  marketing: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
}

export const getCategoryGradient = (category: string): string =>
  CATEGORY_GRADIENTS[category.toLowerCase()] ?? CATEGORY_GRADIENTS.development

const CATEGORY_IMAGES: Record<string, string> = {
  development: programmingImg,
  design: designImg,
  analytics: analyticsImg,
  marketing: marketingImg,
}

export const getCategoryImg = (category: string): string =>
  CATEGORY_IMAGES[category.toLowerCase()] ?? programmingImg

const CATEGORY_LABELS: Record<string, string> = {
  development: 'Программирование',
  design: 'Дизайн',
  analytics: 'Data Science',
  marketing: 'Маркетинг',
}

export const getCategoryLabel = (category: string): string =>
  CATEGORY_LABELS[category.toLowerCase()] ?? category
