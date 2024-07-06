import Image from 'next/image';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Column from './Column';

import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import useRedirectIfNotMember from '@/hooks/useRedirectIfNotMember';
import { getColumnsList, getCardsList, getDashboard } from '@/services/getService';
import { moveToOtherColumn } from '@/services/putService';
import { RootState } from '@/store/store';
import { Card as CardType } from '@/types/Card.interface';
import { ColumnsResponse } from '@/types/Column.interface';
import { checkPublic } from '@/utils/shareAccount';

interface ColumnsSectionProps {
  id: string;
}

export default function ColumnsSection({ id }: ColumnsSectionProps) {
  const { openNewColumnModal, openNotificationModal } = useModal();
  const redirectIfNotMember = useRedirectIfNotMember();
  const { user } = useSelector((state: RootState) => state.user);
  const [isPublic, setIsPublic] = useState(false);

  const {
    data: columns,
    isLoading,
    error,
  } = useFetchData<ColumnsResponse>(['columns', id], () => getColumnsList(Number(id)));
  const columnList = columns?.data;
  const [cardLists, setCardLists] = useState<Record<number, CardType[]>>({});

  useEffect(() => {
    if (columnList) {
      columnList.forEach((column) => {
        const fetchCards = async () => {
          const { data } = await getCardsList(column.id);
          setCardLists((prev) => ({ ...prev, [column.id]: data.cards }));
        };
        fetchCards();
      });
    }
  }, [columnList]);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const newIsPublic = await checkPublic(Number(id));
        setIsPublic(newIsPublic);
        if (!newIsPublic && id) {
          await getDashboard(String(id));
        }
      } catch {
        redirectIfNotMember();
      }
    };

    handleRedirect();
  }, [id]);

  const handleNewColumnClick = () => {
    if (columns?.data && columns.data.length >= 10) {
      openNotificationModal({ text: '컬럼은 최대 10개까지 생성할 수 있습니다.' });
    } else if (columns?.data) {
      openNewColumnModal({ columns: columns.data });
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || !columnList) {
      return;
    }

    const sourceColumnId = parseInt(source.droppableId.replace('column-', ''), 10);
    const destinationColumnId = parseInt(destination.droppableId.replace('column-', ''), 10);

    const sourceCards = Array.from(cardLists[sourceColumnId]);
    const [movedCard] = sourceCards.splice(source.index, 1);

    if (sourceColumnId !== destinationColumnId) {
      const destinationCards = Array.from(cardLists[destinationColumnId]);
      destinationCards.splice(destination.index, 0, movedCard);

      setCardLists((prev) => ({
        ...prev,
        [sourceColumnId]: sourceCards,
        [destinationColumnId]: destinationCards,
      }));

      try {
        // 다른 컬럼으로의 카드 이동 API 요청
        await moveToOtherColumn(movedCard.id, destinationColumnId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section
        className={`block h-full overflow-x-auto lg:flex ${isPublic && !user ? 'lg:w-screen' : 'lg:w-[calc(100dvw-300px)]'}`}
      >
        <ul className='block lg:flex'>
          {columnList &&
            columnList.map((column, index) => (
              <Droppable droppableId={`column-${column.id}`} key={`column-${column.id}`}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.droppableProps}>
                    <Column
                      key={`column-${column.id}`}
                      column={column}
                      columns={columns.data}
                      index={index}
                      cards={cardLists[column.id] || []}
                    />
                    {provided.placeholder}
                  </li>
                )}
              </Droppable>
            ))}
          {columnList?.length === 0 && <p>컬럼이 없습니다.</p>}
        </ul>
        <div className='p-5'>
          <button
            className='btn-violet-light dark:btn-violet-dark mb-4 h-[70px] w-full rounded-[6px] py-[24px] lg:mb-0 lg:w-[354px]'
            onClick={handleNewColumnClick}
            disabled={!user}
          >
            <div className='mr-[12px] text-lg font-bold text-black-33 dark:text-dark-10'>새로운 컬럼 추가하기</div>
            <Image
              src='/icons/plus-filled.svg'
              width={22}
              height={22}
              alt='카드 추가 아이콘'
              loading='lazy'
              className='dark:hidden'
            />
            <Image
              src='/icons/plus.svg'
              width={24}
              height={24}
              alt='카드 추가 아이콘'
              loading='lazy'
              className='hidden dark:block'
            />
          </button>
        </div>
      </section>
    </DragDropContext>
  );
}
