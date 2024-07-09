import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import useRedirectIfAuth from '@/hooks/useRedirectIfAuth';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';
import { RootState } from '@/store/store';

export default function Redirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const currentPath = router.pathname;

  const redirectIfAuth = useRedirectIfAuth();
  const redirectIfNotAuth = useRedirectIfNotAuth();

  if (currentPath === '/' && user) {
    router.replace('/mydashboard');
  }

  if (currentPath === '/404') {
    const nextPath = user ? '/mydashboard' : '/';
    setTimeout(() => router.push(nextPath), 3000);
  }

  if (['/signup', '/signin'].includes(currentPath)) {
    const isRedirecting = redirectIfAuth();
    if (isRedirecting) {
      return <></>;
    }
  }

  if (['/mypage', '/mydashboard'].includes(currentPath)) {
    const isRedirecting = redirectIfNotAuth();
    if (isRedirecting) {
      return <></>;
    }
  }

  return children;
}
