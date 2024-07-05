import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CancelButton(props: ButtonProps) {
  const { children, disabled, className = '', ...buttonProps } = props;

  return (
    <button
      className={`btn-violet-light dark:btn-violet-dark w-[52px] cursor-pointer rounded-[4px] border-none py-[7px] text-xs text-violet disabled:cursor-default md:w-[84px] md:text-sm dark:bg-dark-purple dark:disabled:bg-dark-purple/50 ${className}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
