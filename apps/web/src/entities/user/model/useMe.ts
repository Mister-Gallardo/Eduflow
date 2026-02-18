import { trpc } from '@/shared/api/trpc'

export function useMe() {
  return trpc.auth.me.useQuery()
}
