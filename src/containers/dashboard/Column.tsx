import Image from 'next/image';
import React from 'react';

import { Column as ColumnType } from '@/types/Column.interface';

interface ColumnProps {
  column: ColumnType;
}

function Column({ column }: ColumnProps) {
  return (
    <div className='block lg:flex'>
      <div className='flex w-full flex-col bg-gray-fa p-5 lg:w-[354px]'>
        {/* Column Header */}
        <div className='mb-[6px] flex cursor-default items-center justify-between'>
          <div className='flex items-center'>
            <span className='mr-[8px] text-xs text-violet'>𒊹</span>
            <h2 className='mr-[12px] text-lg font-bold text-black-33'>{column.title}</h2>
            <span className='flex size-[20px] items-center justify-center rounded-[6px] bg-gray-ee text-xs text-gray-78'>
              1 {/* 해당 칼럼의 카드 개수. API 연동 예정 */}
            </span>
          </div>
          <button
            className='duration-400 transition ease-in-out hover:rotate-90'
            onClick={() => window.alert('컬럼 수정 모달')}
          >
            <Image src='/icons/gear.svg' width={24} height={24} alt='톱니바퀴 아이콘' />
          </button>
        </div>

        {/* Add Card Button */}
        <button
          className='btn-violet-light mb-[16px] h-[40px] rounded-[6px] border'
          onClick={() => window.alert('카드 추가 모달')}
        >
          <Image src='/icons/plus-filled.svg' width={22} height={22} alt='카드 추가 아이콘' />
        </button>

        <div>
          {column.title} 컬럼의 카드 영역 {/* 해당 칼럼의 카드 목록. API 연동 예정 */}
        </div>
      </div>

      {/* Horizon Bar */}
      <hr className='h-full border-l border-gray-d9' />
    </div>
  );
}

export default Column;
