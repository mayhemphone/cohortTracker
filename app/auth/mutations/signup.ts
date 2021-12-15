import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, password, firstName, lastName, slackHandle, role }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())

    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        firstName,
        lastName,
        slackHandle,
        role,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        slackHandle: true,
        email: true,
        role: true,
      },
    })

    if (user.role === "STUDENT") {
      const student = await db.student.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          cohorts: {
            connect: [{ id: 1 }],
          },
        },
        select: { id: true, user: true },
      })
      return student
    } else if (user.role === "INSTRUCTOR") {
      const instructor = await db.instructor.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          cohorts: {
            connect: [{ id: 1 }],
          },
        },
        select: { id: true, user: true },
      })
      return instructor
    }

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
