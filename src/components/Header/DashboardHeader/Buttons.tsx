import Image from 'next/image';
import Link from 'next/link';

import settingsIcon from '@/../public/icons/gear.svg';
import plusIcon from '@/../public/icons/plus-boxed.svg';
import useModal from '@/hooks/useModal';

interface ButtonsProps {
  id: number;
}

export default function Buttons({ id }: ButtonsProps) {
  const { openInviteMemberModal } = useModal();

  return (
    <div className='flex gap-1.5 text-[14px] text-gray-78 md:gap-3 lg:gap-4'>
      <Link href={`/dashboard/${id}/edit`} className='btn-white gap-1 px-3 py-1.5 md:py-2 lg:gap-2 lg:px-4 lg:py-2.5'>
        <Image src={settingsIcon} alt='대시보드 관리 아이콘' />
        <span className='hidden md:inline'>관리</span>
      </Link>
      <button
        type='button'
        onClick={() => openInviteMemberModal()}
        className='btn-white gap-1 rounded-[8px] px-3 py-1.5 md:py-2 lg:gap-2 lg:px-4 lg:py-2.5'
      >
        <Image src={plusIcon} alt='초대 아이콘' />
        <span className='hidden md:inline'>초대하기</span>
      </button>
    </div>
  );
}
