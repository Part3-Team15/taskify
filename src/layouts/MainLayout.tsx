import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Header from '@/components/Header';
import InvitationNotice from '@/components/InviteNotice';
import Sidebar from '@/components/Sidebar';
import { RootState } from '@/store/store';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const currentPath = router.pathname;

  if (currentPath === '/') {
    return (
      <div className='min-h-screen min-w-[375px]'>
        <Header />
        {children}
      </div>
    );
  }

  if (currentPath === '/signin' || currentPath === '/signup') {
    return <div className='min-h-screen min-w-[375px]'>{children}</div>;
  }

  if (currentPath === '/404' && !user) {
    return (
      <div className='flex min-h-screen min-w-[375px] flex-col'>
        <Header />
        {children}
      </div>
    );
  }

  return (
    <div className='flex min-h-screen min-w-[375px]'>
      {user && (
        <>
          <InvitationNotice />
          <Sidebar />
        </>
      )}

      <div className='flex grow flex-col'>
        <Header />
        <main className='flex grow flex-col bg-gray-fa transition-colors dark:bg-dark-bg'>{children}</main>
      </div>
    </div>
  );
}
