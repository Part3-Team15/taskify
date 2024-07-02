import Head from 'next/head';

import DashboardEdit from '@/containers/dashboard/edit';

export default function DashboardEditPage() {
  return (
    <>
      <Head>
        <title>Taskify | 대시보드 수정</title>
      </Head>
      <DashboardEdit />
    </>
  );
}
