import { useRouter } from 'next/router';

import Sidebar from '@/components/Sidebar';

// import Header from '../Header';

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
        {/* <Header /> */}
        <header className='flex items-center border-b border-gray-d9 px-6 pb-16 pt-3'>
          <h1 className='text-xl font-bold'>Header</h1>
        </header>
        <main className='flex flex-col overflow-y-scroll px-6 py-5'>{children}</main>
      </div>
    </div>
  );
}
