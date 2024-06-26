import { useRouter } from 'next/router';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.asPath;

  if (currentPath === '/') {
    return (
      <div className='min-w-[360px]'>
        <Header />
        {children}
      </div>
    );
  }

  const isDisabled = currentPath === '/signin' || currentPath === '/signup' || currentPath === '/404';

  if (isDisabled) return <div className='min-w-[360px]'>{children}</div>;

  return (
    <div className='flex min-w-[360px]'>
      <Sidebar />

      <div className='flex grow flex-col'>
        <Header />
        <main className='flex flex-col overflow-y-scroll bg-gray-fa'>{children}</main>
      </div>
    </div>
  );
}
