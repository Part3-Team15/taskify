import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ActionButton from '@/components/Button/ActionButton';
import { DASHBOARD_COLOR_OBJ } from '@/constants';
import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { getDashboard } from '@/services/getService';
import { putDashboardInfo } from '@/services/putService';
import { DashboardColor, DashboardInfoState, Dashboard } from '@/types/Dashboard.interface';

export default function DashboardModifySection() {
  const router = useRouter();
  const { id } = router.query;
  const { openModal } = useModal();

  const [value, setValue] = useState<DashboardInfoState>({
    title: '',
    color: '',
  });
  const [selectedColor, setSelectedColor] = useState<DashboardColor>('green');
  const [fixedTitle, setFixedTitle] = useState<string>('');
  const [fixedColor, setFixedColor] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  // API RESPONSE로 받은 COLOR CODE를 COLOR STRING으로 변환 (ex: #어쩌구저쩌구 -> 'red')
  const getColorString = (colorValue: string): string | undefined => {
    return (Object.keys(DASHBOARD_COLOR_OBJ) as (keyof typeof DASHBOARD_COLOR_OBJ)[]).find(
      (key: keyof typeof DASHBOARD_COLOR_OBJ) => DASHBOARD_COLOR_OBJ[key] === colorValue,
    );
  };

  const {
    data: dashboard,
    isLoading,
    error,
    refetch,
  } = useFetchData<Dashboard>(['dashboard', id], () => getDashboard(id as string));

  const handleModifyButton = async () => {
    try {
      await putDashboardInfo(Number(id), value);
      openModal({ type: 'textModal', modalProps: { text: '대시보드 정보가 수정되었습니다!' } });
      refetch();
    } catch {
      openModal({ type: 'textModal', modalProps: { text: '대시보드 정보 수정을 실패하였습니다.' } });
    }
  };

  useEffect(() => {
    // API Response로 받은 title과 color를 현재 state에 반영
    if (dashboard) {
      setValue({
        title: dashboard.title,
        color: dashboard.color,
      });
      setFixedTitle(dashboard.title); // 서버에 저장된 title과 현재 state title을 비교하기 위한 state
      setFixedColor(dashboard.color); // 서버에 저장된 color와 현재 state color를 비교하기 위한 state
      const colorKey = getColorString(dashboard.color);
      if (colorKey) {
        setSelectedColor(colorKey as DashboardColor);
      }
    }
  }, [dashboard]);

  useEffect(() => {
    // 현재 선택된 컬러와 입력된 대쉬보드 이름이 이전과 같거나 데이터를 입력하지 않았을 때 button disabled
    setIsButtonDisabled((value.title === fixedTitle && value.color === fixedColor) || value.title.trim() === '');
  }, [value.title, value.color, fixedTitle, fixedColor]);

  // 컬러 선택 변경 버튼 함수
  const handleColorSelect = (color: DashboardColor) => {
    setSelectedColor(color);
    setValue((prevValue) => ({
      ...prevValue,
      color: DASHBOARD_COLOR_OBJ[color],
    }));
  };

  if (isLoading) {
    return <section className='section h-[211px] animate-pulse bg-gray-f5 px-[18px] py-[32px] md:h-[256px]'></section>;
  }

  if (error) {
    return (
      <section className='section flex h-[211px] items-center justify-center px-[18px] py-[32px] md:h-[256px]'>
        <h1 className='text-[22px] font-bold text-black-33'>대시보드 정보가 없습니다!</h1>
      </section>
    );
  }

  return (
    <section className='section flex h-[211px] flex-col justify-between px-[18px] py-[22px] md:h-[256px] md:py-[26px]'>
      <header className='flex justify-between'>
        <h2 className='text-[20px] font-bold text-black-33'>{fixedTitle}</h2>
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
      </header>
      <main>
        <div className='flex flex-col'>
          <label htmlFor='dashboardTitle' className='mb-[10px] text-[16px] text-black-33 md:text-[18px]'>
            대시보드 이름
          </label>
          <input
            className='h-[42px] rounded-[6px] border border-gray-d9 px-[15px] text-[14px] md:h-[48px] md:text-[16px]'
            id='dashboardTitle'
            type='text'
            value={value.title}
            placeholder='대시보드 이름을 입력해 주세요'
            onChange={(e) => setValue((prevValue) => ({ ...prevValue, title: e.target.value }))}
          />
        </div>
      </main>
      <footer className='flex justify-end'>
        <ActionButton onClick={handleModifyButton} disabled={isButtonDisabled}>
          변경
        </ActionButton>
      </footer>
    </section>
  );
}
