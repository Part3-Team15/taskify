import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useRedirect from '@/hooks/useRedirect';
import { RootState } from '@/store/store';

export default function Redirect({ children }: { children: React.ReactNode }) {
  const redirect = useRedirect();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const currentPath = router.pathname;

  // NOTE: QueryCache로 글로벌 콜백 설정
  const queryCache = new QueryCache({
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
        }
      }
    },
  });

  const queryClient = new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    if (currentPath === '/' && user) {
      router.replace('/mydashboard');
    }

    if (currentPath === '/404') {
      const nextPath = user ? '/mydashboard' : '/';
      setTimeout(() => router.push(nextPath), 3000);
    }

    if (['/signup', '/signin'].includes(currentPath) && user) {
      redirect('/mydashboard', '이미 로그인했습니다');
    }

    if (['/mypage', '/mydashboard'].includes(currentPath) && !user) {
      redirect('/signin', '로그인이 필요합니다');
    }
  }, [currentPath, router.query.id]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
