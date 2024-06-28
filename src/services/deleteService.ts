import instance from './axios';

import { CancelInvitationInput } from '@/types/delete/CancelInvitation.interface';

// 대시보드 초대 취소
export const deleteInvitation = async ({ dashboardId, invitationId }: CancelInvitationInput) => {
  return await instance.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`);
};
