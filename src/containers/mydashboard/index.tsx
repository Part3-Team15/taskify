import Head from 'next/head';

import DashboardList from './DashboardList';
import InvitedDashboardList from './InvitedDashboardList';

export default function MyDashboard() {
  return (
    <div className='flex min-w-full flex-col gap-11 bg-gray-fa p-10'>
      <Head>
        <title>Taskify | 내 대시보드</title>
      </Head>
      <DashboardList />
      <InvitedDashboardList />
    </div>
  );
}
