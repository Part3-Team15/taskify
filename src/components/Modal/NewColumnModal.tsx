import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import useModal from '@/hooks/useModal';
import { postNewColumn } from '@/services/postService';
import { NewColumnModalProps } from '@/types/Modal.interface';

export default function NewColumnModal({ columns }: NewColumnModalProps) {
  const { openNotificationModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const columnNames = columns.map((column) => column.title);

  const handleValidCheck = () => {
    if (!name) {
      setErrorMessage('이름을 입력해주세요');
    } else if (name.length > 15) {
      setErrorMessage('15자 이내로 입력해주세요');
    } else if (columnNames.includes(name)) {
      setErrorMessage('중복된 컬럼 이름입니다');
    } else {
      setErrorMessage('');
    }
  };

  const handlePostNewColumn = async () => {
    try {
      await postNewColumn({ title: name, dashboardId: Number(id) });
      queryClient.invalidateQueries({ queryKey: ['columns', id] });
      openNotificationModal({ text: '새로운 컬럼이 생성되었습니다!' });
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message || '컬럼 생성을 실패하였습니다.');
      } else {
        setErrorMessage('컬럼 생성을 실패하였습니다.');
        console.log(error);
      }
    }
  };

  return (
    <div className='modal w-[327px] md:w-[540px]'>
      <h2 className='section-title'>새 컬럼 생성</h2>
      <div className='my-6 md:mb-7 md:mt-8'>
        <label className='label'>이름</label>
        <input
          type='text'
          className={`input mt-[10px] ${errorMessage ? 'border-2 border-red' : ''}`}
          placeholder='생성할 컬럼 이름을 입력해 주세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleValidCheck}
        />
        {errorMessage && <p className='mt-2 text-sm text-red'>{errorMessage}</p>}
      </div>
      <div className='flex justify-between md:justify-end md:gap-3'>
        <ModalCancelButton type='button' onClick={closeModal}>
          취소
        </ModalCancelButton>
        <ModalActionButton type='button' onClick={handlePostNewColumn} disabled={!(name && !errorMessage)}>
          생성
        </ModalActionButton>
      </div>
    </div>
  );
}
