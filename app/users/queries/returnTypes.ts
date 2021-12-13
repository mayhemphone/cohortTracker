export type CurrentUser = {
  id: number
  firstName: string
  lastName: string
  slackHandle: string
  email: string
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN"
  avatar: string | null
}
