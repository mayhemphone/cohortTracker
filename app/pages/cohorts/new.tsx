import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCohort from "app/cohorts/mutations/createCohort"
import { CohortForm, FORM_ERROR } from "app/cohorts/components/CohortForm"
import { Suspense } from "react"

const NewCohortPage: BlitzPage = () => {
  const router = useRouter()
  const [createCohortMutation] = useMutation(createCohort)

  return (
    <div>
      <h1>Create New Cohort</h1>
      <Suspense fallback="loading...">
        <CohortForm
          submitText="Create Cohort"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={CreateCohort}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const cohort = await createCohortMutation(values)
              router.push(Routes.ShowCohortPage({ cohortId: cohort.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.CohortsPage()}>
          <a>Cohorts</a>
        </Link>
      </p>
    </div>
  )
}

NewCohortPage.authenticate = true
NewCohortPage.getLayout = (page) => <Layout title={"Create New Cohort"}>{page}</Layout>

export default NewCohortPage
