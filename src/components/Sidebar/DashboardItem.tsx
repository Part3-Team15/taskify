import Image from 'next/image';
import Link from 'next/link';

import crown from '@/../public/icons/crown.svg';
import { Dashboard } from '@/types/Dashboard.interface';

export default function DashboardItem({ dashboard }: { dashboard: Dashboard }) {
  return (
    <li>
      <Link href={`/dashboard/${dashboard.id}`} className='flex items-center gap-4 rounded-md border-0 px-4 py-2'>
        <div className={`rounded-full border-0 p-1`} style={{ backgroundColor: dashboard.color }} />
        <p className='text-sm font-bold'>{dashboard.title}</p>
        {dashboard.createdByMe && <Image src={crown} alt='my' />}
      </Link>
    </li>
  );
}
