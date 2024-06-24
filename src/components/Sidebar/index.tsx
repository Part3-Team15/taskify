import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DashboardItem from './DashboardItem';

import logo from '@/../public/icons/logo.svg';
import plus from '@/../public/icons/plus.svg';
import { RootState } from '@/store/store';
import { Dashboard } from '@/types/Dashboard.interface';

export default function Sidebar() {
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const accessToken = useSelector((state: RootState) => state.user.accessToken); // 전역 상태에 저장된 user 정보에서 accessToken을 가져옴

  useEffect(() => {
    // API 호출
    const getDashboardList = async () => {
      try {
        const response = await fetch(
          'https://sp-taskify-api.vercel.app/6-15/dashboards?navigationMethod=pagination&page=1&size=10',
          {
            headers: {
              Authorization: `Bearer ${accessToken as string}`,
              Accept: 'application/json',
            },
          },
        );
        const data = await response.json();
        setDashboardList(data.dashboards);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    getDashboardList();
  }, []);

  return (
    <aside className='mr-4 flex h-screen w-72 flex-col gap-14 border-r border-gray_d9 px-4 py-6'>
      <div>
        <Link href='/'>
          <Image src={logo} alt='logo' priority />
        </Link>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <p className='text-xs font-bold text-gray_78'>Dash boards</p>
          <a href='#' className='p-3'>
            <Image src={plus} alt='add' />
          </a>
        </div>

        <div className='mb-2 border-b border-gray_d9' />

        <ul className='flex flex-col gap-2'>
          {dashboardList.map((dashboard) => (
            <DashboardItem key={dashboard.id} dashboard={dashboard} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
