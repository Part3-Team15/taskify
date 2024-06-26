import { useRouter } from 'next/router';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.asPath;

  if (currentPath === '/') {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  const isDisabled = currentPath === '/signin' || currentPath === '/signup' || currentPath === '/404';

  if (isDisabled) return <>{children}</>;

  return (
    <div className='flex max-h-dvh max-w-screen-lg'>
      <Sidebar />

      <div className='flex grow flex-col'>
        <Header />
        <main className='flex flex-col overflow-y-scroll'>{children}</main>
      </div>
    </div>
  );
}
