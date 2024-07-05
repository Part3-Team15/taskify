import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useModal from '@/hooks/useModal';
import { RootState } from '@/store/store';

const useRedirectIfAuth = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { openNotificationModal } = useModal();
  const router = useRouter();
  const currentPath = router.pathname;
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    if (['/', '/signup', '/signin'].includes(currentPath) && initialCheck) {
      if (user) {
        openNotificationModal({ text: '이미 로그인하셨습니다.' });
        setIsRedirecting(true);
        router.replace('/mydashboard');
      }
      setIsRedirecting(false);
      setInitialCheck(false);
    }
  }, [user, initialCheck]);

  return isRedirecting;
};

export default useRedirectIfAuth;
