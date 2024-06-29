import { MouseEventHandler } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import { TextModalProps } from '@/types/Modal.interface';

export default function TextModal({
  handleCloseModal,
  modalProps,
}: {
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
  modalProps: TextModalProps;
}) {
  return (
    <div className='h-[220px] w-[327px] rounded-[8px] bg-white px-[28px] py-[32px] md:h-[250px] md:w-[540px]'>
      <div className='relative flex size-full items-center justify-center'>
        <h1 className='mb-[15px] text-[16px] text-black-33 md:text-[18px]'>{modalProps.text}</h1>
        <ModalActionButton
          className='absolute bottom-0 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0'
          onClick={handleCloseModal}
        >
          확인
        </ModalActionButton>
      </div>
    </div>
  );
}
