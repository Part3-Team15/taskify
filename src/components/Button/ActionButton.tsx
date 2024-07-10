import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/* NOTE: 나의 대시보드, 계정관리, 대시보드 등에서 쓰이는 보라색 버튼의 기본 디자인
 * classNames: 커스텀 CSS 지정 가능
 */
export default function ActionButton(props: ButtonProps) {
  const { children, disabled, className = '', ...buttonProps } = props;

  return (
    <button
      className={`btn-violet w-[84px] rounded-[4px] py-[7px] text-xs md:text-sm ${className}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
