import DashboardList from './DashboardList';
import InvitedDashboardList from './InvitedDashboardList';

export default function MyDashboard() {
  return (
    <div className='flex w-full max-w-min flex-col gap-11 bg-gray-fa p-10'>
      <DashboardList />
      <InvitedDashboardList />
    </div>
  );
}
