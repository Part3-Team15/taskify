import { useRouter } from 'next/router';

import Header from '../Header';
import Sidebar from '../Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.asPath;

  const isDisabled =
    currentPath === '/' || currentPath === '/signin' || currentPath === '/signup' || currentPath === '/404';

  if (isDisabled) return <>{children}</>;

  return (
    <div className='flex max-h-dvh max-w-screen-lg'>
      <Sidebar />
      <div className='flex grow flex-col'>
        {/* 임시 헤더 */}
        <Header />
        <main className='flex flex-col overflow-y-scroll px-6 py-5'>{children}</main>
      </div>
    </div>
  );
}
