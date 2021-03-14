import React from 'react'
import { useIntl } from 'react-intl'

const ErrorText: React.FC<
  React.HTMLAttributes<HTMLParagraphElement> & {
    error?: string
    touched?: boolean
  }
> = ({ error, touched, className, ...props }) => {
  const { formatMessage: f } = useIntl()
  if (!error || !touched) return null
  return (
    <p
      {...props}
      className={`w-min min-w-full pl-1.5 pr-2.5 break-words block text-sm mb-0 text-red-500  ${className}`}
    >
      {f({ id: error })}
    </p>
  )
}

export default ErrorText
