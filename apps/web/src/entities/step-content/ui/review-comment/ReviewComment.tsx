import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import { Box, Typography } from '@mui/material'

import {
  reviewCommentContainerStyles,
  reviewCommentIconStyles,
  reviewCommentLabelStyles,
  reviewCommentTextStyles,
} from './ReviewComment.styles'

interface ReviewCommentProps {
  comment: string
}

export const ReviewComment = ({ comment }: ReviewCommentProps) => (
  <Box sx={reviewCommentContainerStyles}>
    <RateReviewOutlinedIcon sx={reviewCommentIconStyles} />
    <Box>
      <Typography sx={reviewCommentLabelStyles}>Комментарий преподавателя</Typography>
      <Typography sx={reviewCommentTextStyles}>{comment}</Typography>
    </Box>
  </Box>
)
