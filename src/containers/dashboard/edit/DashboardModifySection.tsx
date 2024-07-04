import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ActionButton from '@/components/Button/ActionButton';
import Toggle from '@/components/Toggle';
import { DASHBOARD_COLOR_OBJ } from '@/constants';
import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { getDashboard } from '@/services/getService';
import { putDashboardInfo } from '@/services/putService';
import { DashboardColor, DashboardInfoState, Dashboard } from '@/types/Dashboard.interface';
import { addShareAccount, checkPublic, removeShareAccount } from '@/utils/shareAccount';

interface ModifySectionProps {
  isPublic: boolean;
  onToggleClick: () => void;
}

export default function DashboardModifySection({ isPublic, onToggleClick }: ModifySectionProps) {
  const router = useRouter();
  const { id } = router.query;
  const { openNotificationModal } = useModal();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState('');

  const [value, setValue] = useState<DashboardInfoState>({
    title: '',
    color: '',
  });
  const [selectedColor, setSelectedColor] = useState<DashboardColor>('green');
  const [fixedTitle, setFixedTitle] = useState<string>('');
  const [fixedColor, setFixedColor] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const getColorString = (colorValue: string): string | undefined => {
    return (Object.keys(DASHBOARD_COLOR_OBJ) as (keyof typeof DASHBOARD_COLOR_OBJ)[]).find(
      (key: keyof typeof DASHBOARD_COLOR_OBJ) => DASHBOARD_COLOR_OBJ[key] === colorValue,
    );
  };

  const {
    data: dashboard,
    isLoading,
    error,
  } = useFetchData<Dashboard>(['dashboard', id], () => getDashboard(id as string));

  const handleModifyButton = async () => {
    const handleIsPublicChange = async () => {
      const initIsPublic = await checkPublic(Number(id));
      if (isPublic === initIsPublic) return;
      if (isPublic) {
        await addShareAccount(Number(id));
      } else {
        await removeShareAccount(Number(id));
      }
      queryClient.invalidateQueries({ queryKey: ['members', id] });
    };

    try {
      await putDashboardInfo(Number(id), value);
      await handleIsPublicChange();
      openNotificationModal({ text: '대시보드 정보가 수정되었습니다!' });
      queryClient.invalidateQueries({ queryKey: ['dashboard', id] });
      queryClient.invalidateQueries({ queryKey: ['sideDashboards'] });
    } catch {
      openNotificationModal({ text: '대시보드 정보 수정을 실패하였습니다.' });
    }
  };

  useEffect(() => {
    if (dashboard) {
      setValue({
        title: dashboard.title,
        color: dashboard.color,
      });
      setFixedTitle(dashboard.title);
      setFixedColor(dashboard.color);
      const colorKey = getColorString(dashboard.color);
      if (colorKey) {
        setSelectedColor(colorKey as DashboardColor);
      }
    }
  }, [dashboard]);

  useEffect(() => {
    const handleButtonControl = async () => {
      const initIsPublic = await checkPublic(Number(id));
      setIsButtonDisabled(
        (value.title === fixedTitle && value.color === fixedColor && isPublic === initIsPublic) ||
          value.title.trim() === '',
      );
    };
    handleButtonControl();
  }, [value.title, value.color, fixedTitle, fixedColor, isPublic]);

  const handleColorSelect = (color: DashboardColor) => {
    setSelectedColor(color);
    setValue((prevValue) => ({
      ...prevValue,
      color: DASHBOARD_COLOR_OBJ[color],
    }));
  };

  const handleValidCheck = () => {
    if (!value.title) {
      setErrorMessage('이름을 입력해주세요.');
    } else if (value.title.length > 15) {
      setErrorMessage('15자 이내로 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  if (isLoading) {
    return <section className='section h-[211px] animate-pulse bg-gray-f5 px-[18px] py-[32px] md:h-[256px]'></section>;
  }

  if (error) {
    return (
      <section className='section flex h-[211px] items-center justify-center px-[18px] py-[32px] md:h-[256px]'>
        <p role='alert' className='text-[22px] font-bold text-black-33'>
          대시보드 정보가 없습니다!
        </p>
      </section>
    );
  }

  return (
    <section className='section relative flex h-[211px] flex-col justify-between px-[18px] py-[22px] md:h-[256px] md:py-[26px]'>
      <header className='flex justify-between'>
        <h2 className='text-[20px] font-bold text-black-33'>{fixedTitle}</h2>
        <div className='align-center gap-2 md:gap-3'>
          <span>공유</span>
          <Toggle isOn={isPublic} onToggleClick={onToggleClick} />
        </div>
      </header>
      <main>
        <div className='flex flex-col'>
          <label htmlFor='dashboardTitle' className='label mb-[12px] text-[16px] md:text-[18px]'>
            대시보드 이름
          </label>
          <input
            className='input text-[14px] md:text-[16px]'
            id='dashboardTitle'
            type='text'
            value={value.title}
            placeholder='대시보드 이름을 입력해 주세요'
            onBlur={handleValidCheck}
            onChange={(e) => setValue((prevValue) => ({ ...prevValue, title: e.target.value }))}
          />
          {errorMessage && <p className='mt-2 text-sm text-red'>{errorMessage}</p>}
        </div>
      </main>
      <footer className='flex items-center justify-between'>
        <div className='flex gap-[10px]'>
          {(['green', 'purple', 'orange', 'blue', 'pink'] as DashboardColor[]).map((color) => (
            <button
              key={`${color}-button`}
              style={{ backgroundColor: DASHBOARD_COLOR_OBJ[color] }}
              className={`flex size-[20px] items-center justify-center rounded-full bg-white md:size-[30px]`}
              onClick={() => handleColorSelect(color)}
            >
              {selectedColor === color && (
                <Image src='/icons/check.svg' alt='체크' width={10} height={10} className='md:size-[16px]' />
              )}
            </button>
          ))}
        </div>
        <ActionButton onClick={handleModifyButton} disabled={isButtonDisabled || !!errorMessage}>
          변경
        </ActionButton>
      </footer>
    </section>
  );
}
