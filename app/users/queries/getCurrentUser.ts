import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      slackHandle: true,
      email: true,
      role: true,
    },
  })

  return user as CurrentUser
}

export type CurrentUser = {
  id: number
  firstName: string
  lastName: string
  slackHandle: string
  email: string
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN"
  avatar: string | null
}
