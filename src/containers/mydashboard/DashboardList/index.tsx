/* eslint-disable no-console */
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
      <ul className='text-black-33 grid min-h-[140px] grid-cols-3 gap-3 font-semibold'>
        <li className='border-gray-d9 h-16 w-80 rounded-lg border'>
          <button className='hover:bg-violet-f1 flex size-full items-center justify-center gap-4'>
            새로운 대시보드
            <Image src={plus} alt='plus' />
          </button>
        </li>
        {dashboardResponse?.dashboards.map((dashboard) => (
          <li className='border-gray-d9 h-16 w-80 rounded-lg border' key={dashboard.id}>
            <Link
              href={`/dashboard/${dashboard.id}`}
              className={'hover:bg-violet-f1 flex size-full items-center rounded-md px-5'}
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

      <div className='flex items-center justify-end pt-3'>
        <span className='text-black-33 pr-4 text-sm'>
          {dashboardResponse ? Math.ceil(dashboardResponse.totalCount / 5) : 1} 페이지 중 {currentChunk}
        </span>
        <button
          className='border-gray-d9 flex size-10 items-center justify-center rounded-s-[4px] border'
          onClick={handlePrev}
        >
          <Image src={arrowWhite} alt='arrow-left' className='rotate-180' />
        </button>
        <button
          className='border-gray-d9 flex size-10 items-center justify-center rounded-e-[4px] border'
          onClick={handleNext}
        >
          <Image src={arrowWhite} alt='arrow-right' />
        </button>
      </div>
    </section>
  );
}
