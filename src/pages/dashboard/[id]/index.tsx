import Image from 'next/image';
import { useRouter } from 'next/router';

import ColumnsSection from '@/containers/dashboard/ColumnsSection';

function DashboardIdPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='align-center opacity-50 invert dark:invert-0'>
          <Image src='/icons/spinner.svg' alt='스피너 아이콘' width={50} height={50} />
        </div>
      </div>
    );
  }

  return <ColumnsSection dashboardId={id} />;
}

export default DashboardIdPage;
