import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { clearFavoritesUser } from '@/store/reducers/favoritesUserSlice';
import { clearUser } from '@/store/reducers/userSlice';

// NOTE: 여러 페이지에서 쓰이는 헤더의 유저 메뉴 드롭다운 관리를 위한 훅
const useUserDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // NOTE: 드롭다운 외부 클릭 시 닫기
  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // NOTE: 드롭다운 버튼 클릭 시 열기/닫기
  const handleDropdownClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // NOTE: 드롭다운 메뉴 클릭 시 닫기
  const handleMenuClick: MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  // NOTE: 로그아웃 메뉴 클릭 시 유저 정보 정리하고 닫기 -> 랜딩페이지로 이동
  const handleLogoutClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(clearUser());
    dispatch(clearFavoritesUser());
    queryClient.cancelQueries({ queryKey: ['favorites'] });
    deleteCookie('token');
    setIsOpen(false);
    router.push('/');
  };

  // NOTE: 문서 전체에 클릭시 드롭다운 닫는 이벤트 핸들러 등록
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // NOTE: 드롭다운에서 쓸 수 있도록 함수 제공
  return { isOpen, dropdownRef, handleDropdownClick, handleMenuClick, handleLogoutClick };
};

export default useUserDropdown;
