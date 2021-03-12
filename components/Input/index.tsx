import React, { InputHTMLAttributes } from 'react';
import { Field } from 'formik';

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ children, className, ...props }) => {
  return (
    <Field className={`border-0 border-b-2 outline-none transition-150 focus:border-yellow-500 px-2.5 py-2 bg-transparent text-white w-60 block ${className}`} {...props}>
      {children}
    </Field>
  );
};

export default Input;
