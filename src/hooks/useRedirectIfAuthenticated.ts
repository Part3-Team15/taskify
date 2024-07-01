import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useModal from '@/hooks/useModal';
import { RootState } from '@/store/store';

const useRedirectIfAuthenticated = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { openModal } = useModal();
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    if (initialCheck) {
      if (user) {
        openModal({
          type: 'notification',
          modalProps: { text: '이미 로그인하셨습니다.' },
        });
        setIsRedirecting(true);
        router.replace('/mydashboard');
      }
      setIsRedirecting(false);
      setInitialCheck(false);
    }
  }, [user, openModal, router, initialCheck]);

  return isRedirecting;
};

export default useRedirectIfAuthenticated;
