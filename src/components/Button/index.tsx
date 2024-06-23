import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive';
  leftSection?: React.ReactNode;
}

// variant에 따른 스타일 변경
const buttonTypes = {
  primary:
    'flex items-center justify-center bg-violet text-white w-full h-full rounded-[8px] hover:bg-violet_hover transition-all',
  secondary:
    'flex items-center justify-center bg-white text-violet border border-gray_d9 w-full h-full rounded-[8px] hover:bg-violet_f1 transition-all',
  destructive:
    'flex items-center justify-center bg-red text-white w-full h-full rounded-[8px] hover:bg-red_hover transition-all',
  disabled: 'flex items-center justify-center bg-gray_9f text-white w-full h-full rounded-[8px] cursor-not-allowed',
};

export default function Button(props: ButtonProps) {
  const { children, disabled, variant = 'primary', leftSection, className = '', ...buttonProps } = props;

  const buttonClassName = buttonTypes[disabled ? 'disabled' : variant];

  return (
    <button className={`${buttonClassName} ${className}`} disabled={disabled} {...buttonProps}>
      {leftSection && <span className='mr-2'>{leftSection}</span>}
      {children}
    </button>
  );
}
