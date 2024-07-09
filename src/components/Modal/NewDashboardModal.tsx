import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Toggle from '../Toggle';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import { DASHBOARD_COLOR_OBJ } from '@/constants';
import useModal from '@/hooks/useModal';
import { postNewDashboard } from '@/services/postService';
import { DashboardColor, DashboardInfoState } from '@/types/Dashboard.interface';
import { addShareAccount } from '@/utils/shareAccount';

export default function NewDashboardModal() {
  const [value, setValue] = useState<DashboardInfoState>({
    title: '',
    color: DASHBOARD_COLOR_OBJ['green'],
  });
  const [isPublic, setIsPublic] = useState(false);
  const [selectedColor, setSelectedColor] = useState<DashboardColor>('green');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const queryClient = useQueryClient();
  const { openNotificationModal, closeModal } = useModal();

  const handleValidCheck = () => {
    if (!value.title) {
      setErrorMessage('이름을 입력해주세요.');
    } else if (value.title.length > 15) {
      setErrorMessage('15자 이내로 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  const handleColorSelect = (color: DashboardColor) => {
    setSelectedColor(color);
    setValue((prevValue) => ({
      ...prevValue,
      color: DASHBOARD_COLOR_OBJ[color],
    }));
  };

  const handlePostDashboard = async () => {
    try {
      const { id } = await postNewDashboard(value);
      if (isPublic) {
        addShareAccount(id);
      }

      queryClient.invalidateQueries({ queryKey: ['sideDashboards'] });
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      openNotificationModal({ text: '새로운 대시보드가 생성되었습니다!' });
      router.push(`/dashboard/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message || '대시보드 생성을 실패하였습니다');
      } else {
        setErrorMessage('대시보드 생성을 실패하였습니다');
      }
    }
  };

  return (
    <div className='modal w-[327px] md:w-[540px]'>
      <h1 className='section-title'>새로운 대시보드</h1>
      <div className='my-6 md:mb-7 md:mt-8'>
        <label className='label'>대시보드</label>
        <input
          className={`input mt-[10px] ${errorMessage ? 'border-2 border-red' : ''}`}
          type='text'
          placeholder='생성할 대시보드 이름을 입력해 주세요'
          value={value.title}
          onBlur={handleValidCheck}
          onChange={(e) => {
            setValue((prevValue) => ({
              ...prevValue,
              title: e.target.value,
            }));
          }}
        />
        {errorMessage && <p className='mt-2 text-sm text-red'>{errorMessage}</p>}
      </div>
      <div className='mb-6 flex justify-between md:mb-7'>
        <div className='flex gap-1.5 md:gap-[10px]'>
          {(['green', 'purple', 'orange', 'blue', 'pink'] as DashboardColor[]).map((color) => (
            <button
              key={`${color}-button`}
              type='button'
              style={{ backgroundColor: DASHBOARD_COLOR_OBJ[color] }}
              className={`flex size-[28px] items-center justify-center rounded-full bg-white md:size-[30px]`}
              onClick={() => handleColorSelect(color)}
            >
              {selectedColor === color && <Image src='/icons/check.svg' alt='체크' width={16} height={16} />}
            </button>
          ))}
        </div>
        <div className='align-center gap-2 md:gap-3'>
          <span>공유</span>
          <Toggle isOn={isPublic} onToggleClick={() => setIsPublic((prevIsPublic) => !prevIsPublic)} />
        </div>
      </div>
      <div className='flex justify-between md:justify-end md:gap-3'>
        <ModalCancelButton type='button' onClick={closeModal}>
          취소
        </ModalCancelButton>
        <ModalActionButton type='button' disabled={!(value.title && !errorMessage)} onClick={handlePostDashboard}>
          생성
        </ModalActionButton>
      </div>
    </div>
  );
}
