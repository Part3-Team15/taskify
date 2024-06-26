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

  const handleLogoutClick = () => {
    dispatch(clearUser());
    router.push('/');
  };

  return (
    <div className='relative flex items-center'>
      <button type='button' onClick={handleDropdownClick}>
        <UserProfile />
      </button>
      {isOpen && (
        <ul className='absolute top-12 border border-gray-d9 bg-white'>
          <li>
            <Link href='/mydashboard'>내 대시보드</Link>
          </li>
          <li>
            <Link href='/mypage'>계정관리</Link>
          </li>
          <li>
            <button type='button' onClick={handleLogoutClick}>
              로그아웃
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
