import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useModal from '@/hooks/useModal';

const useRedirect = () => {
  const { openNotificationModal } = useModal();
  const router = useRouter();
  const { id } = router.query;
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    setInitialCheck(true);
  }, [router.pathname, id]);

  return (path: string, text: string) => {
    if (initialCheck) {
      openNotificationModal({ text });
      router.replace(path);
      setInitialCheck(false);
    }
  };
};

export default useRedirect;
