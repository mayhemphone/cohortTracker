import { Form, FormProps } from "app/core/components/Form"
import LabeledCheckboxField from "app/core/components/LabeledCheckboxField"
import LabeledDateField from "app/core/components/LabeledDateField"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import getInstrcutorsNoPagination from "app/instructors/queries/getInstrcutorsNoPagination"
import { useQuery } from "blitz"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function CohortForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [instructors] = useQuery(getInstrcutorsNoPagination, {})

  const selections = instructors.map((instructor) => (
    <LabeledCheckboxField
      name="instructorSelect"
      key={instructor.id}
      value={instructor.id}
      label={`${instructor.user.firstName} ${instructor.user.lastName}`}
    />
  ))

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="slug" label="Slug" placeholder="Slug" />
      <LabeledDateField name="startDate" label="Start Date" placeholder="Start Date" />
      <LabeledDateField name="endDate" label="End Date" placeholder="End Date" />

      {selections}
    </Form>
  )
}
