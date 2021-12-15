import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCohort from "app/cohorts/queries/getCohort"
import deleteCohort from "app/cohorts/mutations/deleteCohort"

export const Cohort = () => {
  const router = useRouter()
  const cohortId = useParam("cohortId", "number")
  const [deleteCohortMutation] = useMutation(deleteCohort)
  const [cohort] = useQuery(getCohort, { id: cohortId })

  return (
    <>
      <Head>
        <title>Cohort {cohort.id}</title>
      </Head>

      <div>
        <h1>Cohort {cohort.id}</h1>
        <pre>{JSON.stringify(cohort, null, 2)}</pre>

        <Link href={Routes.EditCohortPage({ cohortId: cohort.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCohortMutation({ id: cohort.id })
              router.push(Routes.CohortsPage())
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

const ShowCohortPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CohortsPage()}>
          <a>Cohorts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Cohort />
      </Suspense>
    </div>
  )
}

ShowCohortPage.authenticate = true
ShowCohortPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCohortPage
