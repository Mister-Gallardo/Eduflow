// import { logger } from '@eduflow/logger'

// import { procedure } from '../../trpc/trpc.js'

// // const values = [
// //   { id: 0, name: 'name 0', desc: 'desk of name 0. like is fckn cool!' },
// //   { id: 1, name: 'name 1', desc: 'desk of name 1. like is fckn cool!' },
// //   { id: 2, name: 'name 2', desc: 'desk of name 2. like is fckn cool!' },
// //   { id: 3, name: 'name 3', desc: 'desk of name 3. like is fckn cool!' },
// //   { id: 4, name: 'name 4', desc: 'desk of name 4. like is fckn cool!' },
// //   { id: 5, name: 'name 5', desc: 'desk of name 5. like is fckn cool!' },
// // ]

// export const exampleTrpcRoute = procedure.query(async ({ ctx }) => {
//   const result = await ctx.db.example.findMany({
//     select: {
//       id: true,
//       name: true,
//     },
//   })

//   if (!result) {
//     logger.error('prisma', 'ctx', { result })
//   }

//   return result
// })
