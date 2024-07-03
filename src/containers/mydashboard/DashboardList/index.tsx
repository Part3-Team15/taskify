import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Pagination from '@/components/Pagination';
import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { getDashboardsList } from '@/services/getService';
import { DashboardsResponse } from '@/types/Dashboard.interface';

export default function DashboardList() {
  const [currentChunk, setCurrentChunk] = useState<number>(1);
  const { openNewDashboardModal } = useModal();

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
    <section className='flex-col justify-between'>
      <ul className='grid max-w-[350px] grid-rows-1 gap-3 font-semibold text-black-33 md:min-h-[216px] md:max-w-full md:grid-cols-2 md:grid-rows-3 lg:min-h-[140px] lg:max-w-screen-lg lg:grid-cols-3'>
        <li className='h-12 w-full rounded-lg border border-gray-d9 bg-white md:h-16'>
          <button className='btn-violet-light size-full gap-4' type='button' onClick={() => openNewDashboardModal()}>
            새로운 대시보드
            <Image src={'/icons/plus-filled.svg'} alt='plus' width={22} height={22} />
          </button>
        </li>
        {isLoading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <li key={i} className='h-12 w-full animate-pulse rounded-lg border border-gray-d9 bg-gray-fa md:h-16' />
            ))}
          </>
        ) : (
          <>
            {dashboardResponse?.dashboards.map((dashboard) => (
              <li className='h-12 w-full rounded-lg border border-gray-d9 bg-white md:h-16' key={dashboard.id}>
                <Link href={`/dashboard/${dashboard.id}`} className={'btn-violet-light size-full rounded-md px-5'}>
                  <div className='flex size-full items-center'>
                    <div className='rounded-full p-1' style={{ backgroundColor: dashboard.color }} />
                    <div className='mx-4 h-[28px] grow overflow-hidden text-ellipsis text-lg font-medium'>
                      <p className={`size-full`}>{dashboard.title}</p>
                    </div>
                    {dashboard.createdByMe && (
                      <Image src={'/icons/crown.svg'} className='mr-3' alt='my' width={20} height={16} />
                    )}
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
