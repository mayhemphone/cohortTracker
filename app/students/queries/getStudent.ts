import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetStudent = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetStudent), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const student = await db.student.findFirst({
    where: { id },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          slackHandle: true,
        },
      },
    },
  })

  if (!student) throw new NotFoundError()

  return student
})
