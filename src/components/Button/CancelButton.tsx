import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/* NOTE: 나의 대시보드, 계정관리, 대시보드 등에서 쓰이는 흰색 버튼의 기본 디자인
 * classNames: 커스텀 CSS 지정 가능
 */
export default function CancelButton(props: ButtonProps) {
  const { children, disabled, className = '', ...buttonProps } = props;

  return (
    <button
      className={`btn-violet-light w-[52px] cursor-pointer rounded-[4px] py-[7px] text-xs text-violet disabled:cursor-default md:w-[84px] md:text-sm dark:border-none dark:bg-dark-200 dark:text-dark-10 dark:hover:bg-dark-100/50 dark:disabled:bg-dark-200/50 ${className}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
