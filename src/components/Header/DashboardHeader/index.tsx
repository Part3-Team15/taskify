import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import DefaultHeader from '../DefaultHeader';
import UserMenuDropdown from '../UserMenuDropdown';

import Buttons from './Buttons';
import MemberProfiles from './MemberProfiles';

import useFetchData from '@/hooks/useFetchData';
import { getDashboard } from '@/services/getService';
import { Dashboard } from '@/types/Dashboard.interface';

export default function DashboardHeader() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dashboard,
    isLoading,
    error,
  } = useFetchData<Dashboard>(['dashboard', id], () => getDashboard(id as string));

  if (isLoading) {
    return <DefaultHeader title='로딩중...' />;
  }

  if (!dashboard) {
    console.log(error);
    return <DefaultHeader title='대시보드 정보를 불러오지 못했습니다.' />;
  }

  const { id: dashboardId, title, createdByMe } = dashboard;

  return (
    <header className='relative flex h-[60px] w-full items-center justify-end border-b border-gray-d9 bg-white px-3 text-black-33 md:h-[70px] md:px-5 lg:justify-between lg:px-10'>
      <Head>
        <title>Taskify | {title}</title>
      </Head>
      <div className='hidden items-center gap-2 lg:flex'>
        <h1 className='text-xl font-bold'>{title}</h1>
        {createdByMe && <Image src='/icons/crown.svg' alt='왕관 아이콘' width={20} height={16} />}
      </div>
      <div className='flex gap-4 md:gap-5 lg:gap-10'>
        {createdByMe && <Buttons id={dashboardId} />}
        <div className='flex items-center gap-3 md:gap-5 lg:gap-8'>
          <MemberProfiles id={dashboardId} />
          <div className='h-[34px] w-0 border-l border-gray-d9' />
          <UserMenuDropdown />
        </div>
      </div>
    </header>
  );
}
