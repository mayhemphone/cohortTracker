import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteInstructor = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteInstructor),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const instructor = await db.instructor.deleteMany({ where: { id } })

    return instructor
  }
)
