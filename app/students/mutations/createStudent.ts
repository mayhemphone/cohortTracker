import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateStudent = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  slackHandle: z.string(),
  userId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateStudent), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const student = await db.student.create({ data: input })

  return student
})
