import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Pagination from '@/components/Pagination';
import useFetchData from '@/hooks/useFetchData';
import { getDashboardsList } from '@/services/getService';
import { DashboardsResponse } from '@/types/Dashboard.interface';

export default function DashboardList() {
  const [currentChunk, setCurrentChunk] = useState<number>(1);

  const {
    data: dashboardResponse,
    error,
    isLoading,
  } = useFetchData<DashboardsResponse>(['dashboards', currentChunk], () =>
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
    if (currentChunk < totalPage) {
      setCurrentChunk((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentChunk > 1) {
      setCurrentChunk((prev) => prev - 1);
    }
  };

  return (
    <section className='w-max grow flex-col justify-between'>
      <ul className='grid grid-rows-1 gap-3 font-semibold text-black-33 md:min-h-[216px] md:grid-cols-2 md:grid-rows-3 lg:min-h-[140px] lg:grid-cols-3'>
        <li className='h-12 w-64 rounded-lg border border-gray-d9 bg-white md:h-16 md:w-60 lg:w-[300px]'>
          <button className='btn-violet-light size-full gap-4'>
            새로운 대시보드
            <Image src={'/icons/plus-filled.svg'} alt='plus' width={22} height={22} />
          </button>
        </li>
        {isLoading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <li
                key={i}
                className='h-12 w-64 animate-pulse rounded-lg border border-gray-d9 bg-gray-fa md:h-16 md:w-60 lg:w-[300px]'
              />
            ))}
          </>
        ) : (
          <>
            {dashboardResponse?.dashboards.map((dashboard) => (
              <li
                className='h-12 w-64 rounded-lg border border-gray-d9 bg-white md:h-16 md:w-60 lg:w-[300px]'
                key={dashboard.id}
              >
                <Link href={`/dashboard/${dashboard.id}`} className={'btn-violet-light size-full rounded-md px-5'}>
                  <div className='flex size-full items-center'>
                    <div className='rounded-full p-1' style={{ backgroundColor: dashboard.color }} />
                    <div className='h-[28px] max-w-[150px] overflow-hidden pl-4 pr-1 text-lg font-medium lg:max-w-[200px]'>
                      <p className={`${dashboard.title.length > 9 ? 'hover:animate-scroll-horizontal' : ''}`}>
                        {dashboard.title}
                      </p>
                    </div>
                    {dashboard.createdByMe && <Image src={'/icons/crown.svg'} alt='my' width={20} height={16} />}
                  </div>
                  <Image src={'/icons/arrow-black.svg'} alt='arrow' width={14} height={14} />
                </Link>
              </li>
            ))}
          </>
        )}

        <div className='md:col-span-2 lg:col-span-3 lg:row-start-3'>
          <Pagination
            currentChunk={currentChunk}
            totalPage={totalPage}
            onNextClick={handleNext}
            onPrevClick={handlePrev}
          />
        </div>
      </ul>
    </section>
  );
}
