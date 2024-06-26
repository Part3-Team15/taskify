import instance from './axios';

// 대시보드 초대 수락
export const putAcceptInvitation = async (invitationId: number, inviteAccepted: boolean) => {
  return await instance.put(`/invitations/${invitationId}`, { inviteAccepted });
};
