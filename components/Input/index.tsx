import React, { InputHTMLAttributes } from 'react'
import { Field } from 'formik'
import ErrorText from './ErrorText'

const Input: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    touched?: boolean
    containerClassName?: string
  }
> = ({ children, className, error, touched, containerClassName, ...props }) => {
  return (
    <div className={`${containerClassName}`}>
      <Field
        className={`border-0 border-b-2 outline-none transition-150 focus:border-yellow-500 pl-1.5 pr-2.5 py-2 mb-1 bg-transparent text-white w-60 block ${className}`}
        {...props}
      >
        {children}
      </Field>
      <ErrorText error={error} touched={touched} />
    </div>
  )
}

export default Input
