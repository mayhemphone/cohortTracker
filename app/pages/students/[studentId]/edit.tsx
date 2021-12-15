import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStudent from "app/students/queries/getStudent"
import updateStudent from "app/students/mutations/updateStudent"
import { StudentForm, FORM_ERROR } from "app/students/components/StudentForm"

export const EditStudent = () => {
  const router = useRouter()
  const studentId = useParam("studentId", "number")
  const [student, { setQueryData }] = useQuery(
    getStudent,
    { id: studentId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateStudentMutation] = useMutation(updateStudent)

  return (
    <>
      <Head>
        <title>Edit Student {student.id}</title>
      </Head>

      <div>
        <h1>Edit Student {student.id}</h1>
        <pre>{JSON.stringify(student, null, 2)}</pre>

        <StudentForm
          submitText="Update Student"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateStudent}
          initialValues={student}
          onSubmit={async (values) => {
            try {
              const updated = await updateStudentMutation({
                id: student.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowStudentPage({ studentId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditStudentPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditStudent />
      </Suspense>

      <p>
        <Link href={Routes.StudentsPage()}>
          <a>Students</a>
        </Link>
      </p>
    </div>
  )
}

EditStudentPage.authenticate = true
EditStudentPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditStudentPage
