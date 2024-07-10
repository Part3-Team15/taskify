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

  // NOTE: 랜딩페이지는 헤더와 내용을 가짐
  if (currentPath === '/') {
    return (
      <div className='min-h-screen min-w-[375px]'>
        <Header />
        {children}
      </div>
    );
  }

  // NOTE: 로그인/회원가입은 내용만 가짐
  if (currentPath === '/signin' || currentPath === '/signup') {
    return <div className='min-h-screen min-w-[375px]'>{children}</div>;
  }

  /* NOTE: 나머지(내 대시보드, 계정관리, 대시보드, 대시보드 관리, 404) 페이지는
   * 로그인 한 경우: 헤더/사이드바/내용을 가짐 + 초대알림
   * 로그인 하지 않은 경우: 헤더/내용을 가짐 (대시보드, 404만 가능)
   */
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
