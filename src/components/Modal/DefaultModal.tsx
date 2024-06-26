import { MouseEventHandler } from 'react';

import ModalCancelButton from '@/components/Button/ModalCancelButton';

export default function DefaultModal({ handleCloseModal }: { handleCloseModal: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div className='flex flex-col rounded-[8px] bg-white px-[28px] py-[32px]'>
      <h1>DEFAULT MODAL</h1>
      <ModalCancelButton onClick={handleCloseModal}>취소</ModalCancelButton>
    </div>
  );
}
