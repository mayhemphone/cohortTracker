import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateInstructor = z.object({
  id: z.number(),
  firstName: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateInstructor),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const instructor = await db.instructor.update({ where: { id }, data })

    return instructor
  }
)
