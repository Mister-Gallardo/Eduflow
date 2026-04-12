import { Role } from '@eduflow/db'
import { TRPCError } from '@trpc/server'

import type { AuthorizedContext } from '../../../trpc/context.js'

/**
 * Проверяет, что текущий пользователь является преподавателем.
 * Выбрасывает FORBIDDEN, если роль пользователя не TEACHER.
 */
export async function assertTeacher(ctx: AuthorizedContext): Promise<void> {
  const user = await ctx.db.user.findUnique({
    where: { id: ctx.me.id },
    select: { role: true },
  })

  if (user?.role !== Role.TEACHER) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Действие доступно только преподавателям',
    })
  }
}
