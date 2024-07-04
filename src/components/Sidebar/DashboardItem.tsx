import Image from 'next/image';
import Link from 'next/link';

import { Dashboard } from '@/types/Dashboard.interface';

interface DashboardItemProps {
  dashboard: Dashboard;
  nowDashboard?: number;
}

export default function DashboardItem({ dashboard, nowDashboard }: DashboardItemProps) {
  const isActive = nowDashboard === dashboard.id;
  const itemClasses = `${isActive ? 'bg-violet-f1 text-black-33/80 dark:bg-dark-purple' : 'text-gray-78'}`;

  return (
    <li>
      <Link
        href={`/dashboard/${dashboard.id}`}
        className={`${itemClasses} btn-violet-light dark:btn-violet-dark flex items-center justify-center rounded-md border-none py-3 hover:bg-violet/20 md:justify-start md:px-3 dark:text-dark-10`}
      >
        <div className='rounded-full p-1' style={{ backgroundColor: dashboard.color }} />
        <div className='ml-4 mr-[6px] hidden h-[28px] overflow-x-hidden text-nowrap text-lg font-medium md:block'>
          <p>{dashboard.title}</p>
        </div>
        {dashboard.createdByMe && (
          <Image src={'/icons/crown.svg'} alt='my' className='hidden md:block' width={18} height={14} />
        )}
      </Link>
    </li>
  );
}
