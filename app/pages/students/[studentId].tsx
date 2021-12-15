import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStudent from "app/students/queries/getStudent"
import deleteStudent from "app/students/mutations/deleteStudent"

export const Student = () => {
  const router = useRouter()
  const studentId = useParam("studentId", "number")
  const [deleteStudentMutation] = useMutation(deleteStudent)
  const [student] = useQuery(getStudent, { id: studentId })

  return (
    <>
      <Head>
        <title>Student {student.id}</title>
      </Head>

      <div>
        <h1>Student {student.id}</h1>
        <pre>{JSON.stringify(student, null, 2)}</pre>

        <Link href={Routes.EditStudentPage({ studentId: student.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteStudentMutation({ id: student.id })
              router.push(Routes.StudentsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowStudentPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.StudentsPage()}>
          <a>Students</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Student />
      </Suspense>
    </div>
  )
}

ShowStudentPage.authenticate = true
ShowStudentPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowStudentPage
