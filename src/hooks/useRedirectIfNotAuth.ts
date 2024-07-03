import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useModal from '@/hooks/useModal';
import { RootState } from '@/store/store';

const useRedirectIfNotAuth = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { openNotificationModal } = useModal();
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    if (initialCheck) {
      if (!user) {
        openNotificationModal({ text: '로그인이 필요합니다.' });
        setIsRedirecting(true);
        router.replace('/signin');
      }
      setIsRedirecting(false);
      setInitialCheck(false);
    }
  }, [user, initialCheck]);

  return isRedirecting;
};

export default useRedirectIfNotAuth;
