import { standardUserData } from "app/core/helpers"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateStudent = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateStudent),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const student = await db.student.update({
      where: { id },
      data,
      include: {
        cohorts: true,
        user: { select: { ...standardUserData } },
      },
    })

    return student
  }
)
