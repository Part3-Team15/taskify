import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TOAST_DEFAULT_SETTING } from '@/constants';
import useFetchData from '@/hooks/useFetchData';
import { getInvitationsList } from '@/services/getService';
import { Invitation, InvitationsResponse } from '@/types/Invitation.interface';

// NOTE: 5초마다 초대 내역을 확인하고, 새로운 초대가 있으면 토스트로 띄우는 컴포넌트
export default function InvitationNotice() {
  const { data, isSuccess } = useFetchData<InvitationsResponse>(
    ['invitations', 'notice'],
    () => getInvitationsList(),
    true,
    5000, // NOTE: 5초마다 refetch 하도록 설정
  );
  const [savedInvitations, setSavedInvitations] = useState<Invitation[] | null>(data?.invitations || null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && data.invitations[0] && savedInvitations) {
      // NOTE: 이전 초대내역이 없다면, 새로 온 초대 모두 알림을 보냄
      if (savedInvitations.length === 0) {
        data.invitations.forEach((invitation) =>
          toast.info(
            `${invitation.inviter.nickname}님이 ${invitation.dashboard.title}에 초대했어요!`,
            TOAST_DEFAULT_SETTING,
          ),
        );
        // 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: ['myInvitations'] });
        
        // NOTE: 이전 초대내역이 있다면, 그중 가장 최신 것보다 나중에 온 것만 알림
      } else if (savedInvitations[0] && data.invitations[0].createdAt >= savedInvitations[0].createdAt) {
        for (let i = 0; i < data.invitations.length; i += 1) {
          const invitation = data.invitations[i];
          if (invitation.createdAt <= savedInvitations[0].createdAt) break;
          toast.info(
            `${invitation.inviter.nickname}님이 ${invitation.dashboard.title}에 초대했어요!`,
            TOAST_DEFAULT_SETTING,
          );
        }

        // 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: ['myInvitations'] });
      }
    }
    // NOTE: 초대내역 조회 요청 성공 시 저장
    if (isSuccess) {
      setSavedInvitations(data.invitations);
    }
  }, [data]);

  return <ToastContainer />;
}
