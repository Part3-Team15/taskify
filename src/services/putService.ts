import instance from './axios';

import { User } from '@/types/User.interface';

// 대시보드 초대 수락
export const putAcceptInvitation = async (invitationId: number, inviteAccepted: boolean) => {
  return await instance.put(`/invitations/${invitationId}`, { inviteAccepted });
};

// 프로필 변경
export const putProfile = async (formData: UpdateProfileForm) => {
  const response = await instance.put<User>(`/users/me`, formData);
  return response.data;
};

// 컬럼 수정
export const putColumn = async (columnId: number, formData: { title: string }) => {
  return await instance.put(`/columns/${columnId}`, formData);
};
