import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CancelButton(props: ButtonProps) {
  const { children, disabled, className = '', ...buttonProps } = props;

  return (
    <button
      className={`btn-violet-light w-[52px] rounded-[4px] py-[7px] text-xs text-violet md:w-[84px] md:text-sm dark:bg-dark-200 dark:text-dark-10 dark:hover:bg-dark-400 dark:active:bg-dark-bg ${className}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
