import Head from 'next/head';

import DashboardList from '@/containers/mydashboard/DashboardList';
import InvitedDashboardList from '@/containers/mydashboard/InvitedDashboardList';

export default function MyDashboardPage() {
  return (
    <div className='flex h-full min-w-full flex-col gap-11 bg-gray-fa p-10 md:h-[calc(100vh-70px)]'>
      <Head>
        <title>Taskify | 내 대시보드</title>
      </Head>
      <DashboardList />
      <InvitedDashboardList />
    </div>
  );
}
