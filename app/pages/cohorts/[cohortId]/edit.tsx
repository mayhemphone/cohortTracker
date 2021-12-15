import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCohort from "app/cohorts/queries/getCohort"
import updateCohort from "app/cohorts/mutations/updateCohort"
import { CohortForm, FORM_ERROR } from "app/cohorts/components/CohortForm"

export const EditCohort = () => {
  const router = useRouter()
  const cohortId = useParam("cohortId", "number")
  const [cohort, { setQueryData }] = useQuery(
    getCohort,
    { id: cohortId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCohortMutation] = useMutation(updateCohort)

  return (
    <>
      <Head>
        <title>Edit Cohort {cohort.id}</title>
      </Head>

      <div>
        <h1>Edit Cohort {cohort.id}</h1>
        <pre>{JSON.stringify(cohort, null, 2)}</pre>

        <CohortForm
          submitText="Update Cohort"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCohort}
          initialValues={cohort}
          onSubmit={async (values) => {
            console.log({ values })
            try {
              const updated = await updateCohortMutation({
                id: cohort.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCohortPage({ cohortId: updated.id }))
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

const EditCohortPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCohort />
      </Suspense>

      <p>
        <Link href={Routes.CohortsPage()}>
          <a>Cohorts</a>
        </Link>
      </p>
    </div>
  )
}

EditCohortPage.authenticate = true
EditCohortPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCohortPage
