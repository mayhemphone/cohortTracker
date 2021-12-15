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

export type StandardUserData = {
  firstName: string
  lastName: string
  email: string
  slackHandle: string
}

export type FullStudent = Student & {
  user?: StandardUserData
}

export type FullInstructor = Instructor & {
  user?: StandardUserData
}
