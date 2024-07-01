import { useRouter } from 'next/router';

import useRedirectIfAuthenticated from '@/hooks/useRedirectIfAuthenticated';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';

export default function Redirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.asPath;

  if (['/', '/signup', '/signin'].includes(currentPath)) {
    const isRedirecting = useRedirectIfAuthenticated();
    if (isRedirecting) {
      return <></>;
    }
  }
  if (['/mypage', '/mydashboard'].includes(currentPath) || currentPath.startsWith('/dashboard')) {
    const isRedirecting = useRedirectIfNotAuth();
    if (isRedirecting) {
      return <></>;
    }
  }
  return children;
}
