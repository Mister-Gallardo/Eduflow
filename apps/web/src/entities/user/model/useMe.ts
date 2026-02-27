import { trpc } from '@/shared/api/trpc'

export function useMe(enabled = true) {
  const { data, isLoading, isFetched } = trpc.auth.me.useQuery(undefined, {
    enabled,
    refetchOnWindowFocus: true,
  })

  return {
    userData: data,
    isUserLoading: isLoading,
    isUserFetched: isFetched,
  }
}
