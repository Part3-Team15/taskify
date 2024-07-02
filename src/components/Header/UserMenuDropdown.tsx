import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import UserProfile from './UserProfile';

import { clearUser } from '@/store/reducers/userSlice';

export default function UserMenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDropdownClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    dispatch(clearUser());
    handleMenuClick();
    router.push('/');
  };

  return (
    <div className='flex items-center'>
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
