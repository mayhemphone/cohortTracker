import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCohorts from "app/cohorts/queries/getCohorts"

const ITEMS_PER_PAGE = 100

export const CohortsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ cohorts, hasMore }] = usePaginatedQuery(getCohorts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  console.log({ cohorts })
  return (
    <div>
      <ul>
        {cohorts.map((cohort) => (
          <li key={cohort.id}>
            <Link href={Routes.ShowCohortPage({ cohortId: cohort.id })}>
              <a>{cohort.name}</a>
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

const CohortsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Cohorts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCohortPage()}>
            <a>Create Cohort</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CohortsList />
        </Suspense>
      </div>
    </>
  )
}

CohortsPage.authenticate = true
CohortsPage.getLayout = (page) => <Layout>{page}</Layout>

export default CohortsPage
