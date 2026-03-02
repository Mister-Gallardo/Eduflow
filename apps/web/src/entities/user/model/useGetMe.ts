import { trpc } from '@/shared/api/trpc'

export function useGetMe(enabled = true) {
  const { data, isLoading, isFetched } = trpc.auth.getMe.useQuery(undefined, {
    enabled,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  return {
    user: data,
    isUserLoading: isLoading,
    isUserFetched: isFetched,
  }
}
