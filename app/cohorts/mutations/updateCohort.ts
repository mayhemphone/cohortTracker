import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCohort = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  instructorSelect: z.array(z.string()),
})

export default resolver.pipe(
  resolver.zod(UpdateCohort),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cohort = await db.cohort.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,

        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        instructors: {
          connect: data?.instructorSelect.map((i) => ({ id: parseInt(i) })) || [],
        },
      },
      include: {
        instructors: true,
        students: true,
      },
    })

    return cohort
  }
)
