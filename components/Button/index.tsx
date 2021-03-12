import React, { ButtonHTMLAttributes } from 'react';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  return (
    <button className={`py-3 px-3.5 font-bold duration-150 bg-gray-900 text-white text-xl rounded-full  focus:outline-none focus:text-gray-900 focus:bg-yellow-500 ${className} w-full`} {...props}>
      {children}
    </button>
  );
};

export default Button;
