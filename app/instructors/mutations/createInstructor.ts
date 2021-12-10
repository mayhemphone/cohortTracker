import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateInstructor = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateInstructor),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const instructor = await db.instructor.create({ data: input })

    return instructor
  }
)
