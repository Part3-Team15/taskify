import Image from 'next/image';
import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';

interface ImageInputProps {
  name: string;
  value: string | null;
  onChange: (f: File) => void;
  onDeleteClick: () => void;
}

export default function ImageInput({ name, value, onChange, onDeleteClick }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState(value || '');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files === null || !files[0]) return;
    onChange(files[0]);
    setTempImage(URL.createObjectURL(files[0]));
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
        <label htmlFor={name} className='align-center relative size-full'>
          <Image
            src={tempImage}
            alt='이미지'
            fill
            style={{ objectFit: 'cover' }}
            className='rounded-md hover:brightness-75 active:brightness-50'
          />
          <button
            className='absolute right-1.5 top-1.5 size-6 cursor-pointer rounded-full opacity-40 hover:opacity-70'
            type='button'
            onClick={handleImageDelete}
          >
            <Image src='/icons/x.svg' alt='이미지 삭제' fill />
          </button>
          <Image src='/icons/edit.svg' alt='이미지 수정' width={30} height={30} className='z-10' />
        </label>
      ) : (
        <label htmlFor={name} className='btn-gray size-full'>
          <div className='relative size-5 md:size-[30px]'>
            <Image src='/icons/plus-violet.svg' alt='이미지 추가' fill />
          </div>
        </label>
      )}

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
