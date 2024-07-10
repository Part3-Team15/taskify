import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useRedirect from '@/hooks/useRedirect';
import { RootState } from '@/store/store';

// NOTE: 권한에 따라 페이지 이동
export default function Redirect({ children }: { children: React.ReactNode }) {
  const redirect = useRedirect();
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const currentPath = router.pathname;

  // NOTE: QueryCache로 글로벌 콜백 설정
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  queryCache.config = {
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            redirect('/signin', '로그인이 필요합니다');
            break;
          case 403:
          case 404:
            if (user) redirect('/mydashboard', '접근 권한이 없습니다');
            else redirect('/signin', '접근 권한이 없습니다');
            break;
          default:
            throw error;
        }
      }
    },
  };

  useEffect(() => {
    // NOTE: 로그인 한 경우 mydashboard를 default로
    if (currentPath === '/' && user) {
      router.replace('/mydashboard');
    }

    // NOTE: 잘못된 주소 접근 시 3초 뒤 적절한 페이지로 이동
    if (currentPath === '/404') {
      const nextPath = user ? '/mydashboard' : '/';
      setTimeout(() => router.push(nextPath), 3000);
    }

    // NOTE: 로그인/회원가입 - 로그인 O -> 내 대시보드
    if (['/signup', '/signin'].includes(currentPath) && user) {
      redirect('/mydashboard', '이미 로그인했습니다');
    }

    // NOTE: 내 대시보드/계정관리 - 로그인 X -> 로그인
    if (['/mypage', '/mydashboard'].includes(currentPath) && !user) {
      redirect('/signin', '로그인이 필요합니다');
    }
  }, [currentPath, router.query.id]);

  return children;
}
