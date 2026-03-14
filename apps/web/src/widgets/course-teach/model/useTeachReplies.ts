import { trpc } from '@/shared/api/trpc'
import { useDebounce } from '@/shared/lib/useDebounce'

export function useTeachReplies(statusFilter: string, search: string) {
  const debouncedSearch = useDebounce(search, 300)

  const pendingQuery = trpc.teach.getPendingReplies.useInfiniteQuery(
    {
      search: debouncedSearch || undefined,
      limit: 20,
    },
    {
      enabled: statusFilter !== 'REVIEWED',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: undefined,
    },
  )

  const reviewedQuery = trpc.teach.getReviewedReplies.useInfiniteQuery(
    {
      search: debouncedSearch || undefined,
      limit: 20,
    },
    {
      enabled: statusFilter !== 'PENDING',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: undefined,
    },
  )

  const pendingReplies = pendingQuery.data?.pages.flatMap((page) => page.items) ?? []
  const reviewedReplies = reviewedQuery.data?.pages.flatMap((page) => page.items) ?? []

  return {
    pendingQuery,
    reviewedQuery,
    pendingReplies,
    reviewedReplies,
    isLoading:
      (statusFilter !== 'REVIEWED' && pendingQuery.isLoading) ||
      (statusFilter !== 'PENDING' && reviewedQuery.isLoading),
  }
}
