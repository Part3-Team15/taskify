import DashboardEdit from '@/containers/dashboard/edit/DashboardEdit';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';

export default function DashboardEditPage() {
  const isRedirecting = useRedirectIfNotAuth();

  if (isRedirecting) {
    return <></>;
  }

  return <DashboardEdit />;
}
