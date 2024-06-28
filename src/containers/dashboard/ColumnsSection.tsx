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
  } = useFetchData<ColumnsResponse>(['columns', id], () => getColumnsList(id as string));

  if (isLoading) {
    return <div>Loading...</div>; // 스피너로 교체 예정
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <section className='block lg:flex'>
      <ul className='block lg:flex'>
        {columns?.data && columns.data.map((column) => <Column key={column.id} column={column} />)}
      </ul>

      <div className='p-5'>
        <button
          className='btn-violet-light mb-[16px] h-[70px] w-full gap-[12px] rounded-[6px] py-[24px] lg:w-[354px]'
          onClick={() => window.alert('컬럼 추가 모달')}
        >
          <div className='text-lg font-bold text-black-33'>새로운 컬럼 추가하기</div>
          <Image src='/icons/plus-filled.svg' width={22} height={22} alt='카드 추가 아이콘' />
        </button>
      </div>
    </section>
  );
}
