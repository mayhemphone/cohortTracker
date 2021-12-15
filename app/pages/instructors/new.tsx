import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createInstructor from "app/instructors/mutations/createInstructor"
import { InstructorForm, FORM_ERROR } from "app/instructors/components/InstructorForm"

const NewInstructorPage: BlitzPage = () => {
  const router = useRouter()
  const [createInstructorMutation] = useMutation(createInstructor)

  return (
    <div>
      <h1>Create New Instructor</h1>

      <InstructorForm
        submitText="Create Instructor"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateInstructor}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const instructor = await createInstructorMutation(values)
            router.push(Routes.ShowInstructorPage({ instructorId: instructor.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.InstructorsPage()}>
          <a>Instructors</a>
        </Link>
      </p>
    </div>
  )
}

NewInstructorPage.authenticate = true
NewInstructorPage.getLayout = (page) => <Layout title={"Create New Instructor"}>{page}</Layout>

export default NewInstructorPage
