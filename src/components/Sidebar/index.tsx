import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import DashboardItem from './DashboardItem';

import plus from '@/../public/icons/plus.svg';
import { useFetchDashboards } from '@/hooks/useFetchDashboards';
import { RootState } from '@/store/store';

export default function Sidebar() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading } = useFetchDashboards();
  const dashboards = useSelector((state: RootState) => state.dashboards.dashboards);

  return (
    <aside className='flex h-screen min-w-16 flex-col gap-14 border-r border-gray-d9 px-3 py-5 md:min-w-40 lg:min-w-72'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Link href='/' className='flex items-center justify-center md:block md:px-3'>
            <Image src={'/icons/logo.svg'} alt='logo' priority className='hidden md:block' width={110} height={33} />
            <Image
              src={'/icons/logo-small.svg'}
              alt='logo'
              priority
              className='block md:hidden'
              width={27}
              height={27}
            />
          </Link>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-center md:justify-between'>
              <p className='hidden px-3 text-xs font-bold text-gray-78 md:block'>Dashboards</p>

              {/* 모달 연결 해야함 */}
              <a href='#' className='p-3'>
                <Image src={'/icons/plus.svg'} alt='add' width={15} height={15} />
              </a>
            </div>
            <div className='mx-2 mb-2 border-b border-gray-d9' />
            <ul className='flex flex-col gap-2'>
              {dashboards.map((dashboard) => (
                <DashboardItem key={dashboard.id} dashboard={dashboard} nowDashboard={Number(id)} />
              ))}
            </ul>
          </div>
        </>
      )}
    </aside>
  );
}
