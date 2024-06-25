import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import DashboardItem from './DashboardItem';

import logo from '@/../public/icons/logo.svg';
import plus from '@/../public/icons/plus.svg';
import { useFetchDashboards } from '@/hooks/useFetchDashboards';
import { RootState } from '@/store/store';

export default function Sidebar() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading } = useFetchDashboards();
  const dashboards = useSelector((state: RootState) => state.dashboards.dashboards);

  if (isLoading) return <div>Loading...</div>;

  return (
    <aside className='flex h-screen w-72 flex-col gap-14 border-r border-gray-d9 px-3 py-5'>
      <Link href='/' className='px-3'>
        <Image src={logo} alt='logo' priority />
      </Link>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <p className='px-3 text-xs font-bold text-gray-78'>Dashboards</p>

          {/* 모달 연결 해야함 */}
          <a href='#' className='p-3'>
            <Image src={plus} alt='add' />
          </a>
        </div>
        <div className='mx-2 mb-2 border-b border-gray-d9' />
        <ul className='flex flex-col gap-2'>
          {dashboards.map((dashboard) => (
            <DashboardItem key={dashboard.id} dashboard={dashboard} nowDashboard={Number(id)} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
