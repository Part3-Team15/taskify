import Image from 'next/image';
import Link from 'next/link';

import UserProfile from './UserProfile';

import plusIcon from '@/../public/icons/plus-boxed.svg';
import settingsIcon from '@/../public/icons/settings.svg';
import { Dashboard } from '@/types/Dashboard.interface';

export default function DashboardHeader({ id, title, createdByMe }: Dashboard) {
  return (
    <header className='flex h-[70px] w-full items-center justify-end border-b border-gray_d9 bg-white px-[24px] text-black_33 md:px-[40px] lg:justify-between'>
      <div className='hidden items-center gap-2 lg:flex'>
        <h1 className='text-xl font-bold'>{title}</h1>
        {createdByMe && <Image src='/icons/crown.svg' alt='왕관 아이콘' width={20} height={16} />}
      </div>
      <div className='flex gap-4 md:gap-8 lg:gap-10'>
        <Buttons id={id} />
        {/* TODO: 구성원 목록 컴포넌트 */}
        <UserProfile />
      </div>
    </header>
  );
}

interface ButtonsProps {
  id: number;
}

function Buttons({ id }: ButtonsProps) {
  const handleInviteClick = () => {
    // TODO: 모달 구현되면 연결하기
    alert('초대하기 모달');
  };

  return (
    <div className='flex gap-1.5 text-[14px] text-gray_78 md:gap-3 lg:gap-4'>
      <Link
        href={`/dashboard/${id}`}
        // REVIEW: 공용 스타일로 만들기를 희망함
        className='flex items-center justify-center gap-2 rounded-[8px] border border-gray_d9 bg-white px-3 py-1.5 transition-all hover:bg-gray_fa active:bg-gray_ee md:px-4 md:py-2 lg:py-2.5'
      >
        <Image src={settingsIcon} alt='대시보드 관리 아이콘' className='hidden md:inline' />
        관리
      </Link>
      <button
        type='button'
        onClick={handleInviteClick}
        className='flex items-center justify-center gap-2 rounded-[8px] border border-gray_d9 bg-white px-3 py-1.5 transition-all hover:bg-gray_fa active:bg-gray_ee md:px-4 md:py-2 lg:py-2.5'
      >
        <Image src={plusIcon} alt='초대 아이콘' className='hidden md:inline' />
        초대하기
      </button>
    </div>
  );
}
