import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUser = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  slackHandle: z.string(),
  role: z.string(),
})

export default resolver.pipe(resolver.zod(CreateUser), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.create({ data: input })

  return user
})
