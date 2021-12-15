import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getInstructor from "app/instructors/queries/getInstructor"
import deleteInstructor from "app/instructors/mutations/deleteInstructor"

export const Instructor = () => {
  const router = useRouter()
  const instructorId = useParam("instructorId", "number")
  const [deleteInstructorMutation] = useMutation(deleteInstructor)
  const [instructor] = useQuery(getInstructor, { id: instructorId })

  return (
    <>
      <Head>
        <title>Instructor {instructor.id}</title>
      </Head>

      <div>
        <h1>Instructor {instructor.id}</h1>
        <pre>{JSON.stringify(instructor, null, 2)}</pre>

        <Link href={Routes.EditInstructorPage({ instructorId: instructor.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteInstructorMutation({ id: instructor.id })
              router.push(Routes.InstructorsPage())
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

const ShowInstructorPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.InstructorsPage()}>
          <a>Instructors</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Instructor />
      </Suspense>
    </div>
  )
}

ShowInstructorPage.authenticate = true
ShowInstructorPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowInstructorPage
