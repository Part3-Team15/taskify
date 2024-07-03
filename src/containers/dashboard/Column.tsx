import Image from 'next/image';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Card from './Card';

import useModal from '@/hooks/useModal';
import { Card as CardType } from '@/types/Card.interface';
import { Column as ColumnType } from '@/types/Column.interface';

interface ColumnProps {
  column: ColumnType;
  columns: ColumnType[];
  index: number;
  cards: CardType[];
}

function Column({ column, index, cards, columns }: ColumnProps) {
  const { openModifyColumnModal, openNewCardModal } = useModal();

  return (
    <div className='block lg:flex'>
      <div className='flex flex-col bg-gray-fa p-5 lg:min-w-[354px]'>
        {/* Column Header */}
        <div className='mb-[6px] flex cursor-default items-center justify-between'>
          <div className='flex items-center'>
            <span className='mr-[8px] text-xs text-violet'>𒊹</span>
            <h2 className='mr-[12px] text-lg font-bold text-black-33'>{column.title}</h2>
            <span className='flex size-[20px] items-center justify-center rounded-[6px] bg-gray-ee text-xs text-gray-78'>
              {cards.length}
            </span>
          </div>
          {/* Column Edit Button */}
          <button
            className='transition duration-300 ease-in-out hover:rotate-90'
            onClick={() => {
              openModifyColumnModal({ columns, columnId: column.id, columnTitle: column.title });
            }}
          >
            <Image src='/icons/gear.svg' width={24} height={24} alt='톱니바퀴 아이콘' />
          </button>
        </div>

        {/* Add Card Button */}
        <button
          className='btn-violet-light mb-[16px] h-[40px] rounded-[6px] border'
          onClick={() => {
            openNewCardModal({ columnId: column.id, isEdit: false });
          }}
        >
          <Image src='/icons/plus-filled.svg' width={22} height={22} alt='카드 추가 아이콘' />
        </button>

        {/* Card List Section */}
        <div className='scrollbar-hide lg:h-[700px] lg:overflow-y-auto'>
          <Droppable droppableId={`column-${column.id}`} key={`column-${column.id}`}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {cards.map((card, index) => (
                  <Draggable key={`card-${card.id}`} draggableId={`card-${card.id}`} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card key={`card-${card.id}`} card={card} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>

      {/* Horizon Bar */}
      <hr className='h-full border-l border-gray-d9' />
    </div>
  );
}

export default Column;
