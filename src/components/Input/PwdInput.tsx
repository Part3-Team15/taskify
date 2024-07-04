import Image from 'next/image';
import { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  error?: string;
}

export default function PwdInput(props: InputProps) {
  const { id, placeholder, error, className = '', ...inputProps } = props;
  const [visible, setVisible] = useState(false);
  const type = visible ? 'text' : 'password';

  return (
    <div>
      <div className='relative'>
        <input
          className={`input ${error && 'border-2 border-red'} dark:bg-dark-300`}
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete='new-password'
          {...inputProps}
        />
        <button
          type='button'
          className='absolute right-4 top-[13px] size-4 md:top-[15px] md:size-5'
          onClick={() => setVisible(!visible)}
        >
          <Image
            src={visible ? '/icons/visibility.svg' : '/icons/invisibility.svg'}
            alt='비밀번호 보이기 아이콘'
            width={20}
            height={20}
          />
        </button>
      </div>
      {error && <p className='mt-2 text-sm text-red'>{error}</p>}
    </div>
  );
}
