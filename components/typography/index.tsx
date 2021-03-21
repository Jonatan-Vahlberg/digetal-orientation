import React, { HtmlHTMLAttributes } from 'react'
import { capitalize } from '../../helpers/functions'

const Title: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return <p className={`font-bold text-3xl mb-5 ${className}`}>{children}</p>
}

const Description: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return <p className={`mb-1 ${className}`}>{children}</p>
}

const Datapoint: React.FC<
  React.HTMLAttributes<HTMLParagraphElement> & { title: string; value: any }
> = ({ title, value, className, ...props }) => {
  return (
    <p className={`mb-1 ${className}`}>
      <span className="font-bold">{capitalize(title)}: </span>
      {value}
    </p>
  )
}

export { Title, Description, Datapoint }
