import { MouseEventHandler } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import { ColumnDeleteModalProps } from '@/types/Modal.interface';

export default function ColumnDeleteModal({
  handleCloseModal,
  modalProps,
}: {
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
  modalProps: ColumnDeleteModalProps;
}) {
  return (
    <div className='flex h-[220px] w-[327px] flex-col justify-between rounded-[8px] bg-white px-[18px] py-[32px] md:h-[250px] md:w-[540px]'>
      <div className='flex size-full items-center justify-center'>
        <h1 className='mt-[10px] text-[16px] font-medium text-black-33 md:text-[18px]'>
          컬럼의 모든 카드가 삭제됩니다.
        </h1>
      </div>
      <div className='flex justify-between md:justify-end md:gap-[15px]'>
        <ModalCancelButton onClick={handleCloseModal}>취소</ModalCancelButton>
        <ModalActionButton
          className='bg-red hover:bg-red-hover'
          onClick={() => {
            alert(modalProps);
          }}
        >
          {/* 컬럼 삭제 API 연결 필요 */}
          삭제
        </ModalActionButton>
      </div>
    </div>
  );
}
