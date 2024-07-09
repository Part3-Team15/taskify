import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ModalCancelButton(props: ButtonProps) {
  const { children, disabled, className = '', ...buttonProps } = props;

  return (
    <button
      className={`btn-white h-[42px] w-[138px] rounded-[8px] text-sm md:h-12 md:w-[120px] md:text-base ${className}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
