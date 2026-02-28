import { trpc } from '@/shared/api/trpc'

export function useGetMe(enabled = true) {
  const { data, isLoading, isFetched } = trpc.auth.getMe.useQuery(undefined, {
    enabled,
    refetchOnWindowFocus: true,
  })

  return {
    user: data ?? null,
    isUserLoading: isLoading,
    isUserFetched: isFetched,
  }
}
