import React, { ButtonHTMLAttributes } from 'react'

const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { small?: boolean }
> = ({ className, children, small, ...props }) => {
  return (
    <button
      className={`${small ? 'py-1 px-2 text-base' : 'py-3 px-3.5 text-xl'} ${
        props.disabled ? 'bg-red-400' : 'bg-gray-900'
      } font-bold duration-150  text-white  rounded-full  focus:outline-none focus:text-gray-900 focus:bg-yellow-500 ${className} w-full`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
