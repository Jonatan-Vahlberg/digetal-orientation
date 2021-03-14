import React, { AnchorHTMLAttributes } from 'react';

const StyledLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, className, ...props }) => {
  return (
    <a className={`self-center text-center block underline focus:bg-yellow-500 ${className}`} {...props}>
      {children}
    </a>
  );
};

export default StyledLink;
