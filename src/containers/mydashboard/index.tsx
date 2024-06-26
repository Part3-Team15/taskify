import DashboardList from './DashboardList';
import InvitedDashboardList from './InvitedDashboardList';

export default function MyDashboard() {
  return (
    <div className='flex h-dvh max-h-[calc(100%-70px)] w-full max-w-screen-lg flex-col gap-11 bg-gray-fa p-10'>
      <DashboardList />
      <InvitedDashboardList />
    </div>
  );
}
