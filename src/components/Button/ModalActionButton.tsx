import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/* NOTE: 여러 모달에서 쓰이는 보라색 버튼의 기본 디자인
 * classNames: 커스텀 CSS 지정 가능
 */
export default function ModalActionButton(props: ButtonProps) {
  const { children, disabled, className = '', ...buttonProps } = props;

  return (
    <button
      className={`btn-violet h-[42px] w-[138px] rounded-[8px] text-sm md:h-12 md:w-[120px] md:text-base ${className}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
