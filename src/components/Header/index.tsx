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
