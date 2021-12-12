import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getInstructors from "app/instructors/queries/getInstructors"
import { Instructor } from "db"

const ITEMS_PER_PAGE = 100

export const InstructorsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ instructors, hasMore }] = usePaginatedQuery(getInstructors, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {instructors.map((instructor: Instructor) => (
          <li key={instructor.id}>
            <Link href={Routes.ShowInstructorPage({ instructorId: instructor.id })}>
              <a>{instructor.firstName}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const InstructorsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Instructors</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewInstructorPage()}>
            <a>Create Instructor</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <InstructorsList />
        </Suspense>
      </div>
    </>
  )
}

InstructorsPage.authenticate = true
InstructorsPage.getLayout = (page) => <Layout>{page}</Layout>

export default InstructorsPage
