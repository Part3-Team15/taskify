import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import { EMAIL_REGEX } from '@/constants';
import useModal from '@/hooks/useModal';
import { postInviteMember } from '@/services/postService';

// NOTE: 구성원 초대 모달
export default function InviteMemberModal() {
  const { openNotificationModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const router = useRouter();
  const { id: dashboardId } = router.query;
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidCheck = () => {
    if (!email) {
      setErrorMessage('이메일을 입력해주세요');
    } else if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('유효한 이메일 주소를 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  const handleInviteClick = async () => {
    try {
      await postInviteMember(Number(dashboardId), { email });
      queryClient.invalidateQueries({ queryKey: ['invitations', dashboardId] });
      openNotificationModal({ text: '해당 멤버를 초대하였습니다!' });
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message || '초대 중 에러가 발생했습니다.');
      } else {
        setErrorMessage('초대 중 에러가 발생했습니다.');
      }
    }
  };

  return (
    <div className='modal w-[327px] md:w-[540px]'>
      <h2 className='section-title'>초대하기</h2>

      {/* 이메일 입력 */}
      <div className='my-6 md:mb-7 md:mt-8'>
        <label className='label'>이메일</label>
        <input
          type='text'
          className={`input mt-[10px] ${errorMessage ? 'border-2 border-red' : ''}`}
          placeholder='초대할 멤버의 이메일을 입력해 주세요'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleValidCheck}
        />
        {errorMessage && <p className='mt-2 text-sm text-red'>{errorMessage}</p>}
      </div>

      {/* 버튼 */}
      <div className='flex justify-between md:justify-end md:gap-3'>
        <ModalCancelButton type='button' onClick={closeModal}>
          취소
        </ModalCancelButton>
        <ModalActionButton type='button' onClick={handleInviteClick} disabled={!(email && !errorMessage)}>
          초대
        </ModalActionButton>
      </div>
    </div>
  );
}
