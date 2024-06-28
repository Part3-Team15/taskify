import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import useFetchData from '@/hooks/useFetchData';
import { getDashboardsList } from '@/services/getService';
import { DashboardsResponse } from '@/types/Dashboard.interface';

export default function DashboardList() {
  const [currentChunk, setCurrentChunk] = useState<number>(1);

  const { data: dashboardResponse, error } = useFetchData<DashboardsResponse>(['dashboards', currentChunk], () =>
    getDashboardsList('pagination', currentChunk, 5),
  );

  const totalPage = dashboardResponse ? Math.max(1, Math.ceil(dashboardResponse.totalCount / 5)) : 1;

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

    if (nextChunk <= totalPage) {
      setCurrentChunk((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    const prevChunk = currentChunk - 1;

    if (prevChunk >= 1) {
      setCurrentChunk((prev) => prev - 1);
    }
  };

  return (
    <section className='w-max'>
      <ul className='grid grid-rows-1 gap-3 font-semibold text-black-33 md:min-h-[216px] md:grid-cols-2 md:grid-rows-3 lg:min-h-[140px] lg:grid-cols-3 lg:grid-rows-2'>
        <li className='h-16 w-64 rounded-lg border border-gray-d9 bg-white md:w-60 lg:w-80'>
          <button className='btn-violet-light size-full gap-4'>
            새로운 대시보드
            <Image src={'/icons/plus-filled.svg'} alt='plus' width={22} height={22} />
          </button>
        </li>
        {dashboardResponse?.dashboards.map((dashboard) => (
          <li className='h-16 w-64 rounded-lg border border-gray-d9 bg-white md:w-60 lg:w-80' key={dashboard.id}>
            <Link href={`/dashboard/${dashboard.id}`} className={'btn-violet-light size-full rounded-md px-5'}>
              <div className='flex size-full items-center'>
                <div className='rounded-full p-1' style={{ backgroundColor: dashboard.color }} />
                <p className='pl-4 pr-1 text-lg font-medium'>{dashboard.title}</p>
                {dashboard.createdByMe && <Image src={'/icons/crown.svg'} alt='my' width={20} height={16} />}
              </div>
              <Image src={'/icons/arrow-black.svg'} alt='arrow' width={14} height={14} />
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex items-center justify-end pt-3'>
        <span className='pr-4 text-sm text-black-33'>
          {totalPage} 페이지 중 {currentChunk}
        </span>

        <NavButton direction='left' onClick={handlePrev} isDisable={currentChunk === 1} />
        <NavButton direction='right' onClick={handleNext} isDisable={currentChunk === totalPage} />
      </div>
    </section>
  );
}

interface NavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  isDisable?: boolean;
}

const NavButton = ({ direction, onClick, isDisable }: NavButtonProps) => (
  <button
    className={`btn-white rounded-none ${direction === 'left' ? 'rounded-s-[4px]' : 'rounded-e-[4px]'} size-10`}
    onClick={onClick}
    disabled={isDisable}
  >
    <div className={`${direction === 'left' ? 'rotate-180' : ''} relative h-[12px] w-[8px]`}>
      <Image src={'/icons/arrow-white.svg'} alt={`arrow-${direction}`} fill />
    </div>
  </button>
);
