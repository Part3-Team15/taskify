import Image from 'next/image';
import Link from 'next/link';

import { Dashboard } from '@/types/Dashboard.interface';

interface DashboardItemProps {
  dashboard: Dashboard;
  nowDashboard?: number;
}

export default function DashboardItem({ dashboard, nowDashboard }: DashboardItemProps) {
  const isActive = nowDashboard === dashboard.id;
  const itemClasses = `${isActive ? 'bg-violet-f1 text-black-33' : 'text-gray-78'} `;

  return (
    <li>
      <Link
        href={`/dashboard/${dashboard.id}`}
        className={`${itemClasses} flex items-center justify-center rounded-md py-3 hover:bg-violet/20 md:justify-start md:px-3`}
      >
        <div className='rounded-full p-1' style={{ backgroundColor: dashboard.color }} />
        <p className='hidden pl-4 pr-[6px] text-lg font-medium md:block'>{dashboard.title}</p>
        {dashboard.createdByMe && (
          <Image src={'/icons/crown.svg'} alt='my' className='hidden md:block' width={18} height={14} />
        )}
      </Link>
    </li>
  );
}
