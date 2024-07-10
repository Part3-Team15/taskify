import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Column from './Column';

import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import instance from '@/services/axios';
import { getColumnsList } from '@/services/getService';
import { moveToOtherColumn } from '@/services/putService';
import { RootState } from '@/store/store';
import { ColumnsResponse } from '@/types/Column.interface';

interface ColumnsSectionProps {
  dashboardId: string;
}

export default function ColumnsSection({ dashboardId }: ColumnsSectionProps) {
  const queryClient = useQueryClient();
  const { openNewColumnModal, openNotificationModal } = useModal();
  const { user } = useSelector((state: RootState) => state.user);
  const [isMember, setIsMember] = useState(true);

  const {
    data: columns,
    isLoading,
    error,
  } = useFetchData<ColumnsResponse>(['columns', dashboardId], () => getColumnsList(Number(dashboardId)));

  const columnList = columns?.data || [];

  useEffect(() => {
    const handleCheckMember = async () => {
      if (!dashboardId) return;
      try {
        await instance.get(`/dashboards/${dashboardId}`, {
          headers: { memberTest: true },
        });
      } catch {
        setIsMember(false);
      }
    };

    handleCheckMember();
  }, [dashboardId, user]);

  const handleNewColumnClick = () => {
    if (columnList.length >= 10) {
      openNotificationModal({ text: '컬럼은 최대 10개까지 생성할 수 있습니다.' });
    } else {
      openNewColumnModal({ columns: columnList });
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumnId = parseInt(source.droppableId.replace('column-', ''), 10);
    const destinationColumnId = parseInt(destination.droppableId.replace('column-', ''), 10);

    const cardId = parseInt(result.draggableId.replace('card-', ''), 10);

    try {
      await moveToOtherColumn(cardId, destinationColumnId);
      queryClient.invalidateQueries({ queryKey: ['columns', dashboardId] });
      queryClient.invalidateQueries({ queryKey: ['cards', sourceColumnId] });
      queryClient.invalidateQueries({ queryKey: ['cards', destinationColumnId] });
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <>{error.message}</>;
  }

  return isLoading ? (
    <div className='flex h-screen items-center justify-center'>
      <div className='align-center opacity-50 invert dark:invert-0'>
        <Image src='/icons/spinner.svg' alt='스피너 아이콘' width={50} height={50} />
      </div>
    </div>
  ) : (
    <DragDropContext onDragEnd={onDragEnd}>
      <section
        className={`block h-full overflow-x-auto lg:flex lg:h-[calc(100dvh-70px)] ${!user ? 'lg:w-screen' : 'lg:w-[calc(100dvw-300px)]'}`}
      >
        <ul className='block lg:flex'>
          {columnList.map((column, index) => (
            <Droppable droppableId={`column-${column.id}`} key={`column-${column.id}`} isDropDisabled={!isMember}>
              {(provided) => (
                <li id={`column-${column.id}`} ref={provided.innerRef} {...provided.droppableProps}>
                  <Column
                    key={`column-${column.id}`}
                    column={column}
                    columns={columnList}
                    index={index}
                    isMember={isMember}
                  />
                  {provided.placeholder}
                </li>
              )}
            </Droppable>
          ))}
        </ul>
        <div className='p-5'>
          <button
            className='btn-violet-light dark:btn-violet-dark mb-4 h-[70px] w-full rounded-[6px] py-[24px] lg:mb-0 lg:w-[354px]'
            onClick={handleNewColumnClick}
            disabled={!isMember}
          >
            <div className='mr-[12px] text-lg font-bold text-black-33 dark:text-dark-10'>새로운 컬럼 추가하기</div>
            <Image src='/icons/plus-filled.svg' width={22} height={22} alt='카드 추가 아이콘' className='dark:hidden' />
            <Image src='/icons/plus.svg' width={24} height={24} alt='카드 추가 아이콘' className='hidden dark:block' />
          </button>
        </div>
      </section>
    </DragDropContext>
  );
}
