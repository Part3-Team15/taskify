import { useRouter } from 'next/router';

// import Header from '../Header';
// import Sidebar from '../Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.asPath;

  const isDisabled =
    currentPath === '/' || currentPath === '/signin' || currentPath === '/signup' || currentPath === '/404';

  if (isDisabled) return <>{children}</>;

  return (
    <div className='flex max-h-dvh max-w-screen-lg'>
      {/* <Sidebar /> */}
      <aside className='flex h-screen w-72 flex-col gap-14 border-r border-gray_d9 px-4 py-8'>
        <h1 className='text-xl font-bold'>Sidebar</h1>
      </aside>
      <div className='flex grow flex-col'>
        {/* <Header /> */}
        <header className='flex items-center justify-between border-b border-gray_d9 px-6 pb-16 pt-3'>
          <h1 className='text-xl font-bold'>Header</h1>
        </header>
        <main className='flex flex-col overflow-y-scroll px-6 py-5'>{children}</main>
      </div>
    </div>
  );
}
