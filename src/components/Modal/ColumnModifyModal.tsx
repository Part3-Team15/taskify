import { useState } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import useModal from '@/hooks/useModal';
import { putColumn } from '@/services/putService';
import { ColumnModifyModalProps } from '@/types/Modal.interface';

export default function ColumnModifyModal({ modalProps }: { modalProps: ColumnModifyModalProps }) {
  const id = modalProps?.columnId;
  const [title, setTitle] = useState(modalProps?.columnTitle || '');
  const { openModal, closeModal } = useModal();

  const handleModifyButton = async () => {
    try {
      await putColumn(id, { title });
      openModal({ type: 'textModal', modalProps: { text: '컬럼이 성공적으로 변경되었습니다.' } });
    } catch {
      openModal({ type: 'textModal', modalProps: { text: '컬럼이 변경되지 않았습니다.' } });
    }
  };

  return (
    <div className='flex h-[274px] w-[327px] flex-col justify-between rounded-[8px] bg-white px-[18px] py-[32px] md:h-[276px] md:w-[540px]'>
      <h1 className='text-[20px] font-bold text-black-33 md:text-[24px]'>컬럼 관리</h1>
      <div className='flex flex-col'>
        <label className='mb-[10px] text-[16px] text-black-33 md:text-[18px]'>이름</label>
        <input
          className={`h-[42px] rounded-[6px] border border-gray-d9 px-[15px] text-[14px] md:h-[48px] md:text-[16px] ${!title?.length ? 'border-2 border-red' : ''}`}
          type='text'
          placeholder='변경될 컬럼 이름을 입력해주세요.'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div className='flex flex-col justify-between md:flex-row'>
        <div className='mb-[10px] flex md:mb-0 md:items-end'>
          <button
            className='text-[14px] text-gray-9f underline hover:font-bold'
            onClick={() => {
              openModal({ type: 'columnDeleteConfirm', modalProps: { columnId: id } });
            }}
          >
            삭제하기
          </button>
        </div>
        <div className='flex justify-between md:justify-end md:gap-[15px]'>
          <ModalCancelButton onClick={closeModal}>취소</ModalCancelButton>
          <ModalActionButton disabled={!(title?.length > 0)} onClick={handleModifyButton}>
            변경
          </ModalActionButton>
        </div>
      </div>
    </div>
  );
}
