import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import NavButton from '../Button/NavButton';

import DashboardItem from './DashboardItem';

import { useFavoriteUser } from '@/hooks/useFavoriteUser';
import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { getDashboardsList, getFavorites } from '@/services/getService';
import { RootState } from '@/store/store';
import { DashboardsResponse, FavoriteDashboard } from '@/types/Dashboard.interface';

export default function Sidebar() {
  const { user } = useSelector((state: RootState) => state.user);
  const favoriteUser = useSelector((state: RootState) => state.favoritesUser);
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState<number>(1);
  const { openNewDashboardModal } = useModal();

  const { data: dashboardsData, isLoading: isDashboardsLoading } = useFetchData<DashboardsResponse>(
    ['sideDashboards', page],
    () => getDashboardsList('pagination', page, 10),
  );
  const totalPage = dashboardsData ? Math.ceil(dashboardsData.totalCount / 10) : 1;
  const activePath = router.pathname;

  const { data: favoriteList } = useFetchData<FavoriteDashboard[]>(
    ['favorites', favoriteUser._id],
    () => getFavorites(favoriteUser._id || ''),
    false,
    !!favoriteUser._id,
  );

  const { mutate: checkFavoriteUser } = useFavoriteUser();

  useEffect(() => {
    if (user?.id && !favoriteUser.userId) {
      checkFavoriteUser();
    }
  }, [user?.id, favoriteUser.userId]);

  const handlePageChange = (direction: 'next' | 'prev') => {
    setPage((prev) => (direction === 'next' ? prev + 1 : prev - 1));
  };

  return (
    <aside className='flex min-w-16 max-w-[300px] flex-col border-r border-gray-d9 bg-white px-3 py-5 transition-all md:min-w-40 lg:min-w-72 dark:border-dark-200 dark:bg-dark'>
      <Link href={user ? '/mydashboard' : '/'} className='flex items-center justify-center pb-14 md:block md:px-3'>
        <Image
          src={'/icons/logo.svg'}
          alt='logo'
          width={110}
          height={33}
          priority
          className='hidden md:block dark:hidden'
        />
        <Image
          src={'/icons/logo-white.svg'}
          alt='logo'
          width={110}
          height={33}
          priority
          className='hidden dark:md:block'
        />
        <Image
          src={'/icons/logo-s.svg'}
          alt='logo'
          width={27}
          height={27}
          priority
          className='block size-[27px] md:hidden dark:hidden'
        />
        <Image
          src={'/icons/logo-white-s.svg'}
          alt='logo'
          width={27}
          height={27}
          priority
          className='hidden size-[27px] dark:block dark:md:hidden'
        />
      </Link>

      <div className='flex grow flex-col gap-2'>
        <div className='flex items-center justify-center md:justify-between'>
          <p className='hidden px-3 text-xs font-bold text-gray-78 md:block dark:text-dark-10'>대시보드 목록</p>
          <button
            className='p-3'
            onClick={() => {
              openNewDashboardModal();
            }}
          >
            <Image src={'/icons/plus.svg'} alt='add' width={15} height={15} />
          </button>
        </div>

        <div className='mx-2 mb-2 border-b border-gray-d9 dark:border-dark-200' />

        <div className='flex flex-col gap-2'>
          <Link
            href='/mydashboard'
            className={`${activePath === '/mydashboard' ? 'bg-violet-f1 text-black-33/80 dark:bg-dark-purple' : 'text-gray-78'} btn-violet-light dark:btn-violet-dark flex items-center justify-center rounded-md border-none py-1 hover:bg-violet/20 md:justify-start md:px-3 md:py-2`}
          >
            <p className='hidden pr-[6px] text-lg font-semibold md:block'>📋 내 대시보드</p>
            <p className='flex items-center justify-center text-lg font-medium md:hidden'>📋</p>
          </Link>

          <Link
            href='/mypage'
            className={`${activePath === '/mypage' ? 'bg-violet-f1 text-black-33/80 dark:bg-dark-purple' : 'text-gray-78'} btn-violet-light dark:btn-violet-dark flex items-center justify-center rounded-md border-none py-1 hover:bg-violet/20 md:justify-start md:px-3 md:py-2`}
          >
            <p className='hidden pr-[6px] text-lg font-semibold md:block'>😺 내 계정</p>
            <p className='flex items-center justify-center text-lg font-medium md:hidden'>😺</p>
          </Link>
        </div>

        <div className='m-2 border-b border-gray-d9 dark:border-dark-200' />

        {favoriteList && favoriteList.length > 0 && (
          <>
            <div className='flex flex-col items-stretch gap-2'>
              <p className='align-center text-lg text-gray-78 md:px-3 dark:text-dark-10'>
                ⭐
                <span className='hidden px-2 text-[14px] font-extrabold text-gray-78 md:block dark:text-dark-10'>
                  즐겨찾기
                </span>
              </p>

              <ul className='flex flex-col gap-2'>
                {favoriteList.map((favorite) => (
                  <DashboardItem key={favorite.id} dashboard={favorite} nowDashboard={Number(id)} />
                ))}
              </ul>
            </div>
            <div className='mx-2 mb-2 border-b border-gray-d9 dark:border-dark-200' />
          </>
        )}

        {isDashboardsLoading ? (
          <ul className='flex h-min animate-pulse flex-col gap-2'>
            {[...Array(10)].map((_, i) => (
              <li
                key={i}
                className='flex min-h-[32px] items-center justify-center rounded-md bg-gray-fa py-3 md:min-h-[52px] md:justify-start md:px-3 dark:bg-dark-300'
              ></li>
            ))}
          </ul>
        ) : (
          <>
            <ul className='flex h-min flex-col gap-2'>
              {dashboardsData?.dashboards.map((dashboard) => (
                <DashboardItem key={dashboard.id} dashboard={dashboard} nowDashboard={Number(id)} />
              ))}
            </ul>

            {totalPage > 1 && (
              <div className='flex flex-col items-center pt-3 md:flex-row'>
                <NavButton direction='left' onClick={() => handlePageChange('prev')} isDisable={page === 1} />
                <NavButton direction='right' onClick={() => handlePageChange('next')} isDisable={page === totalPage} />
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
