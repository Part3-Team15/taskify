import { useRouter } from 'next/router';

import ColumnSkeleton from '@/containers/dashboard/ColumnSkeleton';
import ColumnsSection from '@/containers/dashboard/ColumnsSection';

function DashboardIdPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <ColumnSkeleton />;
  }

  return <ColumnsSection dashboardId={id} />;
}

export default DashboardIdPage;
