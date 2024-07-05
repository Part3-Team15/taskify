import useRedirectIfAuth from '@/hooks/useRedirectIfAuth';
import useRedirectIfNoPermission from '@/hooks/useRedirectIfNoPermission';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';

export default function Redirect({ children }: { children: React.ReactNode }) {
  // NOTE: /, /signin, /singup
  const isRedirectingIfAuth = useRedirectIfAuth();
  // NOTE: /mypage, /mydashboard
  const isRedirectingIfNotAuth = useRedirectIfNotAuth();
  // NOTE: dashboard/[id]/edit
  const isRedirectingIfNoPermission = useRedirectIfNoPermission();

  if (isRedirectingIfAuth || isRedirectingIfNotAuth || isRedirectingIfNoPermission) {
    return <></>;
  }

  return children;
}
