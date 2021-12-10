import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetInstructorsInput
  extends Pick<Prisma.InstructorFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetInstructorsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: instructors,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.instructor.count({ where }),
      query: (paginateArgs) => db.instructor.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      instructors,
      nextPage,
      hasMore,
      count,
    }
  }
)
