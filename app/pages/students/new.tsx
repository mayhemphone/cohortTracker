import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createStudent from "app/students/mutations/createStudent"
import { StudentForm, FORM_ERROR } from "app/students/components/StudentForm"

const NewStudentPage: BlitzPage = () => {
  const router = useRouter()
  const [createStudentMutation] = useMutation(createStudent)

  return (
    <div>
      <h1>Create New Student</h1>

      <StudentForm
        submitText="Create Student"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateStudent}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const student = await createStudentMutation(values)
            router.push(Routes.ShowStudentPage({ studentId: student.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.StudentsPage()}>
          <a>Students</a>
        </Link>
      </p>
    </div>
  )
}

NewStudentPage.authenticate = true
NewStudentPage.getLayout = (page) => <Layout title={"Create New Student"}>{page}</Layout>

export default NewStudentPage
