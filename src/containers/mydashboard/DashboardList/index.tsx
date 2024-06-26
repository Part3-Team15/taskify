import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import arrowWhite from '@/../public/icons/arrow-white.svg';
import arrowBlack from '@/../public/icons/arrow-black.svg';
import crown from '@/../public/icons/crown.svg';
import plus from '@/../public/icons/plus-filled.svg';
import useFetchData from '@/hooks/useFetchData';
import { getDashboardsList } from '@/services/getService';
import { DashboardsResponse } from '@/types/Dashboard.interface';

export default function DashboardList() {
  const [currentChunk, setCurrentChunk] = useState<number>(1);

  const { data: dashboardResponse, error } = useFetchData<DashboardsResponse>(['dashboards', currentChunk], () =>
    getDashboardsList('pagination', currentChunk, 5),
  );

  if (error) {
    return (
      <div>
        <div>Error fetching data</div>
        <div>{error.message}</div>
      </div>
    );
  }

  const handleNext = () => {
    const nextChunk = currentChunk + 1;

    if (dashboardResponse && nextChunk <= Math.ceil(dashboardResponse.totalCount / 5)) {
      setCurrentChunk((prev) => prev + 1);
    }
    console.log('nextChunk', nextChunk);
  };

  const handlePrev = () => {
    const prevChunk = currentChunk - 1;

    if (prevChunk >= 1) {
      setCurrentChunk((prev) => prev - 1);
    }
    console.log('prevChunk', prevChunk);
  };

  return (
    <section className='w-max'>
      <ul className='grid gap-3 font-semibold text-black-33 md:min-h-[216px] md:grid-cols-2 lg:min-h-[140px] lg:grid-cols-3'>
        <li className='h-16 w-64 rounded-lg border border-gray-d9 bg-white md:w-60 lg:w-80'>
          <button className='flex size-full items-center justify-center gap-4 hover:bg-violet-f1'>
            새로운 대시보드
            <Image src={plus} alt='plus' />
          </button>
        </li>
        {dashboardResponse?.dashboards.map((dashboard) => (
          <li className='h-16 w-64 rounded-lg border border-gray-d9 bg-white md:w-60 lg:w-80' key={dashboard.id}>
            <Link
              href={`/dashboard/${dashboard.id}`}
              className={'flex size-full items-center rounded-md px-5 hover:bg-violet-f1'}
            >
              <div className='flex size-full items-center'>
                <div className='rounded-full p-1' style={{ backgroundColor: dashboard.color }} />
                <p className='pl-4 pr-1 text-lg font-medium'>{dashboard.title}</p>
                {dashboard.createdByMe && <Image src={crown} alt='my' />}
              </div>
              <Image src={arrowBlack} alt='arrow' />
            </Link>
          </li>
        ))}
      </ul>

      <div className='rou flex items-center justify-end pt-3'>
        <span className='pr-4 text-sm text-black-33'>
          {dashboardResponse ? Math.ceil(dashboardResponse.totalCount / 5) : 1} 페이지 중 {currentChunk}
        </span>

        <NavButton direction='left' onClick={handlePrev} />
        <NavButton direction='right' onClick={handleNext} />
      </div>
    </section>
  );
}

interface NavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const NavButton = ({ direction, onClick }: NavButtonProps) => (
  <button
    className={`${direction === 'left' ? 'rounded-s-[4px]' : 'rounded-e-[4px]'} flex size-10 items-center justify-center border border-gray-d9 hover:bg-gray-ee`}
    onClick={onClick}
  >
    <Image src={arrowWhite} alt={`arrow-${direction}`} className={`${direction === 'left' ? 'rotate-180' : ''}`} />
  </button>
);
