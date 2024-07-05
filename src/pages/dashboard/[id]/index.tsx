import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ColumnsSection from '@/containers/dashboard/ColumnsSection';
import useRedirectIfNotMember from '@/hooks/useRedirectIfNotMember';
import { getDashboard } from '@/services/getService';
import { checkPublic } from '@/utils/shareAccount';

function DashboardIdPage() {
  const redirectIfNotMember = useRedirectIfNotMember();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const isPublic = await checkPublic(Number(id));
        if (!isPublic && id) {
          await getDashboard(String(id));
        }
      } catch {
        redirectIfNotMember();
      }
    };

    handleRedirect();
  }, [id]);

  if (typeof id !== 'string') {
    return <div>Loading...</div>; // id가 없는 경우 또는 id가 string이 아닌 경우 로딩 상태를 표시합니다.
  }

  return <ColumnsSection id={id} />;
}

export default DashboardIdPage;
