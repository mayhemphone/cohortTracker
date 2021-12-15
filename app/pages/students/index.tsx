import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStudents from "app/students/queries/getStudents"
import { FullStudent } from "app/users/queries/returnTypes"

const ITEMS_PER_PAGE = 100

export const StudentsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ students, hasMore }] = usePaginatedQuery(getStudents, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  console.log({ students })
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {students.map((student: FullStudent) => (
          <li key={student.id}>
            <Link href={Routes.ShowStudentPage({ studentId: student.id })}>
              <a>
                {student.user?.firstName} {student.user?.lastName}
              </a>
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

const StudentsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Students</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewStudentPage()}>
            <a>Create Student</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <StudentsList />
        </Suspense>
      </div>
    </>
  )
}

StudentsPage.authenticate = true
StudentsPage.getLayout = (page) => <Layout>{page}</Layout>

export default StudentsPage
