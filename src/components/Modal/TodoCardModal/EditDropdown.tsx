import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MouseEventHandler, MouseEvent } from 'react';

import useModal from '@/hooks/useModal';
import useUserDropdown from '@/hooks/useUserDropdown';
import { deleteCard } from '@/services/deleteService';
import { Card } from '@/types/Card.interface';

interface EditDropdownProps {
  card: Card;
}

export default function EditDropdown({ card }: EditDropdownProps) {
  const { isOpen, dropdownRef, handleDropdownClick, handleMenuClick } = useUserDropdown();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id: dashboardId } = router.query;
  const { openNotificationModal } = useModal();

  const handleDeleteCard: MouseEventHandler<HTMLLIElement> = async (e: MouseEvent<HTMLLIElement>) => {
    // * resetQueries 수정 필요
    await deleteCard(card.id);
    queryClient.resetQueries({ queryKey: ['columns', dashboardId] });
    openNotificationModal({
      text: '카드가 삭제되었습니다.',
    });
    handleMenuClick(e);
  };

  const handleEditCard: MouseEventHandler<HTMLLIElement> = (e: MouseEvent<HTMLLIElement>) => {
    handleMenuClick(e);
  };

  return (
    <div className='z-10 flex items-center transition-all' ref={dropdownRef}>
      <button type='button' onClick={handleDropdownClick}>
        <Image src='/icons/kebab.svg' alt='아이콘' width={32} height={32} className='dark:hidden' />
        <Image src='/icons/kebab-white.svg' alt='아이콘' width={32} height={32} className='hidden dark:block' />
      </button>
      {isOpen && (
        <ul className='dd-container absolute right-3 top-8 w-[86px] bg-white text-sm shadow-md backdrop-blur-md hover:cursor-pointer md:text-base dark:bg-dark'>
          <li
            className='dd-menu h-[36px] text-[12px] hover:text-violet dark:bg-dark dark:hover:text-violet-f1'
            onClick={handleEditCard}
          >
            수정하기
          </li>
          <li
            className='dd-menu h-[36px] text-[12px] hover:text-violet dark:hover:text-violet-f1'
            onClick={handleDeleteCard}
          >
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
}
