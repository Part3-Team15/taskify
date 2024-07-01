import Image from 'next/image';

import Card from './Card';

import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { getCardsList } from '@/services/getService';
import { CardsListResponse } from '@/types/Card.interface';
import { Column as ColumnType } from '@/types/Column.interface';

interface ColumnProps {
  column: ColumnType;
  columns: ColumnType[];
}

function Column({ column, columns }: ColumnProps) {
  const { openModal } = useModal();
  const {
    data: cardList,
    isLoading,
    error,
  } = useFetchData<CardsListResponse>(['cardList', column.id], () => getCardsList(column.id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='block lg:flex'>
      <div className='flex flex-col bg-gray-fa p-5 lg:min-w-[354px]'>
        {/* Column Header */}
        <div className='mb-[6px] flex cursor-default items-center justify-between'>
          <div className='flex items-center'>
            <span className='mr-[8px] text-xs text-violet'>𒊹</span>
            <h2 className='mr-[12px] text-lg font-bold text-black-33'>{column.title}</h2>
            <span className='flex size-[20px] items-center justify-center rounded-[6px] bg-gray-ee text-xs text-gray-78'>
              {cardList?.totalCount || 0} {/* API에서 가져온 카드 개수 */}
            </span>
          </div>
          {/* Column Edit Button */}
          <button
            className='transition duration-300 ease-in-out hover:rotate-90'
            onClick={() => {
              openModal({
                type: 'modifyColumn',
                modalProps: { columnId: column.id, columnTitle: column.title, columns },
              });
            }}
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

        {/* Card List Section */}
        <div className='lg:h-[700px] lg:overflow-y-auto'>
          {cardList && cardList.cards.map((card) => <Card key={card.id} card={card} />)}
        </div>
      </div>

      {/* Horizon Bar */}
      <hr className='h-full border-l border-gray-d9' />
    </div>
  );
}

export default Column;
