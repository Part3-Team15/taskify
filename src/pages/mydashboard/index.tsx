import { getCookies } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import DashboardList from '@/containers/mydashboard/DashboardList';
import InvitedDashboardList from '@/containers/mydashboard/InvitedDashboardList';
import instance from '@/services/axios';
import { DashboardsResponse } from '@/types/Dashboard.interface';
import { InvitationsResponse } from '@/types/Invitation.interface';
import { createAuthHeaders } from '@/utils/createAuthHeaders';

interface MyDashboardPageProps {
  initialDashboard: DashboardsResponse;
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
  const accessToken = cookies['accessToken'];

  let initialDashboard: DashboardsResponse | null = null;
  let initialInvitedDashboard: InvitationsResponse | null = null;

  if (accessToken) {
    const authHeaders = createAuthHeaders(accessToken);

    try {
      const [dashboardResponse, invitationsResponse] = await Promise.all([
        instance.get<DashboardsResponse>('/dashboards?navigationMethod=pagination&page=1&size=5', authHeaders),
        instance.get<InvitationsResponse>('/invitations?size=10', authHeaders),
      ]);

      initialDashboard = dashboardResponse.data;
      initialInvitedDashboard = invitationsResponse.data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  return {
    props: {
      initialDashboard,
      initialInvitedDashboard,
    },
  };
};
