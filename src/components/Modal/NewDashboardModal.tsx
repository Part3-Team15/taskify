import Image from 'next/image';
import { useState } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import { DASHBOARD_COLOR_OBJ } from '@/constants';
import useModal from '@/hooks/useModal';
import { postNewDashboard } from '@/services/postService';

type DashboardColor = 'green' | 'purple' | 'orange' | 'blue' | 'pink';

interface DashboardState {
  title: string;
  color: string;
}

export default function NewDashboardModal() {
  const [value, setValue] = useState<DashboardState>({
    title: '',
    color: DASHBOARD_COLOR_OBJ['green'],
  });

  const [selectedColor, setSelectedColor] = useState<DashboardColor>('green');

  const { openModal, closeModal } = useModal();

  const handleColorSelect = (color: DashboardColor) => {
    setSelectedColor(color);
    setValue((prevValue) => ({
      ...prevValue,
      color: DASHBOARD_COLOR_OBJ[color],
    }));
  };

  const handlePostDashboard = async () => {
    try {
      await postNewDashboard(value);
      openModal({ type: 'textModal', modalProps: { text: '새로운 대시보드가 생성되었습니다!' } });
    } catch {
      openModal({ type: 'textModal', modalProps: { text: '대시보드 생성을 실패하였습니다.' } });
    }
  };

  return (
    <div className='flex h-[293px] w-[327px] flex-col justify-between rounded-[8px] bg-white px-[18px] py-[32px] md:h-[334px] md:w-[540px]'>
      <h1 className='text-[20px] font-bold text-black-33 md:text-[24px]'>새로운 대시보드</h1>
      <div className='flex flex-col'>
        <label className='mb-[10px] text-[16px] text-black-33 md:text-[18px]'>대시보드 이름</label>
        <input
          className='h-[42px] rounded-[6px] border border-gray-d9 px-[15px] text-[14px] md:h-[48px] md:text-[16px]'
          type='text'
          placeholder='생성할 대시보드 이름을 입력해 주세요'
          value={value.title}
          onChange={(e) => {
            setValue((prevValue) => ({
              ...prevValue,
              title: e.target.value,
            }));
          }}
        />
      </div>
      <div className='flex gap-[10px]'>
        {(['green', 'purple', 'orange', 'blue', 'pink'] as DashboardColor[]).map((color) => (
          <button
            key={`${color}-button`}
            style={{ backgroundColor: DASHBOARD_COLOR_OBJ[color] }}
            className={`flex size-[28px] items-center justify-center rounded-full bg-white md:size-[30px]`}
            onClick={() => handleColorSelect(color)}
          >
            {selectedColor === color && <Image src='/icons/check.svg' alt='체크' width={16} height={16} />}
          </button>
        ))}
      </div>
      <div className='flex justify-between md:justify-end md:gap-[15px]'>
        <ModalCancelButton onClick={closeModal}>취소</ModalCancelButton>
        <ModalActionButton disabled={value.title.length === 0} onClick={handlePostDashboard}>
          생성
        </ModalActionButton>
      </div>
    </div>
  );
}
