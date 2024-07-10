import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import DefaultHeader from '../DefaultHeader';
import UserMenuDropdown from '../UserMenuDropdown';

import Buttons from './Buttons';
import MemberProfiles from './MemberProfiles';

import ThemeChangeButton from '@/components/Button/ThemeChangeButton';
import useFetchData from '@/hooks/useFetchData';
import { getDashboard } from '@/services/getService';
import { Dashboard } from '@/types/Dashboard.interface';

// NOTE: 대시보드 | 대시보드 관리에서 보여줄 헤더 컴포넌트
export default function DashboardHeader() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dashboard,
    isLoading,
    error,
  } = useFetchData<Dashboard>(['dashboard', id], () => getDashboard(id as string));

  if (isLoading || !id) {
    return <DefaultHeader title='로딩중...' />;
  }

  if (!dashboard) {
    console.log(error);
    return <DefaultHeader title='대시보드 정보를 불러오지 못했습니다.' />;
  }

  const { id: dashboardId, title, createdByMe } = dashboard;

  return (
    <header className='relative flex h-[60px] w-full items-center justify-end border-b border-gray-d9 bg-white px-3 text-black-33 transition-colors md:h-[70px] md:px-5 lg:justify-between lg:px-10 dark:border-dark-200 dark:bg-dark dark:text-dark-10'>
      <Head>
        <title>Taskify | {title}</title>
      </Head>

      {/* 대시보드 이름 */}
      <div className='hidden items-center gap-2 lg:flex'>
        <h1 className='text-xl font-bold'>{title}</h1>
        {createdByMe && <Image src='/icons/crown.svg' alt='왕관 아이콘' width={20} height={16} />}
      </div>

      <div className='flex gap-4 md:gap-5 lg:gap-10'>
        {createdByMe && <Buttons id={dashboardId} />}
        <div className='flex items-center gap-3 md:gap-5 lg:gap-8'>
          <MemberProfiles id={String(dashboardId)} />
          <div className='header-divider' />
          <ThemeChangeButton className='-m-2 p-2 md:-m-3 lg:-m-5' />
          <div className='header-divider' />
          <UserMenuDropdown />
        </div>
      </div>
    </header>
  );
}
