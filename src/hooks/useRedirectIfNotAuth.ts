import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import useModal from '@/hooks/useModal';
import { RootState } from '@/store/store';

const useRedirectIfNotAuth = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { openNotificationModal } = useModal();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);

  return () => {
    if (initialCheck) {
      if (!user) {
        openNotificationModal({ text: '로그인이 필요합니다.' });
        setIsRedirecting(true);
        router.replace('/signin');
      }
      setIsRedirecting(false);
      setInitialCheck(false);
    }

    return isRedirecting;
  };
};

export default useRedirectIfNotAuth;
