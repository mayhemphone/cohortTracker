import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetInstructors = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetInstructors), resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const instructors = await db.instructor.findMany({ include: { user: true } })

  // if (!instructors) throw new NotFoundError()

  return instructors
})

// CAN DELETE???
