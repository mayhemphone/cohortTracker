import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetInstructor = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetInstructor), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const instructor = await db.instructor.findFirst({ where: { id } })

  if (!instructor) throw new NotFoundError()

  return instructor
})
