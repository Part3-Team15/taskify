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
    <section className='w-max'>
      <ul className='grid grid-rows-1 gap-3 pb-3 font-semibold text-black-33 md:min-h-[216px] md:grid-cols-2 md:grid-rows-3 lg:min-h-[140px] lg:grid-cols-3 lg:grid-rows-2'>
        <li className='h-16 w-64 rounded-lg border border-gray-d9 bg-white md:w-60 lg:w-80'>
          <button className='btn-violet-light size-full gap-4'>
            새로운 대시보드
            <Image src={'/icons/plus-filled.svg'} alt='plus' width={22} height={22} />
          </button>
        </li>
        {isLoading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <li key={i} className='h-16 w-64 rounded-lg border border-gray-d9 bg-white md:w-60 lg:w-[300px]' />
            ))}
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>

      <Pagination currentChunk={currentChunk} totalPage={totalPage} onNextClick={handleNext} onPrevClick={handlePrev} />
    </section>
  );
}
