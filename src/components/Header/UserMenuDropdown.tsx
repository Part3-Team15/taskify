import Link from 'next/link';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';

import useUserDropdown from '@/hooks/useUserDropdown';
import { RootState } from '@/store/store';

// NOTE: 로그인 여부에 따라 로그인/회원가입 | 프로필 드롭다운을 렌더하는 컴포넌트
export default function UserMenuDropdown() {
  const { isOpen, dropdownRef, handleDropdownClick, handleMenuClick, handleLogoutClick } = useUserDropdown();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    // NOTE: 로그인하지 않은 경우 로그인 / 회원가입 메뉴 렌더
    return (
      <div className={`flex gap-5 text-sm md:gap-9 md:text-base`}>
        <Link href='/signin'>로그인</Link>
        <Link href='/signup'>회원가입</Link>
      </div>
    );
  }
  return (
    <div className='z-10 flex items-center' ref={dropdownRef}>
      <button type='button' onClick={handleDropdownClick}>
        <UserProfile user={user} />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul className='dd-container absolute right-2 top-14 w-28 bg-white text-sm md:top-16 md:w-[150px] md:text-base dark:bg-dark'>
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
