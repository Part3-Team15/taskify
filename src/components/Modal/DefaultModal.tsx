import { MouseEventHandler } from 'react';

import Button from '@/components/Button';

export default function DefaultModal({ handleCloseModal }: { handleCloseModal: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div className='flex flex-col rounded-[8px] bg-white px-[28px] py-[32px]'>
      <h1>DEFAULT MODAL</h1>
      <Button onClick={handleCloseModal}>취소</Button>
    </div>
  );
}
