import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCohort = z.object({
  name: z.string(),
  slug: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  instructorSelect: z.array(z.string()),
})

export default resolver.pipe(resolver.zod(CreateCohort), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cohort = await db.cohort.create({
    data: {
      name: input.name,
      slug: input.slug,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
      instructors: {
        connect: input?.instructorSelect.map((i) => ({ id: parseInt(i) })) || [],
      },
    },
  })

  return cohort
})
