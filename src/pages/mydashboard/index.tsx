import { getCookies } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import DashboardList from '@/containers/mydashboard/DashboardList';
import InvitedDashboardList from '@/containers/mydashboard/InvitedDashboardList';
import instance from '@/services/axios';
import { DashboardsResponse } from '@/types/Dashboard.interface';
import { InvitationsResponse } from '@/types/Invitation.interface';

interface MyDashboardPageProps {
  initialDashboard: DashboardsResponse; // 타입 정의에 따라 변경
  initialInvitedDashboard: InvitationsResponse;
}

export default function MyDashboardPage({ initialDashboard, initialInvitedDashboard }: MyDashboardPageProps) {
  return (
    <div className='flex h-full min-w-full flex-col gap-11 p-10'>
      <Head>
        <title>Taskify | 내 대시보드</title>
      </Head>
      <DashboardList initialDashboard={initialDashboard} />
      <InvitedDashboardList initialInvitedDashboard={initialInvitedDashboard} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = getCookies({ req, res });
  const token = cookies['token'];

  let initialDashboard: DashboardsResponse | null = null;
  let initialInvitedDashboard: InvitationsResponse | null = null;

  if (token) {
    const dashboardResponse = await instance.get<DashboardsResponse>(
      '/dashboards?navigationMethod=pagination&page=1&size=5',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const invitationsResponse = await instance.get<InvitationsResponse>('/invitations?size=10', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    initialDashboard = dashboardResponse.data;
    initialInvitedDashboard = invitationsResponse.data;
  }

  return {
    props: {
      initialDashboard,
      initialInvitedDashboard,
    },
  };
};
