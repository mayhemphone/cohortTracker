import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

import { Prisma } from "@prisma/client"
import { CohortsWithRelationships } from "./types"

const GetCohort = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCohort), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cohort = await db.cohort.findFirst({
    where: { id },
    include: { instructors: true, students: true },
  })

  if (!cohort) throw new NotFoundError()

  return cohort
})
