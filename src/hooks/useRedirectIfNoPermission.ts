import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useFetchData from './useFetchData';

import useModal from '@/hooks/useModal';
import { getDashboard } from '@/services/getService';
import { RootState } from '@/store/store';
import { Dashboard } from '@/types/Dashboard.interface';

const useRedirectIfNoPermission = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { openNotificationModal } = useModal();
  const router = useRouter();
  const currentPath = router.pathname;
  const { id } = router.query;
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);

  const { data: dashboard } = useFetchData<Dashboard>(['dashboard', id], () => getDashboard(id as string));

  useEffect(() => {
    if (dashboard && currentPath === '/dashboard/[id]/edit' && initialCheck) {
      if (dashboard?.userId !== user?.id) {
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
  }, [user, initialCheck, dashboard]);

  return isRedirecting;
};

export default useRedirectIfNoPermission;
