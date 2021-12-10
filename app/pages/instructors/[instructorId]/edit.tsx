import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getInstructor from "app/instructors/queries/getInstructor"
import updateInstructor from "app/instructors/mutations/updateInstructor"
import { InstructorForm, FORM_ERROR } from "app/instructors/components/InstructorForm"

export const EditInstructor = () => {
  const router = useRouter()
  const instructorId = useParam("instructorId", "number")
  const [instructor, { setQueryData }] = useQuery(
    getInstructor,
    { id: instructorId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateInstructorMutation] = useMutation(updateInstructor)

  return (
    <>
      <Head>
        <title>Edit Instructor {instructor.id}</title>
      </Head>

      <div>
        <h1>Edit Instructor {instructor.id}</h1>
        <pre>{JSON.stringify(instructor, null, 2)}</pre>

        <InstructorForm
          submitText="Update Instructor"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateInstructor}
          initialValues={instructor}
          onSubmit={async (values) => {
            try {
              const updated = await updateInstructorMutation({
                id: instructor.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowInstructorPage({ instructorId: updated.id }))
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

const EditInstructorPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditInstructor />
      </Suspense>

      <p>
        <Link href={Routes.InstructorsPage()}>
          <a>Instructors</a>
        </Link>
      </p>
    </div>
  )
}

EditInstructorPage.authenticate = true
EditInstructorPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditInstructorPage
