import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CancelButton(props: ButtonProps) {
  const { children, disabled, className = '', ...buttonProps } = props;

  return (
    <button
      className={`btn-violet-light w-[52px] cursor-pointer rounded-[4px] border-none py-[7px] text-xs text-violet disabled:cursor-default md:w-[84px] md:text-sm dark:bg-dark-200 dark:text-dark-10 dark:hover:bg-dark-100/50 dark:disabled:bg-dark-200/50 ${className}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
