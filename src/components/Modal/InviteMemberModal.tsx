import { MouseEventHandler, useState } from 'react';

import Button from '@/components/Button';

export default function InviteMemberModal({
  handleCloseModal,
}: {
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
}) {
  const [projectName, setProjectName] = useState('');

  return (
    <div className='flex h-[276px] w-[540px] flex-col justify-between rounded-[8px] bg-white px-[28px] py-[32px]'>
      <h1 className='text-[24px] font-bold text-black-33'>초대하기</h1>
      <div className='flex flex-col'>
        <label className='mb-[10px] text-black-33'>이메일</label>
        <input
          className='h-[48px] rounded-[6px] border border-gray-d9 px-[15px]'
          type='text'
          placeholder='초대할 멤버의 이메일을 입력해 주세요'
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
        />
      </div>
      <div className='flex justify-end gap-[10px]'>
        <div className='h-[48px] w-[120px]'>
          <Button variant='secondary' onClick={handleCloseModal}>
            취소
          </Button>
        </div>
        <div className='h-[48px] w-[120px]'>
          <Button>초대</Button>
        </div>
      </div>
    </div>
  );
}
