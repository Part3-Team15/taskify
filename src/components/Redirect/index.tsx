import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import useRedirectIfAuth from '@/hooks/useRedirectIfAuth';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';
import { RootState } from '@/store/store';

// NOTE: 권한에 따라 페이지 이동
export default function Redirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const currentPath = router.pathname;

  const redirectIfAuth = useRedirectIfAuth();
  const redirectIfNotAuth = useRedirectIfNotAuth();

  // NOTE: 로그인 한 경우 mydashboard를 default로
  if (currentPath === '/' && user) {
    router.replace('/mydashboard');
  }

  // NOTE: 잘못된 주소 접근 시 3초 뒤 적절한 페이지로 이동
  if (currentPath === '/404') {
    const nextPath = user ? '/mydashboard' : '/';
    setTimeout(() => router.push(nextPath), 3000);
  }

  // NOTE: 로그인한 사용자가 로그인/회원가입 접근 시 mydashboard로 이동
  if (['/signup', '/signin'].includes(currentPath)) {
    const isRedirecting = redirectIfAuth();
    if (isRedirecting) {
      return <></>;
    }
  }

  // TODO: 추후 리팩토링 예정
  if (['/mypage', '/mydashboard'].includes(currentPath)) {
    const isRedirecting = redirectIfNotAuth();
    if (isRedirecting) {
      return <></>;
    }
  }

  return children;
}
