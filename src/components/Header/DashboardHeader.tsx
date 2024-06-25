import Image from 'next/image';
import Link from 'next/link';

import { ProfileIcon } from '../ProfileIcon';

import UserMenuDropdown from './UserMenuDropdown';

import settingsIcon from '@/../public/icons/gear.svg';
import plusIcon from '@/../public/icons/plus-boxed.svg';
import useFetchData from '@/hooks/useFetchData';
import { getMembersList } from '@/services/getService';
import { Dashboard } from '@/types/Dashboard.interface';
import { MembersResponse } from '@/types/Member.interface';

export default function DashboardHeader({ id, title, createdByMe }: Dashboard) {
  return (
    <header className='flex h-[70px] w-full items-center justify-end border-b border-gray-d9 bg-white px-[24px] text-black-33 md:px-[40px] lg:justify-between'>
      <div className='hidden items-center gap-2 lg:flex'>
        <h1 className='text-xl font-bold'>{title}</h1>
        {createdByMe && <Image src='/icons/crown.svg' alt='왕관 아이콘' width={20} height={16} />}
      </div>
      <div className='flex gap-4 md:gap-8 lg:gap-10'>
        <Buttons id={id} />
        <div className='flex items-center gap-3 md:gap-6 lg:gap-8'>
          <MemberProfiles id={id} />
          <div className='h-[34px] w-0 border-l border-gray-d9' />
          <UserMenuDropdown />
        </div>
      </div>
    </header>
  );
}

interface ButtonsProps {
  id: number;
}

interface MemberProfilesProps {
  id: number;
}

function Buttons({ id }: ButtonsProps) {
  const handleInviteClick = () => {
    // TODO: 모달 구현되면 연결하기
    alert('초대하기 모달');
  };

  return (
    <div className='flex gap-1.5 text-[14px] text-gray-78 md:gap-3 lg:gap-4'>
      <Link
        href={`/dashboard/${id}/edit`}
        // REVIEW: 공용 스타일로 만들기를 희망함
        className='flex items-center justify-center gap-2 rounded-[8px] border border-gray-d9 bg-white px-3 py-1.5 transition-all hover:bg-gray-fa active:bg-gray-ee md:px-4 md:py-2 lg:py-2.5'
      >
        <Image src={settingsIcon} alt='대시보드 관리 아이콘' className='hidden md:inline' />
        관리
      </Link>
      <button
        type='button'
        onClick={handleInviteClick}
        className='flex items-center justify-center gap-2 rounded-[8px] border border-gray-d9 bg-white px-3 py-1.5 transition-all hover:bg-gray-fa active:bg-gray-ee md:px-4 md:py-2 lg:py-2.5'
      >
        <Image src={plusIcon} alt='초대 아이콘' className='hidden md:inline' />
        초대하기
      </button>
    </div>
  );
}

function MemberProfiles({ id }: MemberProfilesProps) {
  const { data, isLoading, error } = useFetchData<MembersResponse>(['members', id], () => getMembersList(id));
  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data?.members) {
    // NOTE: 실제론 생성자 한명이라도 존재
    return <p>멤버가 없습니다.</p>;
  }

  // TODO: 길이도 정확히 하려면 device 정보 있어야 함
  const w = 38 + 30 * (data.members.length - 1);
  const ulStyle = { width: w };
  return (
    <ul className='relative h-[38px]' style={ulStyle}>
      {data.members.map((user, i) => {
        const offset = 30 * i;
        const liStyle = { left: offset };
        const hidden = i >= 2 ? 'hidden' : '';
        return (
          <li key={user.id} className='absolute size-[34px] md:size-[38px]' style={liStyle}>
            <ProfileIcon
              user={user}
              imgClassName={`size-[34px] md:size-[38px] lg:flex ${hidden}`}
              fontClassName='md:font-base font-sm'
            />
          </li>
        );
      })}
      {/* TODO: + 버튼 추가하려면 device 정보가 있어야 함 */}
    </ul>
  );
}
