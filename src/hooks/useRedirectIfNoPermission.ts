import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import useModal from '@/hooks/useModal';
import { RootState } from '@/store/store';

const useRedirectIfNoPermission = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { openNotificationModal } = useModal();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);

  return (creatorId: number) => {
    if (initialCheck) {
      if (creatorId !== user?.id) {
        openNotificationModal({ text: '접근 권한이 없습니다.' });
        setIsRedirecting(true);
        if (user) {
          router.replace('/mydashboard');
        } else {
          router.replace('/signin');
        }
      }
      setIsRedirecting(false);
      setInitialCheck(false);
    }
    return isRedirecting;
  };
};

export default useRedirectIfNoPermission;
