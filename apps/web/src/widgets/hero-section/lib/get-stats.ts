import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { alpha, type Theme } from '@mui/material/styles'

import type { Metric } from '@/shared/ui/data-display/metric-block/types'

export const getMetrics = (colors: Theme['palette']['customColors']): Metric[] => [
  {
    label: 'Курсов',
    value: '50+',
    icon: MenuBookOutlinedIcon,
    color: colors.indigo,
    bgColor: alpha(colors.indigo, 0.1),
  },
  {
    label: 'Учащихся',
    value: '5К+',
    icon: GroupsOutlinedIcon,
    color: colors.green,
    bgColor: alpha(colors.green, 0.1),
  },
  {
    label: 'Менторов',
    value: '100+',
    icon: WorkspacePremiumOutlinedIcon,
    color: colors.red,
    bgColor: alpha(colors.red, 0.1),
  },
  {
    label: 'Довольны',
    value: '98%',
    icon: EmojiEventsOutlinedIcon,
    color: colors.orange,
    bgColor: alpha(colors.orange, 0.1),
  },
]
