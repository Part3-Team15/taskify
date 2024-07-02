import { useRouter } from 'next/router';
import { MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

import { clearUser } from '@/store/reducers/userSlice';

const DropdownChecker = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [status, setStatus] = useState({ isOpen: false });

  const handleOutsideClick = () => {
    console.log(status.isOpen);
    setStatus({ isOpen: false });
  };

  const handleDropdownClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setStatus((prev) => ({ isOpen: !prev.isOpen }));
  };

  const handleMenuClick: MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
    setStatus({ isOpen: false });
  };

  const handleLogoutClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(clearUser());
    setStatus({ isOpen: false });
    router.push('/');
  };

  return { status, handleOutsideClick, handleDropdownClick, handleMenuClick, handleLogoutClick };
};

export default DropdownChecker;
