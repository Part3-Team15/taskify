import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import useModal from '@/hooks/useModal';
import { deleteColumn } from '@/services/deleteService';
import { putColumn } from '@/services/putService';
import { ModifyColumnModalProps } from '@/types/Modal.interface';

export default function ModifyColumnModal({ columnId, columnTitle = '', columns }: ModifyColumnModalProps) {
  const { openNotificationModal, openConfirmModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const router = useRouter();
  const { id: dashboardId } = router.query;
  const [title, setTitle] = useState(columnTitle);
  const [errorMessage, setErrorMessage] = useState('');
  const columnNames = columns.map((column) => column.title);

  const handleValidCheck = () => {
    if (!title) {
      setErrorMessage('이름을 입력해주세요');
    } else if (title.length > 15) {
      setErrorMessage('15자 이내로 입력해주세요');
    } else if (columnNames.includes(title)) {
      setErrorMessage('중복된 컬럼 이름입니다');
    } else {
      setErrorMessage('');
    }
  };

  const handleModifyClick = async () => {
    try {
      await putColumn(columnId, { title });
      queryClient.invalidateQueries({ queryKey: ['columns', dashboardId] });
      openNotificationModal({ text: '컬럼이 성공적으로 변경되었습니다.' });
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message || '컬럼 변경을 실패하였습니다.');
      } else {
        setErrorMessage('컬럼 변경을 실패하였습니다.');
        console.log(error);
      }
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteColumn(columnId);
      queryClient.invalidateQueries({ queryKey: ['columns', dashboardId] });
      openNotificationModal({ text: '컬럼이 삭제되었습니다.' });
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message || '컬럼이 삭제에 실패했습니다.');
      } else {
        setErrorMessage('컬럼이 삭제에 실패했습니다.');
        console.log(error);
      }
    }
  };

  return (
    <div className='modal w-[327px] md:w-[540px]'>
      <h2 className='section-title'>컬럼 관리</h2>

      <div className='my-6 md:mb-7 md:mt-8'>
        <label className='label'>이름</label>
        <input
          type='text'
          className={`input mt-[10px] ${errorMessage ? 'border-2 border-red' : ''}`}
          placeholder='변경될 컬럼 이름을 입력해 주세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleValidCheck}
        />
        {errorMessage && <p className='mt-2 text-sm text-red'>{errorMessage}</p>}
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
        <button
          className='text-left text-sm text-gray-9f underline hover:font-bold active:text-gray-78'
          onClick={() => {
            openConfirmModal({ text: '컬럼의 모든 카드가 삭제됩니다.', onActionClick: handleDeleteClick });
          }}
        >
          삭제하기
        </button>
        <div className='flex justify-between md:justify-end md:gap-3'>
          <ModalCancelButton type='button' onClick={closeModal}>
            취소
          </ModalCancelButton>
          <ModalActionButton
            type='button'
            onClick={handleModifyClick}
            disabled={!!errorMessage || columnTitle === title}
          >
            변경
          </ModalActionButton>
        </div>
      </div>
    </div>
  );
}
