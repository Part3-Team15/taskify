import DashboardList from './DashboardList';
import InvitedDashboardList from './InvitedDashboardList';

export default function MyDashboard() {
  return (
    <div className='flex h-dvh max-h-[calc(100dvh-70px)] w-full max-w-min flex-col gap-11 bg-gray-fa p-10'>
      <DashboardList />
      <InvitedDashboardList />
    </div>
  );
}
