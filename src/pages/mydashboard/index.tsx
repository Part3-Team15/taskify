import MyDashboard from '@/containers/mydashboard';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';

export default function MyDashboardPage() {
  const isRedirect = useRedirectIfNotAuth();

  if (isRedirect) {
    return <></>;
  }
  return <MyDashboard />;
}
