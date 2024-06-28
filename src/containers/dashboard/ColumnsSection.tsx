import Image from 'next/image';

import Column from './Column';

import useFetchData from '@/hooks/useFetchData';
import { getColumnsList } from '@/services/getService';
import { ColumnsResponse } from '@/types/Column.interface';

interface ColumnsSectionProps {
  id: string; // id : 대시보드 id (동적 라우팅 매개변수)
}

export default function ColumnsSection({ id }: ColumnsSectionProps) {
  const {
    data: columns,
    isLoading,
    error,
  } = useFetchData<ColumnsResponse>(['columns', id], () => getColumnsList(Number(id)));

  if (isLoading) {
    return <div>Loading...</div>; // 스피너로 교체 예정
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <section className='size-full'>
      <div className='block overflow-x-auto lg:flex'>
        <ul className='block lg:flex'>
          {columns?.data && columns.data.map((column) => <Column key={column.id} column={column} />)}
          {columns?.data.length === 0 && <p>컬럼이 없습니다.</p>}
        </ul>

        <div className='p-5'>
          <button className='btn-violet-light mb-4 h-[70px] w-full rounded-[6px] py-[24px] lg:mb-0 lg:w-[354px]'>
            <div className='mr-[12px] text-lg font-bold text-black-33'>새로운 컬럼 추가하기</div>
            <Image src='/icons/plus-filled.svg' width={22} height={22} alt='카드 추가 아이콘' loading='lazy' />
          </button>
        </div>
      </div>
    </section>
  );
}
