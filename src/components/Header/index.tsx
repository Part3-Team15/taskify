import { useRouter } from 'next/router';

import DashboardHeader from './DashboardHeader';
import DefaultHeader from './DefaultHeader';
import LandingHeader from './LandingHeader';

const HEADER_TITLES = {
  '/mydashboard': '내 대시보드',
  '/mypage': '계정관리',
};

export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  // NOTE: 리다이렉션은 페이지에서 할 것이라 생각하고, 상태에 걸맞은 헤더 보여줌

  if (pathname === '/') {
    // NOTE: 랜딩페이지
    return <LandingHeader />;
  }

  if (pathname === '/signup' || pathname === '/signin') {
    // NOTE: 로그인 페이지 or 회원가입 페이지
    return <></>;
  }

  if (pathname.startsWith('/dashboard/')) {
    // NOTE: 대시보드 페이지
    return <DashboardHeader />;
  }

  if (pathname === '/mydashboard' || pathname === '/mypage') {
    // NOTE: 나의 대시보드 페이지 or 마이페이지
    return <DefaultHeader title={HEADER_TITLES[pathname]} />;
  }

  // NOTE: 404 페이지
  return <DefaultHeader title='' />;
}
