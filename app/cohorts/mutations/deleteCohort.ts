import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCohort = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteCohort), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cohort = await db.cohort.deleteMany({ where: { id } })

  return cohort
})
