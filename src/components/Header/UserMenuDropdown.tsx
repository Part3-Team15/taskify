import Link from 'next/link';

import UserProfile from './UserProfile';

import useUserDropdown from '@/hooks/useUserDropdown';

export default function UserMenuDropdown() {
  const { isOpen, dropdownRef, handleDropdownClick, handleMenuClick, handleLogoutClick } = useUserDropdown();

  return (
    <div className='z-10 flex items-center' ref={dropdownRef}>
      <button type='button' onClick={handleDropdownClick}>
        <UserProfile />
      </button>
      {isOpen && (
        <ul className='dd-container absolute right-2 top-14 w-28 bg-white text-sm md:top-16 md:w-[150px] md:text-base'>
          <li className='dd-menu md:h-10' onClick={handleMenuClick}>
            <Link href='/mydashboard' className='align-center size-full'>
              내 대시보드
            </Link>
          </li>
          <li className='dd-menu md:h-10' onClick={handleMenuClick}>
            <Link href='/mypage' className='align-center size-full'>
              계정관리
            </Link>
          </li>
          <li className='dd-menu md:h-10'>
            <button type='button' className='align-center size-full' onClick={handleLogoutClick}>
              로그아웃
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
