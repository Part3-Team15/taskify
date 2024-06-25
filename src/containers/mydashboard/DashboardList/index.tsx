/* eslint-disable no-console */
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import arrow from '@/../public/icons/arrow-right.svg';
import crown from '@/../public/icons/crown.svg';
import plus from '@/../public/icons/plus-filled.svg';
import { getDashboardsList } from '@/services/getService';
import { DashboardsResponse } from '@/types/Dashboard.interface';

export default function DashboardList() {
  const [dashboardResponse, setDashboardResponse] = useState<DashboardsResponse>();
  const [currentChunk, setCurrentChunk] = useState(1);

  useEffect(() => {
    const getDashboardList = async () => {
      try {
        const response = await getDashboardsList('pagination', currentChunk, 5);
        setDashboardResponse(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDashboardList();
  }, [currentChunk]);

  const handleNext = () => {
    const nextChunk = currentChunk + 1;

    if (dashboardResponse && nextChunk <= Math.ceil(dashboardResponse.totalCount / 5)) {
      setCurrentChunk(nextChunk);
    }
  };

  const handlePrev = () => {
    const prevChunk = currentChunk - 1;

    if (prevChunk >= 1) {
      setCurrentChunk(prevChunk);
    }
  };

  return (
    <section className=''>
      <ul className='grid min-h-[140px] grid-cols-3 gap-3 font-semibold text-black-33'>
        <li className='h-16 max-w-80 rounded-lg border border-gray-d9'>
          <button className='flex size-full items-center justify-center gap-4 hover:bg-violet-f1'>
            새로운 대시보드
            <Image src={plus} alt='plus' />
          </button>
        </li>
        {dashboardResponse?.dashboards.map((dashboard) => (
          <li className='h-16 max-w-80 rounded-lg border border-gray-d9' key={dashboard.id}>
            <Link
              href={`/dashboard/${dashboard.id}`}
              className={'flex size-full items-center rounded-md px-5 hover:bg-violet-f1'}
            >
              <div className='rounded-full p-1' style={{ backgroundColor: dashboard.color }} />
              <p className='pl-4 pr-1 text-lg font-medium'>{dashboard.title}</p>
              {dashboard.createdByMe && <Image src={crown} alt='my' />}
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex items-center justify-end pt-3'>
        <span className='pr-4 text-sm text-black-33'>
          {dashboardResponse ? Math.ceil(dashboardResponse.totalCount / 5) : 1} 페이지 중 {currentChunk}
        </span>
        <button
          className='flex size-10 items-center justify-center rounded-s-[4px] border border-gray-d9'
          onClick={handlePrev}
        >
          <Image src={arrow} alt='arrow-left' className='rotate-180' />
        </button>
        <button
          className='flex size-10 items-center justify-center rounded-e-[4px] border border-gray-d9'
          onClick={handleNext}
        >
          <Image src={arrow} alt='arrow-right' />
        </button>
      </div>
    </section>
  );
}
