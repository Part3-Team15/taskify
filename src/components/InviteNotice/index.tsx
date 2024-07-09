import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TOAST_DEFAULT_SETTING } from '@/constants';
import useFetchData from '@/hooks/useFetchData';
import { getInvitationsList } from '@/services/getService';
import { Invitation, InvitationsResponse } from '@/types/Invitation.interface';

export default function InvitationNotice() {
  // NOTE: 3초마다 refetch 하도록 설정
  const { data, isSuccess } = useFetchData<InvitationsResponse>(
    ['invitations', 'notice'],
    () => getInvitationsList(),
    5000,
  );
  const [savedInvitations, setSavedInvitations] = useState<Invitation[] | null>(data?.invitations || null);

  useEffect(() => {
    if (data && data.invitations[0] && savedInvitations) {
      if (savedInvitations.length === 0) {
        data.invitations.forEach((invitation) =>
          toast.info(
            `${invitation.inviter.nickname}님이 ${invitation.dashboard.title}에 초대했어요!`,
            TOAST_DEFAULT_SETTING,
          ),
        );
      } else if (savedInvitations[0] && data.invitations[0].createdAt >= savedInvitations[0].createdAt) {
        for (let i = 0; i < data.invitations.length; i += 1) {
          const invitation = data.invitations[i];
          if (invitation.createdAt <= savedInvitations[0].createdAt) break;
          toast.info(
            `${invitation.inviter.nickname}님이 ${invitation.dashboard.title}에 초대했어요!`,
            TOAST_DEFAULT_SETTING,
          );
        }
      }
    }
    if (isSuccess) {
      setSavedInvitations(data.invitations);
    }
  }, [data]);

  return <ToastContainer />;
}
