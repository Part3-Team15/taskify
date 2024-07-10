import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ActionButton from '@/components/Button/ActionButton';
import Toggle from '@/components/Toggle';
import { DASHBOARD_COLOR_OBJ } from '@/constants';
import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { deleteFavorite } from '@/services/deleteService';
import { getDashboard, getFavorites } from '@/services/getService';
import { putDashboardInfo } from '@/services/putService';
import { RootState } from '@/store/store';
import { DashboardColor, DashboardInfoState, Dashboard, FavoriteDashboard } from '@/types/Dashboard.interface';
import { checkFavorite, createFavorite, limitCheckFavorite } from '@/utils/favoriteDashboard';
import { addShareAccount, removeShareAccount } from '@/utils/shareAccount';

interface ModifySectionProps {
  initIsPublic: boolean;
  onPublicChange: (isPublic: boolean) => void;
}

export default function DashboardModifySection({ initIsPublic, onPublicChange }: ModifySectionProps) {
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
  const [isPublic, setIsPublic] = useState<boolean>(initIsPublic);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [initIsFavorite, setInitIsFavorite] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { _id: favoriteUserId } = useSelector((state: RootState) => state.favoritesUser);

  const getColorString = (colorValue: string): string | undefined => {
    return (Object.keys(DASHBOARD_COLOR_OBJ) as (keyof typeof DASHBOARD_COLOR_OBJ)[]).find(
      (key: keyof typeof DASHBOARD_COLOR_OBJ) => DASHBOARD_COLOR_OBJ[key] === colorValue,
    );
  };

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

  const {
    data: dashboard,
    isLoading,
    error,
  } = useFetchData<Dashboard>(['dashboard', id], () => getDashboard(id as string));

  const { data: favoriteList } = useFetchData<FavoriteDashboard[]>(
    ['favorites', favoriteUserId],
    () => getFavorites(favoriteUserId || ''),
    !!favoriteUserId,
  );

  const handlePublicToggle = () => {
    setIsPublic((prevIsPublic) => !prevIsPublic);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const handleModifyButton = async () => {
    const handleIsPublicChange = async () => {
      if (isPublic === initIsPublic) return;
      if (isPublic) {
        await addShareAccount(Number(id));
      } else {
        await removeShareAccount(Number(id));
      }
      queryClient.invalidateQueries({ queryKey: ['members', id] });
      onPublicChange(isPublic);
    };

    const handleFavoriteChange = async () => {
      if (isFavorite === initIsFavorite) return;

      if (favoriteUserId) {
        if (isFavorite) {
          await createFavorite(favoriteUserId, dashboard as FavoriteDashboard, favoriteList || []);
        } else {
          await deleteFavorite(Number(id), favoriteUserId);
        }
        queryClient.invalidateQueries({ queryKey: ['favorites', favoriteUserId] });
        setInitIsFavorite(isFavorite);
      }
    };

    if (favoriteList && limitCheckFavorite(favoriteList) && isFavorite && !initIsFavorite) {
      // NOTE: 즐겨찾기 최대 개수 도달 -> 알림과 함께 즐겨찾기 취소
      setIsFavorite(false);
      openNotificationModal({ text: '즐겨찾기는 최대 3개까지 가능합니다.' });
      return;
    }

    try {
      await putDashboardInfo(Number(id), value);
      await handleFavoriteChange();
      await handleIsPublicChange();
      openNotificationModal({ text: '대시보드 정보가 수정되었습니다!' });
      queryClient.invalidateQueries({ queryKey: ['dashboard', id] });
      queryClient.invalidateQueries({ queryKey: ['sideDashboards'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });

      setIsButtonDisabled(true);
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
    setIsPublic(initIsPublic);
  }, [initIsPublic]);

  useEffect(() => {
    if (id) {
      const newIsFavorite = checkFavorite(favoriteList || [], Number(id));
      setInitIsFavorite(newIsFavorite);
      setIsFavorite(newIsFavorite);
    }
  }, [id, favoriteList]);

  useEffect(() => {
    setIsButtonDisabled(
      (value.title === fixedTitle &&
        value.color === fixedColor &&
        isPublic === initIsPublic &&
        isFavorite === initIsFavorite) ||
        value.title.trim() === '',
    );
  }, [value.title, value.color, fixedTitle, fixedColor, isPublic, isFavorite, favoriteList]);

  if (isLoading) {
    return (
      <section className='section h-[211px] animate-pulse bg-gray-f5 px-[18px] py-[32px] md:h-[256px] dark:bg-dark-300'></section>
    );
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
    <section className='section relative flex flex-col gap-4 px-[18px] py-[22px] transition-colors md:gap-6 md:py-[26px] dark:bg-dark'>
      <header className='flex justify-between'>
        <h2 className='text-[20px] font-bold text-black-33 dark:text-dark-10'>{fixedTitle}</h2>
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex justify-end gap-2'>
            <span>공유</span>
            <Toggle isOn={isPublic} onToggleClick={handlePublicToggle} />
          </div>
          <div className='flex justify-end gap-2'>
            <span>즐겨찾기</span>
            <Toggle isOn={isFavorite} onToggleClick={handleFavoriteToggle} />
          </div>
        </div>
      </header>
      <main>
        <div className='flex flex-col'>
          <label htmlFor='dashboardTitle' className='label mb-[12px] text-[16px] md:text-[18px]'>
            대시보드 이름
          </label>
          <input
            className='input text-[14px] md:text-[16px] dark:bg-dark-300'
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
