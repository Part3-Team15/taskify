import DashboardList from './DashboardList';
import InvitedDashboardList from './InvitedDashboardList';

export default function MyDashboard() {
  return (
    <div className='flex size-full max-w-min flex-col gap-11 bg-gray-fa p-10 md:max-h-[calc(100vh-70px)]'>
      <DashboardList />
      <InvitedDashboardList />
    </div>
  );
}
