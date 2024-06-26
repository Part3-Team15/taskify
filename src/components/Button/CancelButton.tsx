import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CancelButton(props: ButtonProps) {
  const { children, disabled, className = '', ...buttonProps } = props;

  return (
    <button
      className={`btn-violet-light text-ts rounded-[4px] px-[29px] py-[7px] md:text-sm ${className}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
