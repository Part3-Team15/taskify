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
    <div className='relative flex items-center'>
      <button type='button' onClick={handleDropdownClick}>
        <UserProfile />
      </button>
      {isOpen && (
        <ul className='dd-container absolute right-0 top-11 w-28 bg-white'>
          <li className='dd-menu' onClick={handleMenuClick}>
            <Link href='/mydashboard'>내 대시보드</Link>
          </li>
          <li className='dd-menu' onClick={handleMenuClick}>
            <Link href='/mypage'>계정관리</Link>
          </li>
          <li className='dd-menu'>
            <button type='button' onClick={handleLogoutClick}>
              로그아웃
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
