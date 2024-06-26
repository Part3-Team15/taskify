import Image from 'next/image';
import Link from 'next/link';

import crown from '@/../public/icons/crown.svg';
import { Dashboard } from '@/types/Dashboard.interface';

interface DashboardItemProps {
  dashboard: Dashboard;
  nowDashboard?: number;
}

export default function DashboardItem({ dashboard, nowDashboard }: DashboardItemProps) {
  const isActive = nowDashboard === dashboard.id;
  const itemClasses = `flex items-center justify-center md:justify-start rounded-md py-3 md:px-3 ${isActive ? 'bg-violet-f1 text-black-33' : 'text-gray-78'} hover:bg-violet-f1`;

  return (
    <li>
      <Link href={`/dashboard/${dashboard.id}`} className={itemClasses}>
        <div className='rounded-full p-1' style={{ backgroundColor: dashboard.color }} />
        <p className='hidden pl-4 pr-[6px] text-lg font-medium md:block'>{dashboard.title}</p>
        {dashboard.createdByMe && (
          <Image src={'/icons/crown.svg'} alt='my' className='hidden md:block' width={18} height={14} />
        )}
      </Link>
    </li>
  );
}
