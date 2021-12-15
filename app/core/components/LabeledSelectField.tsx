import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, children, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]
    console.log(name)
    return (
      <div {...outerProps} className="container">
        <label {...labelProps} htmlFor={name}>
          {label}
        </label>
        <select id={name} disabled={isSubmitting} {...register(name)} {...props}>
          {children}
        </select>

        {error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}

        <style jsx>{`
          .container {
            display: block;
          }

          label {
            font-size: 1rem;
            display: block;
          }
          select {
            font-size: 1rem;
            margin-top: 0.5rem;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledSelectField
