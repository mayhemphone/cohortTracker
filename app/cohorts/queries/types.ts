import { Prisma } from "@prisma/client"
import getCohort from "./getCohort"

export type CohortsWithRelationships = Prisma.PromiseReturnType<typeof getCohort>
