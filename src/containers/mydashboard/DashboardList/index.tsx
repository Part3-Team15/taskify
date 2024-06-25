import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import arrow from '@/../public/icons/arrow-right.svg';
import crown from '@/../public/icons/crown.svg';
import plus from '@/../public/icons/plus-filled.svg';
import { RootState } from '@/store/store';
import { Dashboard } from '@/types/Dashboard.interface';

export default function DashboardList() {
  const dashboards = useSelector((state: RootState) => state.dashboards.dashboards);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [currentDashboards, setCurrentDashboards] = useState<Dashboard[]>([]);

  // 대시보드 배열을 일정한 크기의 청크로 나누는 함수
  const chunkArray = (array: Dashboard[], size: number): Dashboard[][] => {
    const chunkedArr: Dashboard[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  // 이중 배열 생성
  const dashboardChunks = chunkArray(dashboards, 5);

  const handleNext = () => {
    if (currentChunk < dashboardChunks.length - 1) {
      setCurrentChunk(currentChunk + 1);
    }
  };

  const handlePrev = () => {
    if (currentChunk > 0) {
      setCurrentChunk(currentChunk - 1);
    }
  };

  useEffect(() => {
    setCurrentDashboards(dashboardChunks[currentChunk] || []);
  }, [currentChunk, dashboards]);

  return (
    <section className=''>
      <ul className='grid min-h-[140px] grid-cols-3 gap-3 font-semibold text-black-33'>
        <li className='h-16 max-w-80 rounded-lg border border-gray-d9'>
          <button className='flex size-full items-center justify-center gap-4 hover:bg-violet-f1'>
            새로운 대시보드
            <Image src={plus} alt='plus' />
          </button>
        </li>
        {currentDashboards.map((dashboard) => (
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
          {dashboardChunks.length} 페이지 중 {currentChunk + 1}
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
