import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TOAST_DEFAULT_SETTING } from '@/constants';
import useFetchData from '@/hooks/useFetchData';
import { getInvitationsList } from '@/services/getService';
import { RootState } from '@/store/store';
import { Invitation, InvitationsResponse } from '@/types/Invitation.interface';

export default function InvitationNotice() {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) return null;

  // NOTE: 3초마다 refetch 하도록 설정
  const { data } = useFetchData<InvitationsResponse>(['invitations', 'notice'], () => getInvitationsList(), 5000);
  const [savedInvitations, setSavedInvitations] = useState<Invitation[]>(data?.invitations || []);

  useEffect(() => {
    if (data && data.invitations[0] && savedInvitations[0] && data.invitations[0].id !== savedInvitations[0].id) {
      for (let i = 0; i < data.invitations.length; i += 1) {
        const invitation = data.invitations[i];
        if (invitation.id === savedInvitations[0].id) break;
        toast.info(
          `${invitation.inviter.nickname}님이 ${invitation.dashboard.title}에 초대했어요!`,
          TOAST_DEFAULT_SETTING,
        );
      }
    }
    setSavedInvitations(data?.invitations || []);
  }, [data]);

  return <ToastContainer />;
}
