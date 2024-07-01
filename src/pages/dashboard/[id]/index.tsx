import { useRouter } from 'next/router';

import ColumnsSection from '@/containers/dashboard/ColumnsSection';
import useRedirectIfNotAuth from '@/hooks/useRedirectIfNotAuth';

function DashboardIdPage() {
  const isRedirecting = useRedirectIfNotAuth();

  if (isRedirecting) {
    return <></>;
  }

  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <div>Loading...</div>; // id가 없는 경우 또는 id가 string이 아닌 경우 로딩 상태를 표시합니다.
  }

  return <ColumnsSection id={id} />;
}

export default DashboardIdPage;
