import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

interface ImageInputProps {
  name: string;
  value: string | null;
  onChange: (f: File) => void;
}

export default function ImageInput({ name, value, onChange }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState(value || '');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files === null || !files[0]) return;
    onChange(files[0]);
    setTempImage(URL.createObjectURL(files[0]));
  };

  return (
    <div className='size-full rounded-md bg-gray-f5'>
      {tempImage ? (
        <label htmlFor={name} className='align-center relative size-full'>
          <Image
            src={tempImage}
            alt='이미지'
            fill
            style={{ objectFit: 'cover' }}
            className='rounded-md hover:brightness-50'
          />
          <Image src='/icons/edit.svg' alt='이미지 수정' width={30} height={30} className='z-10' />
        </label>
      ) : (
        <label htmlFor={name} className='align-center size-full'>
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
