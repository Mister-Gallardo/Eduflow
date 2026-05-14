import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { OrderingContent } from '@eduflow/shared'
import { Box } from '@mui/material'

import { SortableItem } from './components'
import { orderingContainerStyles } from './OrderingStep.styles'

export interface OrderingStepProps {
  content: OrderingContent
  /** Текущий порядок id элементов */
  orderedIds: string[]
  isChecked: boolean
  isCorrect?: boolean
}

export const OrderingStep = ({ content, orderedIds, isChecked, isCorrect }: OrderingStepProps) => {
  return (
    <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
      <Box sx={orderingContainerStyles}>
        {orderedIds.map((id, index) => {
          const item = content.items.find((i) => i.id === id)
          if (!item) return null

          return (
            <SortableItem
              key={id}
              id={id}
              content={item.content}
              index={index}
              isChecked={isChecked}
              isCorrect={isChecked ? isCorrect : undefined}
            />
          )
        })}
      </Box>
    </SortableContext>
  )
}
