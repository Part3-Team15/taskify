import { AxiosError } from 'axios';
import { MouseEventHandler, useState, ChangeEvent } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import useModal from '@/hooks/useModal';
import { postMemberInvite } from '@/services/postService';
import { InviteMemberModalProps } from '@/types/Modal.interface';

export default function InviteMemberModal({
  handleCloseModal,
  modalProps,
}: {
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
  modalProps: InviteMemberModalProps;
}) {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(emailRegex.test(value));
  };

  const handleMemberInviteButton = async () => {
    try {
      await postMemberInvite(modalProps.dashboardId, { email });
      openModal({ type: 'inviteMemberSuccess' });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.message);
      } else {
        console.error(error);
      }
      openModal({ type: 'inviteMemberFailed' });
    }
  };

  return (
    <div className='flex h-[266px] w-[327px] flex-col justify-between rounded-[8px] bg-white px-[18px] py-[32px] md:h-[301px] md:w-[540px]'>
      <h1 className='text-[20px] font-bold text-black-33 md:text-[24px]'>초대하기</h1>
      <div className='flex flex-col'>
        <label className='mb-[10px] text-[16px] text-black-33 md:text-[18px]'>이메일</label>
        {/* 이미 초대한 멤버일 경우 Input 에러 표시 */}
        <input
          className={`h-[42px] rounded-[6px] border border-gray-d9 px-[15px] text-[14px] md:h-[48px] md:text-[16px] ${!isValid ? 'border-2 border-red' : ''}`}
          type='text'
          placeholder='초대할 멤버의 이메일을 입력해 주세요'
          value={email}
          onChange={handleChange}
        />
        {!isValid && <p className='mt-2 text-[14px] text-red'>{'유효한 이메일 주소를 입력해주세요.'}</p>}
      </div>
      <div className='flex justify-between md:justify-end md:gap-[15px]'>
        <ModalCancelButton onClick={handleCloseModal}>취소</ModalCancelButton>
        <ModalActionButton disabled={email.length === 0 || !isValid} onClick={handleMemberInviteButton}>
          초대
        </ModalActionButton>
      </div>
    </div>
  );
}
