import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCohortsInput
  extends Pick<Prisma.CohortFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCohortsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: cohorts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.cohort.count({ where }),
      query: (paginateArgs) => db.cohort.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      cohorts,
      nextPage,
      hasMore,
      count,
    }
  }
)
