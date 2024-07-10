import Image from 'next/image';
import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';

interface ImageInputProps {
  name: string;
  value: string | null;
  onChange: (f: File) => void;
  onDeleteClick: () => void;
}

/* NOTE: 이미지 인풋을 입력받고, 수정/제거할 수 있는 컴포넌트
 * onChange, onDeleteClick: 실제 폼에 입력 변화를 반영하기 위한 함수
 */
export default function ImageInput({ name, value, onChange, onDeleteClick }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState(value || ''); // NOTE: 프리뷰 위한 state

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files === null || !files[0]) return;
    onChange(files[0]); // NOTE: 실제 폼 반영
    setTempImage(URL.createObjectURL(files[0])); // NOTE: 프리뷰 반영
  };

  const handleImageDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!inputRef.current) return;
    e.preventDefault();

    const inputNode = inputRef.current as HTMLInputElement;
    inputNode.value = '';
    onDeleteClick();
    setTempImage('');
  };

  return (
    <div className='size-full'>
      {tempImage ? (
        // 이미지가 있을 때, 이미지를 보여주고, 수정과 삭제가 가능
        <label htmlFor={name} className='align-center relative size-full cursor-pointer'>
          <Image
            src={tempImage}
            alt='이미지'
            fill
            style={{ objectFit: 'cover' }}
            className='rounded-md hover:brightness-75 active:brightness-50'
          />
          <Image src='/icons/edit.svg' alt='이미지 수정' width={30} height={30} className='z-10' />
          {/* 이미지 삭제 버튼 */}
          <button
            className='absolute right-1.5 top-1.5 size-6 cursor-pointer rounded-full opacity-40 hover:opacity-70'
            type='button'
            onClick={handleImageDelete}
          >
            <Image src='/icons/x.svg' alt='이미지 삭제' fill className='gray-border rounded-full bg-white/70' />
          </button>
        </label>
      ) : (
        // 이미지가 없을 때 추가 버튼처럼 렌더링됨
        <label htmlFor={name} className='btn-gray size-full cursor-pointer dark:bg-dark-200 dark:hover:bg-dark-100/50'>
          <div className='relative size-5 md:size-[30px]'>
            <Image src='/icons/plus-violet.svg' alt='이미지 추가' fill className='dark:hidden' />
            <Image src='/icons/plus-white.svg' alt='이미지 추가' fill className='hidden dark:block' />
          </div>
        </label>
      )}

      {/* 실제 인풋 받는 요소 */}
      <input
        className='hidden'
        id={name}
        type='file'
        accept='image/jpeg, image/png'
        onChange={handleImageChange}
        ref={inputRef}
      />
    </div>
  );
}
