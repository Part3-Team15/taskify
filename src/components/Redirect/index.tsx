import useRedirectIfAuth from '@/hooks/useRedirectIfAuth';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';

export default function Redirect({ children }: { children: React.ReactNode }) {
  const isRedirectingIfAuth = useRedirectIfAuth();
  const isRedirectingIfNotAuth = useRedirectIfNotAuth();

  if (isRedirectingIfAuth || isRedirectingIfNotAuth) {
    return <></>;
  }

  return children;
}
