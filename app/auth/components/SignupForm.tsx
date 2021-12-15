import { useMutation, useQuery } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import LabeledRadioField from "app/core/components/LabeledRadioField"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        autoComplete="off"
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "", slackHandle: "@" }}
        onSubmit={async (values) => {
          console.log("onsubmit", values)
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="firstName" label="First name" placeholder="First Name" />
        <LabeledTextField name="lastName" label="Last name" placeholder="Last name" />
        <LabeledTextField name="slackHandle" label="Slack handle" placeholder="Slack handle" />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <LabeledRadioField name="role" label="Student" value="STUDENT" />
          <LabeledRadioField name="role" label="Instructor" value="INSTRUCTOR" />
          <LabeledRadioField name="role" label="Admin" value="ADMIN" />
        </div>
        <LabeledTextField name="cohorts" label="Cohort id" defaultValue="1" />
      </Form>
    </div>
  )
}

export default SignupForm
