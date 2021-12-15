import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface LabeledCheckboxFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledCheckboxField = forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    return (
      <div {...outerProps} className="container">
        <label {...labelProps} htmlFor={name}>
          {label}
        </label>
        <input id={name} disabled={isSubmitting} {...register(name)} {...props} type="checkbox" />

        {error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}

        <style jsx>{`
          .container {
            display: inline-block;
          }

          label {
            font-size: 1rem;
          }
          input {
            font-size: 1rem;
            margin-top: 0.5rem;
            margin-right: 20px;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledCheckboxField
