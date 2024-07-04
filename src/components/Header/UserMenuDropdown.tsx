import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';

import useUserDropdown from '@/hooks/useUserDropdown';
import { RootState } from '@/store/store';

export default function UserMenuDropdown() {
  const { isOpen, dropdownRef, handleDropdownClick, handleMenuClick, handleLogoutClick } = useUserDropdown();
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { pathname } = router;

  if (!user) {
    // NOTE: 공유 페이지에서 보여줄 헤더
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
