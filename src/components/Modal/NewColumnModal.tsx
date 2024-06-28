import { MouseEventHandler, useState } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import useModal from '@/hooks/useModal';
import { postNewColumn } from '@/services/postService';

interface NewColumnModalProps {
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
  modalProps: { dashboardId: number };
}

export default function NewColumnModal({ handleCloseModal, modalProps }: NewColumnModalProps) {
  const { openModal } = useModal();

  const [column, setColumn] = useState('');

  const { dashboardId } = modalProps;
  const handlePostNewColumn = async () => {
    try {
      await postNewColumn({ title: column, dashboardId: dashboardId });
      openModal({ type: 'newColumnSuccess' });
    } catch (error) {
      openModal({ type: 'newColumnFailed' });
    }
  };

  return (
    <div className='flex h-[266px] w-[327px] flex-col justify-between rounded-[8px] bg-white px-[18px] py-[32px] md:h-[301px] md:w-[540px]'>
      <h1 className='text-[20px] font-bold text-black-33 md:text-[24px]'>새 컬럼 생성</h1>
      <div className='flex flex-col'>
        <label className='mb-[10px] text-[16px] text-black-33 md:text-[18px]'>이름</label>
        {/* 이미 존재한 컬럼일 경우 Input 에러 표시 (현재 대쉬보드에 컬럼과 비교하면 될 듯) */}
        <input
          className='h-[42px] rounded-[6px] border border-gray-d9 px-[15px] text-[14px] md:h-[48px] md:text-[16px]'
          type='text'
          placeholder='생성할 컬럼 이름을 입력해 주세요'
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        />
      </div>
      <div className='flex justify-between md:justify-end md:gap-[15px]'>
        <ModalCancelButton onClick={handleCloseModal}>취소</ModalCancelButton>
        <ModalActionButton disabled={column.length === 0} onClick={handlePostNewColumn}>
          생성
        </ModalActionButton>
      </div>
    </div>
  );
}
