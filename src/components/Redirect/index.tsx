import { useRouter } from 'next/router';

import useRedirectIfAuth from '@/hooks/useRedirectIfAuth';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';

export default function Redirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const redirectIfAuth = useRedirectIfAuth();
  const redirectIfNotAuth = useRedirectIfNotAuth();

  if (['/', '/signup', '/signin'].includes(currentPath)) {
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
