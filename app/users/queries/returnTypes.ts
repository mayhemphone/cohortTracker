import { Instructor, Student, User } from "db"

export type CurrentUser = {
  id: number
  firstName: string
  lastName: string
  slackHandle: string
  email: string
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN"
  avatar: string | null
}

export type FullStudent = Student & {
  user?: User
}

export type FullInstructor = Instructor & {
  user?: User
}
