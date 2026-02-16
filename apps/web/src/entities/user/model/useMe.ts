import { trpc } from '@/shared/api'

export function useMe() {
  return trpc.auth.me.useQuery()
}
